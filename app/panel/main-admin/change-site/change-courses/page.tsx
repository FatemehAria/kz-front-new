import React from "react";
import ChangeCoursesFrontend from "./front-end/page";
import ChangeCoursesBackend from "./back-end/page";
import ChangeCoursesDigital from "./digital-marketing/page";
import ChangeCoursesAccounting from "./accounting/page";

type ChangeCoursesProps = {
  subStep?: number;
};
const ChangeCourses = ({ subStep }: ChangeCoursesProps) => {
  return <div className="w-full absolute top-0 left-0 px-[20%]"></div>;
};

export default ChangeCourses;
