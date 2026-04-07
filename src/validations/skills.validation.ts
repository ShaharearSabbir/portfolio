import z from "zod";

export const skillSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.enum(["FRONTEND", "BACKEND", "DATABASE", "DEVOPS", "TOOLS", "LANGUAGE"]),
  status: z.enum(["WORKING_WITH", "LEARNING", "FUTURE_PLAN"]),
  proficiency: z.number().min(0).max(100).default(0),
  priority: z.number().int().default(0),
});

export type ICreateSkill = z.infer<typeof skillSchema>;