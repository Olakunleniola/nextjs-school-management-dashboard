import prisma from "@/lib/prisma";
import FormModal from "./FormModal";

const FormContainer = async ({
  table,
  type,
  data,
  id,
  bgdColor,
}: FormModalProps) => {
  let relatedData = {};

  if (type !== "delete") {
    switch (table) {
      case "subject":
        const subjectTeachers = await prisma.teacher.findMany({
          select: { id: true, surname: true, name: true },
        });
        relatedData = { teachers: subjectTeachers };
        break;
      case "class":
        const classGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const classTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { grades: classGrades, teachers: classTeachers };
        break;
      case "teacher":
        const teachersSubjects = await prisma.subject.findMany({
          select: { id: true, name: true },
        });
        const teachersClasses = await prisma.class.findMany({
          select: { id: true, name: true },
        });
        relatedData = { subjects: teachersSubjects, classes: teachersClasses };
        break;
      default:
        break;
    }
  }

  return (
    <div className="">
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        bgdColor={bgdColor}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;
