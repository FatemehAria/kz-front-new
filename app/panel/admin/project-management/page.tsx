import React from "react";
import AllProjects from "./all-projects";

function ProjectMangement() {
  return (
    <div className="grid grid-cols-1 gap-10 bg-white shadow mx-auto rounded-2xl w-full p-[3%]">
      <AllProjects />
    </div>
  );
}

export default ProjectMangement;
