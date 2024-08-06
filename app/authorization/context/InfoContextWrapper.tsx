"use client";
import React, { useState } from "react";
import { InfoContext } from "./InfoContext";

function InfoContextWrapper({ children }: { children: React.ReactNode }) {
  const [savedInfo, setSavedInfo] = useState({
    name: "",
    surname: "",
    mobile: "",
    type: "",
    password: "",
  });
  return (
    <InfoContext.Provider value={{ savedInfo, setSavedInfo }}>
      {children}
    </InfoContext.Provider>
  );
}

export default InfoContextWrapper;
