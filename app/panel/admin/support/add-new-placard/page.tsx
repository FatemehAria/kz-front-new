import React from "react";
import TicketFields from "./components/ticket-fields";
import FileUpload from "@/app/panel/submit-order/components/file-upload";

function AddNewTicket() {
  return (
    <div className="bg-white shadow mx-auto rounded-2xl py-[3%] px-[3%] w-full grid grid-cols-1 gap-3">
      <div className="flex gap-3">
        <p>ایجاد اعلان به:</p>
        <div className="flex flex-row gap-3">
          <button className="bg-[#EAEFF6] text-[#4866CE] p-2 rounded-[4px] border">
            کاربر تکی
          </button>
          <button className="bg-[#4866CE] text-white p-2 rounded-[4px] border">
            کاربر گروهی
          </button>
        </div>
      </div>
      <TicketFields label="واحد مربوطه:" width="30%" />
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
      </div>
      <div className="flex items-center w-[37%] justify-between">
        <div className="flex gap-3 items-center">
          <input
            type="checkbox"
            className="appearance-none border-2 border-black rounded-sm w-4 h-4 checked:bg-[#4866CF]"
            name="radio-button"
          />
          <label>قابلیت رد اعلان</label>
        </div>
        <button className="bg-[#4866CE] text-white p-2 rounded-[4px]">
          ارسال اعلان
        </button>
      </div>
    </div>
  );
}

export default AddNewTicket;
