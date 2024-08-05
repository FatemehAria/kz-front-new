"use client";
import React, { useState } from "react";
import { ValueIdContext } from "./ValueIdContext";

function ValueIdContextWrapper({ children }: { children: React.ReactNode }) {
  const [valueId, setValueId] = useState("");
  return (
    <ValueIdContext.Provider value={{ valueId, setValueId }}>
      {children}
    </ValueIdContext.Provider>
  );
}

export default ValueIdContextWrapper;
