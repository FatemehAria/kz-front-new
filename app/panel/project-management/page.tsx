"use client";
import React, { useEffect, useState } from "react";
import ProjectDetail from "./project-detail/page";
import AllProjects from "./all-projects";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import { useSearchParams } from "next/navigation";
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
  const { localToken, localUserId } = useSelector(
    (state: any) => state.userData
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIdFromLocal());
    dispatch(getTokenFromLocal());
  }, []);

  const getAllProjects = async () => {
    try {
      const { data } = await axios(
        `https://keykavoos.liara.run/Client/AllProject/${localUserId}`,
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`bg-white shadow mx-auto rounded-2xl py-[3%] px-[3%]`}>
      <AllProjects
        AllProjectsData={ProjectsData}
        getAllProjects={getAllProjects}
      />
    </div>
  );
}

export default ProjectManagement;
