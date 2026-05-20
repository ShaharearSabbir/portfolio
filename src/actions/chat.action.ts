"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { checkAuth } from "./auth.action";
import sendEmail from "@/utils/sendEmail";
import crypto from "crypto";
import { chatEvents } from "@/lib/chatEvents";

export async function getOrCreateConversation() {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get("chat_session_id")?.value;

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    cookieStore.set("chat_session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });
  }

  let conversation = await prisma.conversation.findUnique({
    where: { sessionId },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });

  if (!conversation) {
    conversation = await prisma.conversation.create({
      data: { sessionId },
      include: { messages: true },
    });
    revalidateTag("chat", "default");
  }

  return conversation;
}

export async function sendChatMessage(text: string) {
  const conversation = await getOrCreateConversation();

  const message = await prisma.chatMessage.create({
    data: {
      conversationId: conversation.id,
      sender: "guest",
      text,
    },
  });

  // Send email to owner
  const html = `
    <div style="font-family: sans-serif; padding: 20px;">
      <h3>New Chat Message from Guest</h3>
      <p><strong>Session ID:</strong> ${conversation.sessionId}</p>
      <p><strong>Message:</strong> ${text}</p>
      <a href="${process.env.APP_URL}/dashboard/inbox">View in Dashboard</a>
    </div>
  `;
  const subject = `New Chat Message: ${text.substring(0, 30)}...`;
  await sendEmail(
    html,
    `New chat message: ${text.substring(0, 50)}...`,
    subject,
  );

  revalidateTag("chat", "default");
  chatEvents.emit("message", message);
  return message;
}

export async function getAdminConversations() {
  try {
    await checkAuth();
    return await prisma.conversation.findMany({
      include: {
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      orderBy: { updatedAt: "desc" },
    });
  } catch (error) {
    return [];
  }
}

export async function getConversationMessages(id: string) {
  try {
    await checkAuth();
    return await prisma.chatMessage.findMany({
      where: { conversationId: id },
      orderBy: { createdAt: "asc" },
    });
  } catch (error) {
    return [];
  }
}

export async function adminReply(conversationId: string, text: string) {
  try {
    await checkAuth();
    const message = await prisma.chatMessage.create({
      data: {
        conversationId,
        sender: "admin",
        text,
      },
    });

    revalidateTag("chat", "default");
    revalidatePath("/dashboard/inbox");
    chatEvents.emit("message", message);
    return message;
  } catch (error) {
    throw new Error("Unauthorized");
  }
}
