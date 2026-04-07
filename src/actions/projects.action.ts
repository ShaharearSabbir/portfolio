/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/validations/project.validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject(formData: FormData) {
  const parseArray = (key: string) => {
    return (
      formData
        .get(key)
        ?.toString()
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean) || []
    );
  };

  const rawData = {
    name: formData.get("name"),
    slug: formData.get("slug"),
    category: formData.get("category"),
    role: formData.get("role"),
    shortDescription: formData.get("shortDescription"),
    fullDescription: formData.get("fullDescription"),
    thumbnail: formData.get("thumbnail"),
    databaseTech: formData.get("databaseTech"),
    authTech: formData.get("authTech"),
    challenges: formData.get("challenges"),
    solutions: formData.get("solutions"),
    learningOutcomes: formData.get("learningOutcomes"),
    liveLink: formData.get("liveLink"),
    githubClient: formData.get("githubClient"),
    githubServer: formData.get("githubServer"),
    complexity: Number(formData.get("complexity")),
    isFeatured: formData.get("isFeatured") === "true",

    // --- Array Fields ---
    clientSideTech: parseArray("clientSideTech"),
    serverSideTech: parseArray("serverSideTech"),
    topFeatures: parseArray("topFeatures"),
    usedLibraries: parseArray("usedLibraries"),
    futurePlans: parseArray("futurePlans"),
  };

  // 2. Validate with Zod
  const validatedData = projectSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      success: false,
      error: validatedData.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await prisma.project.create({
      data: validatedData.data,
    });

    if (result) {
      revalidatePath("/dashboard/projects");
      revalidatePath("/projects");
      revalidatePath("/");
      return {
        success: true,
        message: "Project injected successfully into PostgreSQL.",
      };
    }
  } catch (error: any) {
    console.error("Prisma Error:", error);

    if (error.code === "P2002") {
      return {
        success: false,
        message: "A project with this slug already exists.",
      };
    }

    return {
      success: false,
      message: "System failure during database injection.",
    };
  }

  redirect("/dashboard/projects");
}
