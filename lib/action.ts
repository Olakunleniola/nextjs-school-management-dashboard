"use server";

import {
  classSchemaType,
  subjectSchemaType,
  teacherSchemaType,
} from "./formValidationSchema";
import prisma from "./prisma";
import { clerkClient } from "./utils";

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

export const createClass = async (
  currentState: { success: boolean; error: boolean },
  data: classSchemaType
) => {
  try {
    await prisma.class.create({
      data,
    });
    // revalidatePath("/list/class");
    return { error: false, success: true };
  } catch (err) {
    console.log(err);
    return { error: true, success: false };
  }
};

export const updateClass = async (
  currentState: { success: boolean; error: boolean },
  data: classSchemaType
) => {
  try {
    await prisma.class.update({
      where: { id: data.id },
      data,
    });
    // revalidatePath("/list/subjects");
    return { error: false, success: true };
  } catch (err) {
    console.log(err);
    return { error: true, success: false };
  }
};

export const deleteClass = async (
  currentState: { success: boolean; error: boolean },
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.class.delete({
      where: { id: parseInt(id) },
    });
    // revalidatePath("/list/subjects");
    return { error: false, success: true };
  } catch (err) {
    console.log(err);
    return { error: true, success: false };
  }
};

export const createTeacher = async (
  currentState: { success: boolean; error: boolean },
  data: teacherSchemaType
) => {
  if (!data.password) {
    return { error: true, success: false };
  }
  try {
    const user = await clerkClient.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: {
        role: "teacher",
      },
    });
    // Step 2️⃣ — Upload Cloudinary image to Clerk
    if (data.img) {
      const response = await fetch(data.img);
      const blob = await response.blob();

      const file = new File([blob], `${data.name}.png`, { type: blob.type });

      await clerkClient.users.updateUserProfileImage(user.id, { file });
    }
    await prisma.teacher.create({
      data: {
        id: user.id,
        name: data.name,
        username: data.name,
        surname: data.surname,
        img: data.img,
        phone: data.phone,
        email: data.email,
        sex: data.sex,
        birthday: data.birthday,
        address: data.address,
        bloodType: data.bloodType,
        password: data.password,
        classes: {
          connect: data.classes?.map((classId) => ({ id: classId })),
        },
        subjects: {
          connect: data.subjects?.map((subjectId) => ({
            id: subjectId,
          })),
        },
      },
    });
    // revalidatePath("/list/class");
    return { error: false, success: true };
  } catch (err) {
    console.log(err?.toString());
    return { error: true, success: false };
  }
};

export const updateTeacher = async (
  currentState: { success: boolean; error: boolean },
  data: teacherSchemaType
) => {
  if (!data.id) {
    return { success: false, error: true };
  }

  try {
    const user = await clerkClient.users.updateUser(data.id, {
      username: data.username,
      ...(data.password !== "" && { password: data.password }),
      firstName: data.name,
      lastName: data.surname,
    });

    // Step 2️⃣ — Upload Cloudinary image to Clerk
    if (data.img) {
      const response = await fetch(data.img);
      const blob = await response.blob();

      const file = new File([blob], `${data.name}.png`, { type: blob.type });

      await clerkClient.users.updateUserProfileImage(user.id, { file });
    }
    
    await prisma.teacher.update({
      where: { id: data.id },
      data: {
        ...(data.password !== "" && { password: data.password }),
        id: user.id,
        name: data.name,
        username: data.name,
        surname: data.surname,
        img: data.img,
        phone: data.phone,
        email: data.email,
        sex: data.sex,
        birthday: data.birthday,
        address: data.address,
        bloodType: data.bloodType,
        classes: {
          set: data.classes?.map((classId) => ({ id: classId })),
        },
        subjects: {
          set: data.subjects?.map((subjectId) => ({
            id: subjectId,
          })),
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

export const deleteTeacher = async (
  currentState: { success: boolean; error: boolean },
  data: FormData
) => {
  const id = data.get("id") as string;
  const user = await clerkClient.users.deleteUser(id);
  try {
    await prisma.teacher.delete({
      where: { id: user.id },
    });
    // revalidatePath("/list/subjects");
    return { error: false, success: true };
  } catch (err) {
    console.log(err);
    return { error: true, success: false };
  }
};
