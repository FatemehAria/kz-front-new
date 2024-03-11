import React from "react";
type TicketInfoFieldProps = {
  label: string;
  text: any;
};
function TicketInfoField({ label, text }: TicketInfoFieldProps) {
  return (
    <div className="flex flex-row gap-3 items-center">
      <p className="w-[25%] whitespace-nowrap">{label}</p>
      <p className="bg-[#EAEFF6] flex items-center rounded-[4px] w-[75%] p-2">
        {text}
      </p>
    </div>
  );
}

export default TicketInfoField;
