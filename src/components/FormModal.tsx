"use client";

import Image from "next/image";
import React, { useActionState, useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";
import dynamic from "next/dynamic";
import { deleteClass, deleteSubject, deleteTeacher } from "@/lib/action";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
// import { capitalizeWords } from "@/lib/utils";

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <h1>Loading...........</h1>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1>Loading...........</h1>,
});
const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => <h1>Loading...........</h1>,
});
const ClassForm = dynamic(() => import("./forms/ClassForm"), {
  loading: () => <h1>Loading...........</h1>,
});

const deleteActionMap = {
  subject: deleteSubject,
  class: deleteClass,
  teacher: deleteTeacher,
  parent: deleteSubject,
  student: deleteSubject,
  attendance: deleteSubject,
  assignment: deleteSubject,
  exam: deleteSubject,
  result: deleteSubject,
  event: deleteSubject,
  lesson: deleteSubject,
  announcement: deleteSubject,
};

const forms: {
  [key: string]: (
    data: any,
    type: "create" | "update",
    setOpen: setOpen,
    relatedData?: any
  ) => JSX.Element;
} = {
  subject: (data, type, setOpen, relatedData) => (
    <SubjectForm
      data={data}
      type={type}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  class: (data, type, setOpen, relatedData) => (
    <ClassForm
      data={data}
      type={type}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  teacher: (data, type, setOpen, relatedData) => (
    <TeacherForm
      data={data}
      type={type}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  student: (data, type) => <StudentForm data={data} type={type} />,
};

const FormModal = ({
  table,
  type,
  data,
  id,
  bgdColor,
  relatedData,
}: FormModalProps & { relatedData?: any }) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor = bgdColor
    ? bgdColor
    : type === "create"
    ? "bg-schoolYellow"
    : type === "delete"
    ? "bg-schoolPurple"
    : "bg-schoolSky";

  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(deleteActionMap[table], {
    success: false,
    error: false,
  });
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`✅ ${table.toUpperCase()} ${type}d successfully`);
      router.refresh();
      setOpen(false);
    }
  }, [state, router, table, type]);

  const Form = () =>
    type === "delete" && id ? (
      <form
        action={formAction}
        className="flex flex-col p-4 items-center justify-center gap-5"
      >
        <input type="hidden" name="id" defaultValue={id} />
        <span className="text-lg font-semibold text-center">
          Are you sure you want to delete this {table}?
        </span>
        <div className="flex gap-4 ">
          <button
            onClick={() => setOpen(false)}
            className="cursor-pointer py-2 px-3 border-none rounded-lg font-semibold hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="cursor-pointer py-2 px-3 border-none font-semibold bg-red-500 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </form>
    ) : type === "update" || type === "create" ? (
      forms[table](data, type, setOpen, relatedData)
    ) : (
      "Forms not found "
    );

  return (
    <>
      <button
        className={`${size} center rounded-full p-2 cursor-pointer ${bgColor}`}
        onClick={() => {
          setOpen(true);
        }}
      >
        <Image
          src={`/${type}.png`}
          alt="btn_logo"
          width={type === "create" ? 20 : 16}
          height={type === "create" ? 20 : 16}
        />
      </button>
      {open && (
        <div className="absolute z-50 w-screen h-screen bg-black/50 center top-0 left-0">
          <div className="relative w-[90%] md:w-[75%] lg:w-[60%] xl:[50%] 2xl:w-[40%] bg-white rounded-2xl p-8">
            <button
              className="absolute top-4 right-4"
              onClick={() => setOpen(false)}
            >
              <Image
                src="/close.png"
                alt=""
                width={14}
                height={14}
                className="cursor-pointer"
              />
            </button>
            <Form />
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
