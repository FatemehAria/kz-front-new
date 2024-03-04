"use client";
import React, { useState } from "react";
import ProjectDetail from "./project-detail";
import AllProjects from "./all-projects";
import { IoArrowBack } from "react-icons/io5";
const ProjectsData = [
  {
    id: 1,
    title: "پروژه یک",
    title1: "پروژه یک",
    title2: "پروژه یک",
    title3: "پروژه یک",
    title4: "پروژه یک",
  },
  {
    id: 2,
    title: "پروژه یک",
    title1: "پروژه یک",
    title2: "پروژه یک",
    title3: "پروژه یک",
    title4: "پروژه یک",
  },
];

function ProjectManagement() {
  const [step, setStep] = useState(1);
  const renderSteps = () => {
    switch (step) {
      case 1:
        return <AllProjects AllProjectsData={ProjectsData} setStep={setStep} />;
      case 2:
        return <ProjectDetail setStep={setStep}/>;
    }
  };
  return (
    <div
      className={`bg-white shadow mx-auto rounded-2xl ${
        step === 1 ? "py-[3%] px-[3%]" : "py-0 px-0"
      }`}
    >
      {renderSteps()}
    </div>
  );
}

export default ProjectManagement;
