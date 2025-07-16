import { FieldError } from "react-hook-form";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface InputFieldProp {
  label: string;
  register: any;
  type?: string;
  defaultValue?: string;
  name: string;
  errors?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  registerOptions?: any;
}

const InputField = ({
  label,
  type = "text",
  register,
  defaultValue,
  name,
  errors,
  inputProps,
  registerOptions,
}: InputFieldProp) => {
  return (
    <div className="flex flex-col gap-2 w-1/4">
      <label htmlFor={name} className="text-xs text-gray-400">
        {label}
      </label>
      <input
        type={type}
        id={name}
        {...register(name, { ...registerOptions })}
        {...inputProps}
        defaultValue={defaultValue}
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
      />
      {errors?.message && (
        <p className="text-xs text-red-500">{errors?.message}</p>
      )}
    </div>
  );
};

export default InputField;
