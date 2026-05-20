"use server";

import { prisma } from "@/lib/prisma";
import { checkAuth } from "./auth.action";

export async function getDashboardStats() {
  try {
    await checkAuth();

    const [projects, skills, blogs, unreadMessages] = await Promise.all([
      prisma.project.count(),
      prisma.skill.count(),
      prisma.blog.count(),
      prisma.message.count({ where: { isRead: false } }),
    ]);

    const recentMessages = await prisma.message.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });

    const recentBlogs = await prisma.blog.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });

    return {
      stats: {
        projects,
        skills,
        blogs,
        unreadMessages,
      },
      recentMessages,
      recentBlogs,
    };
  } catch (error) {
    return null;
  }
}
