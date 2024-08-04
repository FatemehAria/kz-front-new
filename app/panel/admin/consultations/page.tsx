"use client";
import { getAllConsultations } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Consultations() {
  const { token } = useSelector((state: any) => state.userData);
  const [allConsults, setAllConsults] = useState([]);
  useEffect(() => {
    getAllConsultations(token, setAllConsults);
  }, []);
  return (
    <div className="bg-white shadow mx-auto rounded-2xl w-full p-[3%]">
      Consultations
    </div>
  );
}

export default Consultations;
