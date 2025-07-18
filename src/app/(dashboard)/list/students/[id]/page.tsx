import Announcement from "@/components/Announcement";
import BigCalendar from "@/components/BigCalendar";
import FormModal from "@/components/FormModal";
import Performance from "@/components/Performance";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { singleStudentSampleData } from "../../../../../../lib/Data";

const SingleStudentPage = () => {
  return (
    <div className="flex xl:flex-row flex-col gap-4 flex-1 mx-4">
      {/* LEFT */}
      <div className="xl:w-2/3 w-full">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER CARD */}
          <div className="flex-1 flex gap-4 bg-schoolSky py-8 px-4 rounded-lg flex-wrap">
            <div className="md:w-1/3 w-full overflow-hidden">
              <div className="center rounded-full overflow-auto">
                <Image
                  src="/sampleUser.png"
                  alt="teacher_photo"
                  width={200}
                  height={200}
                  className="size-full object-cover object-center"
                />
              </div>
            </div>
            <div className="md:flex-1 w-full flex flex-col gap-2 justify-between">
              <div className="flex gap-4 items-center justify-between">
                <h1 className="text-xl font-semibold capitalize">
                  Olakunle Abolaji
                </h1>
                <FormModal
                  type="update"
                  table="student"
                  data={singleStudentSampleData}
                  bgdColor="bg-black"
                />
              </div>
              <p className="text-sm text-gray-500">
                Loren ipsunn asedlkfd csksmm vsdlksmsd
              </p>
              <div className="center-btw flex-wrap text-xs font-medium gap-2">
                <div className="flex items-center gap-2 md:w-1/3 lg:w-full w-full 2xl:w-1/3">
                  <Image src="/blood.png" alt="logo" width={14} height={14} />
                  <span>A+</span>
                </div>
                <div className="flex items-center gap-2 md:w-1/3 lg:w-full w-full 2xl:w-1/3">
                  <Image
                    src="/calendar.png"
                    alt="logo"
                    width={14}
                    height={14}
                  />
                  <span>January 2025</span>
                </div>
                <div className="flex items-center gap-2 md:w-1/3 lg:w-full w-full 2xl:w-1/3">
                  <Image src="/mail.png" alt="logo" width={14} height={14} />
                  <span>user@user.com</span>
                </div>
                <div className="flex items-center gap-2 md:w-1/3 lg:w-full w-full 2xl:w-1/3">
                  <Image src="/phone.png" alt="logo" width={14} height={14} />
                  <span className="text-blue-700 underline cursor-pointer hover:text-red-400">
                    +234-816-29348
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARD */}
          <div className="flex-1 flex justify-between gap-4 flex-wrap ">
            <div className="bg-white flex items-center gap-4 rounded-lg p-4  w-full md:w-[48%] lg:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            <div className="bg-white flex items-center gap-4 rounded-lg p-4  w-full md:w-[48%] lg:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleBranch.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">6th</h1>
                <span className="text-sm text-gray-400">Grade</span>
              </div>
            </div>
            <div className="bg-white flex items-center gap-4 rounded-lg p-4  w-full md:w-[48%] lg:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleLesson.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">18</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            <div className="bg-white flex items-center gap-4 rounded-lg p-4  w-full md:w-[48%] lg:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleClass.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">6A</h1>
                <span className="text-sm text-gray-400">Class</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 p-4 h-[800px] bg-white rounded-lg">
          <h1 className="font-semibold text-xl">Student&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT */}
      <div className="lg:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-lg">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-500">
            <Link className="p-3 rounded-md bg-schoolSky" href="/">
              Student&apos;s Lessons
            </Link>
            <Link className="p-3 rounded-md bg-schoolPurpleLight " href="/">
              Student&apos;s Teachers
            </Link>
            <Link className="p-3 rounded-md bg-schoolYellowLight" href="/">
              Student&apos;s Results
            </Link>
            <Link className="p-3 rounded-md bg-pink-50" href="/">
              Student&apos;s Exams
            </Link>
            <Link className="p-3 rounded-md bg-schoolSkyLight" href="/">
              Student&apos;s Assignments
            </Link>
          </div>
        </div>
        <Performance />
        <Announcement />
      </div>
    </div>
  );
};

export default SingleStudentPage;
