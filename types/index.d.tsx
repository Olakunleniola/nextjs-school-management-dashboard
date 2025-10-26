/* eslint-disable @typescript-eslint/no-unused-vars */
type setOpen = React.Dispatch<React.SetStateAction<boolean>>;

type FormModalProps = {
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
  id?: string | number;
  bgdColor?: string;
};

type InputFieldProp = {
  label: string;
  register: any;
  type?: string;
  defaultValue?: string;
  name: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  registerOptions?: any;
  hidden?: boolean;
};
