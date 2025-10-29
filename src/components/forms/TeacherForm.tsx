"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Resolver } from "react-hook-form";
import InputField from "../InputField";
import Image from "next/image";
import { teacherSchema, teacherSchemaType } from "@/lib/formValidationSchema";
import { useActionState, useEffect, useState, useTransition } from "react";
import { createTeacher, updateTeacher } from "@/lib/action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";

interface TecherFormProp {
  type: "create" | "update";
  id?: number;
  data: any;
  setOpen: setOpen;
  relatedData?: any;
}

const TeacherForm = ({ type, data, relatedData, setOpen }: TecherFormProp) => {
  const resolver = zodResolver(teacherSchema) as Resolver<teacherSchemaType>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<teacherSchemaType>({ resolver });

  const [state, formState] = useActionState(
    type === "create" ? createTeacher : updateTeacher,
    { success: false, error: false }
  );

  const [pending, startTransition] = useTransition();
  const [img, setImage] = useState<any>();
  const router = useRouter();
  const { classes, subjects } = relatedData;

  useEffect(() => {
    if (state.success) {
      toast(`✅ Teacher successfuly ${type}ed`);
      router.refresh();
      setOpen(false);
    }
  }, [state, router]);

  const onSubmit = handleSubmit((data) => {
    startTransition(() => {
      formState({ ...data, img: img?.secure_url });
    });
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <h1 className="font-semibold text-xl capitalize">{type} teacher</h1>
      <span className="text-xs font-semibold text-gray-500">
        Authentication information
      </span>
      <div className="flex flex-wrap gap-4 justify-between">
        <InputField
          register={register}
          label="ID"
          name="id"
          defaultValue={data?.id}
          inputProps={{ placeholder: data?.id }}
          errors={errors?.id}
          hidden
        />
        <InputField
          register={register}
          label="Username"
          name="username"
          defaultValue={data?.username}
          inputProps={{ placeholder: data?.userName }}
          errors={errors?.username}
        />
        <InputField
          type="email"
          register={register}
          label="Email"
          name="email"
          defaultValue={data?.email}
          errors={errors?.email}
        />
        <InputField
          type="password"
          register={register}
          label="Password"
          name="password"
          errors={errors?.password}
        />
      </div>
      <span className="text-xs font-semibold text-gray-500">
        Personal information
      </span>
      <div className="flex flex-wrap gap-4 justify-between">
        <InputField
          register={register}
          label="Name"
          name="name"
          defaultValue={data?.name}
          errors={errors?.name}
        />
        <InputField
          register={register}
          label="Surname"
          name="surname"
          defaultValue={data?.surname}
          errors={errors?.surname}
        />
        <InputField
          register={register}
          label="Phone"
          name="phone"
          defaultValue={data?.phone || 0}
          errors={errors?.phone}
          // registerOptions={{ valueAsNumber: true }}
        />
        <InputField
          register={register}
          label="Address"
          name="address"
          defaultValue={data?.address}
          errors={errors?.address}
        />
        <InputField
          register={register}
          label="BloodType"
          name="bloodType"
          defaultValue={data?.bloodType}
          errors={errors?.bloodType}
        />
        <InputField
          type="date"
          register={register}
          label="BirthDay"
          name="birthday"
          defaultValue={data?.birthday.toISOString().split("T")[0]}
          errors={errors?.birthday}
        />

        <div className="flex flex-col gap-2 w-1/4">
          <label htmlFor="sex" className="text-xs text-gray-400">
            Sex
          </label>
          <select
            id="sex"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            defaultValue={data?.sex}
            {...register("sex")}
          >
            <option value=""></option>
            <option value="FEMALE">Male</option>
            <option value="MALE">Female</option>
          </select>
          {errors?.sex?.message && (
            <p className="text-xs text-red-500">{errors?.sex?.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-1/4">
          <label htmlFor="subjects" className="text-xs text-gray-400">
            Subjects
          </label>
          <select
            multiple
            id="subjects"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            defaultValue={data?.subjects}
            {...register("subjects")}
          >
            {subjects.map((subject: { id: number; name: string }) => (
              <option value={subject.id} key={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          {errors?.subjects?.message && (
            <p className="text-xs text-red-500">{errors?.subjects?.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-1/4">
          <label htmlFor="classes" className="text-xs text-gray-400">
            Classes
          </label>
          <select
            multiple
            id="classes"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            defaultValue={data?.classes}
            {...register("classes")}
          >
            {classes.map((classItem: { id: number; name: string }) => (
              <option value={classItem.id} key={classItem.id}>
                {classItem.name}
              </option>
            ))}
          </select>
          {errors?.classes?.message && (
            <p className="text-xs text-red-500">{errors?.classes?.message}</p>
          )}
        </div>

        {/* 
        <div className="flex flex-col items-center justify-center gap-2 w-1/4">
          <label
            htmlFor="image"
            className="flex items-center gap-2 text-xs cursor-pointer"
          >
            <Image src="/upload.png" alt="" width={24} height={24} />
            <span className="">Upload your image</span>
          </label>
          <input
            type="file"
            name="image"
            id="image"
            className="hidden"
            title="Upload your image"
            placeholder="Upload your image"
            accept="image/*"
          />
          {errors?.img?.message && (
            <p className="text-xs text-red-500">{errors?.img?.message}</p>
          )}
        </div> */}
        <div className="flex items-center justify-center gap-7 w-1/4">
          <CldUploadWidget
            uploadPreset="school"
            onSuccess={(result, { widget }) => {
              console.log(result.info);
              setImage(result.info);
              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <div
                  className="flex items-center gap-2 text-xs cursor-pointer"
                  onClick={() => open()}
                >
                  <Image src="/upload.png" alt="" width={24} height={24} />
                  <span className="">Upload your image</span>
                </div>
              );
            }}
          </CldUploadWidget>
          <div className="flex flex-col items-center justify-center gap-2 w-1/3 aspect-square rounded-full overflow-hidden">
            {img && (
              <Image
                src={img.secure_url}
                alt="upload img"
                width={20}
                height={20}
                className="w-full h-full rounded-full object-cover"
                unoptimized
              />
            )}
          </div>
        </div>
      </div>
      {state.error && (
        <span className="text-red-500 text-sm">⛔ somethig wend wrong</span>
      )}
      <button
        disabled={pending}
        type="submit"
        className="bg-blue-500 text-sm font-bold p-2 rounded-lg text-white capitalize"
      >
        {type}
      </button>
    </form>
  );
};

export default TeacherForm;
