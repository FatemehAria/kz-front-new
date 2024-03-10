import React from "react";
type TicketFieldsProps = {
  label: string;
  width: string;
};
function TicketFields({ label , width }: TicketFieldsProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="">{label}</label>
      <input className="bg-[#EAEFF6] rounded-[4px] p-2" style={{ width }} />
    </div>
  );
}

export default TicketFields;
