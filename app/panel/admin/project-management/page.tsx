"use client";
import Image from "next/image";
import React, { useState } from "react";
import AllProjects from "./all-projects";
import ProjectDetail from "./project-detail";

function ProjectMangement() {
  const [step, setStep] = useState(1);
  const renderSteps = () => {
    switch (step) {
      case 1:
        return <AllProjects setStep={setStep} />;
      case 2:
        return <ProjectDetail setStep={setStep}/>;
      default:
        break;
    }
  };
  return (
    <div className="grid grid-cols-1 gap-10 bg-white shadow mx-auto rounded-2xl w-full p-[3%]">
      {renderSteps()}
    </div>
  );
}

export default ProjectMangement;
