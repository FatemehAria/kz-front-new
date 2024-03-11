import React from "react";
import TicketFields from "../add-new-placard/components/ticket-fields";


function TicketDetail() {
  return (
    <div className="bg-white shadow mx-auto rounded-2xl py-[3%] px-[3%] w-full">
      <div className="grid grid-cols-2 gap-[5%]">
        <TicketFields label="عنوان تیکت:" width="100%" />
        <TicketFields label="مسئول پاسخگویی:" width="100%" />
        <TicketFields label="واحد مربوطه تیکت:" width="100%" />
        <TicketFields label="فرستنده تیکت:" width="100%" />
        <TicketFields label="تاریخ ارسال تیکت:" width="100%" />
        <TicketFields label="تاریخ پاسخگویی:" width="100%" />
      </div>
      <div
        style={{
          border: "none",
          borderTop: "3px solid",
          borderImage:
            "linear-gradient(to right, #FFFFFF 0%, #4866CE 45% ,#4866CE 55% , #FFFFFF 100%) 1",
          margin: "5% 0",
        }}
      ></div>
    </div>
  );
}

export default TicketDetail;
