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

export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Class name is required" }),
  capacity: z.coerce.number().min(1, { message: "Capacity is required" }),
  gradeId: z.coerce.number().min(1, { message: "Grade ID is required" }),
  supervisorId: z.string().optional(),
});

export type classSchemaType = z.infer<typeof classSchema>;

export const teacherSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username  must be at least 3 characters" })
    .max(20, { message: "Username must be at most 20 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .or(z.literal(""))
    .optional(),
  email: z.email({ message: "Email is required" }).optional().or(z.literal("")),
  name: z.string().min(1, { message: "Name must be at least 3 characters" }),
  surname: z
    .string()
    .min(1, { message: "Surname must be at least 3 characters" }),
  phone: z.string(),
  address: z.string(),
  img: z.string().optional(),
  birthday: z.coerce.date({ message: "Birthday is required" }),
  bloodType: z.string().min(2, { message: "Blood Type is required" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required" }),
  subjects: z.array(z.coerce.number()).optional(),
  classes: z.array(z.coerce.number()).optional(),
});

export type teacherSchemaType = z.infer<typeof teacherSchema>;
