"use client";
import React from "react";

type AllCoursesProps = {
  setSteps: React.Dispatch<React.SetStateAction<number>>;
};
const AllCourses = ({ setSteps }: AllCoursesProps) => {
  return (
    <div className="w-full">
      <div className="px-[3%] py-[2%] bg-[#4866CF1A] rounded-lg w-full text-center">
        <table className="w-full my-2">
          <thead className="border-b-[1px] border-black">
            <tr>
              <th>هزینه</th>
              <th>وضعیت</th>
              <th>تاریخ</th>
              <th>شماره دوره</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b-[1px] border-black">
              <td>9،900،000</td>
              <td>در جریان</td>
              <td>1399/10/11</td>
              <td>#2546</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCourses;
