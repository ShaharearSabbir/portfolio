"use server";

import { Verification } from "@/generated/client/client";
import { prisma } from "@/lib/prisma";
import sendEmail from "@/utils/sendEmail";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SECRET = process.env.JWT_SECRET!;

export async function sendAdminOTP() {
  try {
    const adminEmail = process.env.DEV_EMAIL;

    if (!adminEmail) {
      console.error("Admin Email not configured in .env");
      return { success: false };
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    await prisma.verification.deleteMany({});

    await prisma.verification.create({
      data: { otp },
    });

    const text = `Your Dashboard Access Code is: ${otp}`;
    const html = `
      <div style="font-family: sans-serif; max-width: 400px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
        <h2 style="color: #10b981; text-align: center;">System Access Code</h2>
        <p style="text-align: center; font-size: 14px; color: #666;">Enter this 6-digit code to unlock your dashboard.</p>
        <div style="background: #f9f9f9; padding: 20px; text-align: center; border-radius: 8px; font-size: 32px; font-weight: bold; letter-spacing: 10px; color: #111;">
          ${otp}
        </div>
        <p style="text-align: center; font-size: 12px; color: #999; margin-top: 20px;">This code will expire in 5 minutes.</p>
      </div>
    `;

    const result = await sendEmail(html, text);

    if (!result?.success) {
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to send Admin OTP:", error);
    return { success: false };
  }
}

export async function verifyAdminOTP(userOtp: number) {
  try {
    const record = await prisma.$transaction(async (tx) => {
      const record: Verification | null = await tx.verification.findFirst({
        where: { otp: userOtp },
      });

      await tx.verification.updateMany({
        data: {
          attempts: {
            increment: 1,
          },
        },
      });
      return record;
    });

    if (!record) return { success: false, message: "Invalid code" };

    if (record.attempts > 5) {
      await prisma.verification.delete({ where: { id: record.id } });
      return { success: false, message: "Too many attempts, resend OTP" };
    }

    const isExpired = Date.now() - record.createdAt.getTime() > 5 * 60 * 1000;
    if (isExpired) {
      await prisma.verification.delete({ where: { id: record.id } });
      return { success: false, message: "Code expired" };
    }

    await prisma.verification.delete({ where: { id: record.id } });

    const accessToken = jwt.sign(
      { email: process.env.DEV_EMAIL, role: "admin" },
      SECRET,
      { expiresIn: "1h" },
    );

    const refreshToken = jwt.sign(
      { email: process.env.DEV_EMAIL, role: "admin" },
      SECRET,
      { expiresIn: "7d" },
    );

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // 5. Save Session to Prisma
    await prisma.session.create({
      data: {
        token: refreshToken,
        adminEmail: process.env.DEV_EMAIL!,
        expiresAt,
      },
    });

    // 6. Set HttpOnly Cookies
    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600, // 1 hour in seconds
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    return { success: true };
  } catch (error) {
    console.error("Auth Error:", error);
    return { success: false, message: "Internal server error" };
  }
}

export async function refreshSession() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  try {
    if (accessToken) {
      try {
        jwt.verify(accessToken, SECRET);
        return { success: true, message: "Session still valid" };
      } catch (err) {}
    }

    if (!refreshToken) {
      return { success: false, message: "No refresh token found" };
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, SECRET) as { email: string };
    } catch (err) {
      return { success: false, message: "Invalid refresh token" };
    }

    const session = await prisma.session.findUnique({
      where: { token: refreshToken },
    });

    if (!session || session.expiresAt < new Date()) {
      if (session) await prisma.session.delete({ where: { id: session.id } });
      return { success: false, message: "Session expired" };
    }

    const newAccessToken = jwt.sign(
      { email: decoded.email, role: "admin" },
      SECRET,
      { expiresIn: "1h" },
    );

    const newRefreshToken = jwt.sign(
      { email: decoded.email, role: "admin" },
      SECRET,
      { expiresIn: "7d" },
    );
    const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await prisma.session.update({
      where: { id: session.id },
      data: {
        token: newRefreshToken,
        expiresAt: newExpiresAt,
      },
    });

    const isProd = process.env.NODE_ENV === "production";

    cookieStore.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "strict",
      maxAge: 1 * 60 * 60 * 1000,
    });

    cookieStore.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { success: true };
  } catch (error) {
    console.error("Refresh Error:", error);
    return { success: false, message: "Seamless login failed" };
  }
}

export async function terminateSession() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  try {
    // 1. Database Purge
    // We target the specific token in PostgreSQL to invalidate the session globally
    if (refreshToken) {
      await prisma.session.deleteMany({
        where: { token: refreshToken },
      });
    }
  } catch (error) {
    console.error("Database session cleanup failed:", error);
  } finally {
    // 2. Browser Purge (The "Instant" Clean)
    // .delete() tells the browser to remove the cookie entries entirely
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    redirect("/login");
  }
}
