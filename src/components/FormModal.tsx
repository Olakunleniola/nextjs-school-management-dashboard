/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useState } from "react";
import TeacherForm from "./forms/TeacherForm";

interface FormModalProps {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
  bgdColor?: string;
}

const FormModal: React.FC<FormModalProps> = ({
  table,
  type,
  data,
  id,
  bgdColor,
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor = bgdColor
    ? bgdColor
    : type === "create"
    ? "bg-schoolYellow"
    : type === "delete"
    ? "bg-schoolPurple"
    : "bg-schoolSky";

  const [open, setOpen] = useState(false);
  const Form = () =>
    type === "delete" && id ? (
      <form
        action=""
        className="flex flex-col p-4 items-center justify-center gap-5"
      >
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
    ) : type === "update" || (type === "create" && table === "teacher") ? (
      <TeacherForm data={data} type={type} />
    ) : (
      "Create or Update File "
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
              <Image src="/close.png" alt="" width={14} height={14} />
            </button>
            <Form />
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
