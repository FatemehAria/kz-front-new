import React from "react";
import TicketFields from "./components/ticket-fields";
import FileUpload from "../../submit-order/components/file-upload";

function AddNewTicket() {
  return (
    <div className="bg-white shadow mx-auto rounded-2xl py-[3%] px-[3%] w-full grid grid-cols-1 gap-3">
      <TicketFields label="عنوان تیکت:" width="30%" />
      <TicketFields label="واحد مربوطه:" width="30%" />
      <TicketFields label="اولویت تیکت:" width="30%" />
      <div
        style={{
          border: "none",
          borderTop: "3px solid",
          borderImage:
            "linear-gradient(to right, #FFFFFF 0%, #4866CE 45% ,#4866CE 55% , #FFFFFF 100%) 1",
          margin: "3% 0",
        }}
      ></div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row gap-2">
          <label htmlFor="">متن تیکت:</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            className="p-2 bg-[#EAEFF6] w-[30%] rounded-[4px]"
          ></textarea>
        </div>
        <FileUpload />
      </div>
    </div>
  );
}

export default AddNewTicket;
