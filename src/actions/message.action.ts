"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { checkAuth } from "./auth.action";
import sendEmail from "@/utils/sendEmail";

export async function getMessages() {
  await checkAuth();
  return await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function sendMessage(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    await prisma.message.create({
      data: { name, email, subject, message },
    });

    const html = `
      <h3>New Transmission Received</h3>
      <p><strong>From:</strong> ${name} (${email})</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <div style="padding: 20px; background: #f4f4f4; border-radius: 10px;">${message}</div>
    `;
    await sendEmail(html, `New message from ${name}`, `📩 New Portfolio Message: ${subject}`);

    revalidatePath("/dashboard/inbox");
    return { success: true, message: "Message transmitted successfully." };
  } catch (error) {
    console.error("Message Error:", error);
    return { success: false, message: "Transmission failed." };
  }
}

export async function markAsRead(id: string) {
  try {
    await checkAuth();
    await prisma.message.update({
      where: { id },
      data: { isRead: true },
    });
    revalidatePath("/dashboard/inbox");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function deleteMessage(id: string) {
  try {
    await checkAuth();
    await prisma.message.delete({ where: { id } });
    revalidatePath("/dashboard/inbox");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function sendAdminEmail(to: string, subject: string, body: string) {
  try {
    await checkAuth();
    
    const html = `
      <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
        <h2>Response from Shaharear Sabbir</h2>
        <p>${body}</p>
        <hr />
        <p style="font-size: 12px; color: #666;">This is an automated response from my portfolio system.</p>
      </div>
    `;

    await sendEmail(html, body.substring(0, 50), subject, to);
    
    return { success: true, message: "Email transmitted." };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
