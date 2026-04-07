import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Use lowercase and hyphens only"),
  category: z.string().min(1, "Category is required"),
  role: z.string().optional(),
  shortDescription: z.string().min(10, "Short description is too short"),
  fullDescription: z.string().min(20, "Full description is required"),
  thumbnail: z.string().url("Invalid thumbnail URL").optional().or(z.literal("")),
  
  // Array fields (we'll parse these from comma-separated strings)
  clientSideTech: z.array(z.string()).default([]),
  serverSideTech: z.array(z.string()).default([]),
  topFeatures: z.array(z.string()).default([]),
  usedLibraries: z.array(z.string()).default([]),
  futurePlans: z.array(z.string()).default([]),

  databaseTech: z.string().min(1, "Database tech is required"),
  authTech: z.string().optional(),
  
  challenges: z.string().min(1, "Challenges section is required"),
  solutions: z.string().min(1, "Solutions section is required"),
  learningOutcomes: z.string().min(1, "Learning outcomes are required"),

  liveLink: z.string().url().optional().or(z.literal("")),
  githubClient: z.string().url().optional().or(z.literal("")),
  githubServer: z.string().url().optional().or(z.literal("")),
  
  isFeatured: z.boolean().default(false),
  complexity: z.number().min(1).max(5).default(1),
});