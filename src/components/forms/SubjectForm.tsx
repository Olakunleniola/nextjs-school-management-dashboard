"use client";

import { subjectSchema, subjectSchemaType } from "@/lib/formValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";
import InputField from "../InputField";
import { createSubject, updateSubject } from "@/lib/action";
import { useActionState, startTransition, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SubjectForm = ({
  data,
  type,
  setOpen,
  relatedData,
}: {
  data: any;
  type: "create" | "update";
  setOpen: setOpen;
  relatedData?: any;
}) => {
  const resolver = zodResolver(subjectSchema) as Resolver<subjectSchemaType>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<subjectSchemaType>({ resolver });

  const [state, formAction] = useActionState(
    type === "create" ? createSubject : updateSubject,
    {
      success: false,
      error: false,
    }
  );

  const router = useRouter();

  const { teachers } = relatedData || { teachers: [] };

  useEffect(() => {
    if (state.success) {
      toast(`✅ Subject ${type}d successfully`);
      router.refresh();
      setOpen(false);
    }
  }, [state, router]);

  const onSubmit = handleSubmit((formData) => {
    console.log(formData);
    startTransition(() => {
      formAction(formData);
    });
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <h1 className="font-semibold text-xl capitalize">{type} Subject</h1>
      <div className="flex flex-wrap gap-4 justify-between">
        {data && (
          <InputField
            register={register}
            hidden
            name="id"
            label="ID"
            defaultValue={data?.id}
            errors={errors?.id}
          />
        )}
        <InputField
          register={register}
          label="Name"
          name="name"
          defaultValue={data?.name}
          inputProps={{ placeholder: data?.name }}
          errors={errors?.name}
        />
        <div className="flex flex-col gap-2 w-1/4">
          <label htmlFor="teacher" className="text-xs text-gray-400">
            Teachers
          </label>
          <select
            multiple
            id="teachers"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            defaultValue={data?.teachers}
            {...register("teachers")}
          >
            {teachers?.map(
              (teacher: { id: string; name: string; surname: string }) => (
                <option key={teacher.name} value={teacher.id}>
                  {teacher.name + " " + teacher.surname}
                </option>
              )
            )}
          </select>
          {errors?.teachers?.message && (
            <p className="text-xs text-red-500">{errors?.teachers?.message}</p>
          )}

                  </div>
      </div>
      {state.error && (
        <span className="text-red-500 text-sm">⛔ somethig wend wrong</span>
      )}
      <button
        type="submit"
        className="bg-blue-500 text-sm font-bold p-2 rounded-lg text-white capitalize cursor-pointer active:bg-blue-300 hover:bg-blue-600 transition-colors"
      >
        {type}
      </button>
    </form>
  );
};

export default SubjectForm;
