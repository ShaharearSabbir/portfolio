"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { checkAuth } from "./auth.action";

export async function getSettings() {
  const settings = await prisma.setting.findMany();
  const settingsMap: Record<string, string> = {};
  settings.forEach((s) => {
    settingsMap[s.key] = s.value;
  });
  return settingsMap;
}

export async function updateSettings(data: Record<string, string>) {
  try {
    await checkAuth();

    for (const [key, value] of Object.entries(data)) {
      await prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }

    revalidatePath("/");
    revalidatePath("/dashboard/settings");
    return { success: true, message: "System parameters updated." };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
