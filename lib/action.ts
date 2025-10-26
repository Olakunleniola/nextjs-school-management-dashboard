"use server";

import { subjectSchemaType } from "./formValidationSchema";
import prisma from "./prisma";

export const createSubject = async (
  currentState: { success: boolean; error: boolean },
  data: subjectSchemaType
) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });
    // revalidatePath("/list/subjects");
    return { error: false, success: true };
  } catch (err) {
    console.log(err);
    return { error: true, success: false };
  }
};

export const updateSubject = async (
  currentState: { success: boolean; error: boolean },
  data: subjectSchemaType
) => {
  try {
    await prisma.subject.update({
      where: { id: data.id },
      data: {
        name: data.name,
        teachers: {
          set: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });
    // revalidatePath("/list/subjects");
    return { error: false, success: true };
  } catch (err) {
    console.log(err);
    return { error: true, success: false };
  }
};

export const deleteSubject = async (
  currentState: { success: boolean; error: boolean },
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.subject.delete({
      where: { id: parseInt(id) },
    });
    // revalidatePath("/list/subjects");
    return { error: false, success: true };
  } catch (err) {
    console.log(err);
    return { error: true, success: false };
  }
};
