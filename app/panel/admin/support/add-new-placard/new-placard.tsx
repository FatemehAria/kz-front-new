import React from "react";
import TicketFields from "./components/ticket-fields";
type NewPlacardProps = {
  setSteps: React.Dispatch<React.SetStateAction<number>>;
};
function NewPlacard({ setSteps }: NewPlacardProps) {
  return (
    <div className="grid grid-cols-1 gap-3">
      <div className="flex gap-3 items-center">
        <p>ایجاد اعلان به:</p>
        <div className="flex flex-row gap-3">
          <button
            className="bg-[#EAEFF6] text-[#4866CE] p-2 rounded-[4px] border"
            onClick={() => setSteps(1)}
          >
            کاربر تکی
          </button>
          <button
            className="bg-[#4866CE] text-white p-2 rounded-[4px] border"
            onClick={() => setSteps(2)}
          >
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

export default NewPlacard;
