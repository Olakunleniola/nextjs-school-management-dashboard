/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

interface StudentFormProp {
  type: "create" | "update";
  id?: number;
  data: any;
}

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username  must be at least 3 characters" })
    .max(20, { message: "Username must be at most 20 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  email: z.email({ message: "Email is required" }),
  firstName: z
    .string()
    .min(3, { message: "Firstname must be at least 3 characters" }),
  lastName: z
    .string()
    .min(3, { message: "Lastname must be at least 3 characters" }),
  phone: z.number().min(11, { message: "must be 11 characters" }),
  address: z
    .string()
    .min(3, { message: "Address must be at least 3 characters" }),
  birthday: z.date({ message: "Birthday is required" }),
  bloodType: z.string().min(2, { message: "Blood Type is required" }),
  sex: z.enum(["male", "female"], { message: "Sex is required" }),
  img: z.file({ message: "Image is required" }),
});

type Inputs = z.infer<typeof schema>;

const StudentForm = ({ type, id, data }: StudentFormProp) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema)});

  const onSubmit = handleSubmit((data) => {
    console.log(data, id);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <h1 className="font-semibold text-xl capitalize">{type} student</h1>
      <span className="text-xs font-semibold text-gray-500">
        Authentication information
      </span>
      <div className="flex flex-wrap gap-4 justify-between">
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
          label="First Name"
          name="firstName"
          defaultValue={data?.firstName}
          errors={errors?.firstName}
        />
        <InputField
          register={register}
          label="Last Name"
          name="lastName"
          defaultValue={data?.lastName}
          errors={errors?.lastName}
        />
        <InputField
          type="number"
          register={register}
          label="Phone"
          name="phone"
          defaultValue={data?.phone || 0}
          errors={errors?.phone}
          registerOptions={{ valueAsNumber: true }}
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
          defaultValue={data?.birthday}
          errors={errors?.birthday}
        />
        <div className="flex flex-col gap-2 w-1/4">
          <label htmlFor="sex" className="text-xs text-gray-400">
            Sex
          </label>
          <select
            name="sex"
            id="sex"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            defaultValue={data?.sex}
          >
            <option value=""></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors?.sex?.message && (
            <p className="text-xs text-red-500">{errors?.sex?.message}</p>
          )}
        </div>
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
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-sm font-bold p-2 rounded-lg text-white capitalize"
      >
        {type}
      </button>
    </form>
  );
};

export default StudentForm;
