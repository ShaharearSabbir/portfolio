/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { prisma } from "@/lib/prisma";
import { ICreateSkill, skillSchema } from "@/validations/skills.validation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// 1. Define the Schema for validation


export async function createSkill(data: ICreateSkill) {
  try {
    // 2. Validate the incoming data
    const validatedData = skillSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        success: false,
        error: validatedData.error.flatten().fieldErrors,
      };
    }

    const result = await prisma.skill.upsert({
      where: { name: validatedData.data.name },
      update: {
        ...validatedData.data,
      },
      create: {
        ...validatedData.data,
      },
    });

    if (result) {
      revalidatePath("/dashboard/skills");
      revalidatePath("/skills");
      revalidatePath("/");
      return { 
        success: true, 
        message: `${result.name} injected into your tech stack.` 
      };
    }

    return { success: false, message: "Database rejected the entry." };
  } catch (error: any) {
    console.error("Skill Action Error:", error);
    
    // Handle unique constraint or connection issues
    return {
      success: false,
      message: error.message || "System failure during skill synchronization.",
    };
  }
}