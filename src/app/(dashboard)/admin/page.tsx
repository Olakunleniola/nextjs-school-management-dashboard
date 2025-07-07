import UserCard from "@/components/UserCard";
import React from "react";

const Admin = () => {
  return (
    <div className="flex flex-wrap flex-col md:flex-row p-4 ">
      <div className="w-full lg:w-2/3 flex-1">
        <div className="flex w-full gap-4 flex-wrap">
          <UserCard type="admin" />
          <UserCard type="teacher" />
          <UserCard type="student" />
          <UserCard type="parent" />
        </div>
      </div>
      <div className="w-full lg:w-1/3">Right</div>
    </div>
  );
};

export default Admin;
