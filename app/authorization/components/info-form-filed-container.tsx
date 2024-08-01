import React from "react";

function InfoFormFieldContainer({
  children,
  errorMsg,
}: {
  children: React.ReactNode;
  errorMsg: string | undefined;
}) {
  return <div className={`relative ${errorMsg ? "pb-[1.25rem]" : "pb-0"}`}>{children}</div>;
}

export default InfoFormFieldContainer;
