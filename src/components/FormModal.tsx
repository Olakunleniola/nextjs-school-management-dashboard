/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useState } from "react";

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
}

const FormModal: React.FC<FormModalProps> = ({ table, type, data, id }) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-schoolYellow"
      : type === "delete"
      ? "bg-schoolPurple"
      : "bg-schoolSky";

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    console.log("Clicked");
  };
  return (
    <>
      <button
        className={`${size} center rounded-full p-2 cursor-pointer ${bgColor}`}
        onClick={() => {
          handleClick();
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
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
