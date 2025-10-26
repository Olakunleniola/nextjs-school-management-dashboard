import { z } from "zod";

export const subjectSchema = z.object({
  id: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().optional()
  ),
  name: z.string().min(1, { message: "Subject name is required" }),
  teachers: z.array(z.string()),
});

export type subjectSchemaType = z.infer<typeof subjectSchema>;
