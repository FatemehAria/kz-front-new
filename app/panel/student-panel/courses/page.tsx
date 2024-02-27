"use client";
import Image from "next/image";
import React, { useState } from "react";
import AllCourses from "./components/all-courses";
import SingleCourse from "./components/single-course";

const Courses = () => {
  const [steps, setSteps] = useState(0);
  const renderSteps = () => {
    switch (steps) {
      case 0:
        return <AllCourses setSteps={setSteps}/>;
      // case 1:
      //   return <SingleCourse />;

      default:
        return;
    }
  };
  return <div className="w-full">{renderSteps()}</div>;
};

export default Courses;
