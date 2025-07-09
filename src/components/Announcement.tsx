import React from "react";

const Announcement = () => {
  return (
    <div className="w-full bg-white rounded-2xl px-5 py-2">
      <div className="flex justify-between items-center my-2">
        {/* TOP */}
        <h1 className="text-lg font-semibold">Announcements</h1>
        <span className="text-sm text-gray-400 cursor-pointer hover:underline">
          view all
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <div className="bg-schoolSkyLight rounded-lg p-4">
          <div className="center-btw">
            <h1 className="font-semibold">lorem Ipsum lo re</h1>
            <span className="rounded-md bg-white text-xs py-1 px-2 ">
              12-05-2025
            </span>
          </div>
          <p className="text-sm text-gray-400 line-clamp-2 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dm
          </p>
        </div>
        <div className="bg-schoolPurpleLight rounded-lg p-4">
          <div className="center-btw">
            <h1 className="font-semibold">lorem Ipsum lo re</h1>
            <span className="rounded-md bg-white text-xs py-1 px-2 ">
              12-05-2025
            </span>
          </div>
          <p className="text-sm text-gray-400 line-clamp-2 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dm
          </p>
        </div>
        <div className="bg-schoolYellowLight rounded-lg p-4">
          <div className="center-btw">
            <h1 className="font-semibold">lorem Ipsum lo re</h1>
            <span className="rounded-md bg-white text-xs py-1 px-2 ">
              12-05-2025
            </span>
          </div>
          <p className="text-sm text-gray-400 line-clamp-2 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dm
          </p>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
