"use client";

import Image from "next/image";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// SAMPLE_DATA
const data = [
  {
    id: 1,
    title: "Lorem Ipsum Agenda",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum summary sample event description goes here.",
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting",
    time: "10:00 AM - 11:00 AM",
    description:
      "Monthly meeting between parents and teachers to discuss student progress.",
  },
  {
    id: 3,
    title: "Science Fair",
    time: "3:00 PM - 5:00 PM",
    description:
      "Annual science fair showcasing student projects and experiments.",
  },
];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="w-full bg-white rounded-2xl p-5">
      <Calendar onChange={onChange} value={value} />
      <div className="flex justify-between items-center mt-2 mb-3 ">
        {/* TOP */}
        <h1 className="text-lg font-bold">Events</h1>
        <Image
          src="/moreDark.png"
          alt="menu icon"
          width={20}
          height={20}
          className="cursor-pointer h-auto"
        />
      </div>
      <div className="flex flex-col gap-3">
        {data.map((item) => (
          <div key={item.id} className="border-2 border-gray-100 p-5 border-t-4 odd:border-t-schoolSky even:border-t-schoolPurple">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{item.title}</h1>
              <span className="text-xs text-gray-400">{item.time}</span>
            </div>
            <p className="line-clamp-1 mt-2 text-gray-400 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
