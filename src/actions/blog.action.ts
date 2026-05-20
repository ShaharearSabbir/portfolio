"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { checkAuth } from "./auth.action";

export async function getBlogs() {
  return await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getBlogBySlug(slug: string) {
  return await prisma.blog.findUnique({
    where: { slug },
  });
}

export async function createBlog(formData: FormData) {
  try {
    await checkAuth();
    
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const content = formData.get("content") as string;
    const thumbnail = formData.get("thumbnail") as string;
    const tagsStr = formData.get("tags") as string;
    const tags = tagsStr ? tagsStr.split(",").map(t => t.trim()) : [];
    const isPublished = formData.get("isPublished") === "true";

    if (!title || !slug || !content) {
      return { success: false, message: "Required fields missing." };
    }

    await prisma.blog.create({
      data: { title, slug, content, thumbnail, tags, isPublished },
    });

    revalidatePath("/dashboard/blog");
    revalidatePath("/");
    return { success: true, message: "Blog published successfully." };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function updateBlog(id: string, formData: FormData) {
  try {
    await checkAuth();
    
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const content = formData.get("content") as string;
    const thumbnail = formData.get("thumbnail") as string;
    const tagsStr = formData.get("tags") as string;
    const tags = tagsStr ? tagsStr.split(",").map(t => t.trim()) : [];
    const isPublished = formData.get("isPublished") === "true";

    await prisma.blog.update({
      where: { id },
      data: { title, slug, content, thumbnail, tags, isPublished },
    });

    revalidatePath("/dashboard/blog");
    revalidatePath("/");
    return { success: true, message: "Blog updated successfully." };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteBlog(id: string) {
  try {
    await checkAuth();
    await prisma.blog.delete({ where: { id } });
    revalidatePath("/dashboard/blog");
    revalidatePath("/");
    return { success: true, message: "Blog deleted." };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
