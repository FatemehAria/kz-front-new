import React, { ChangeEvent } from "react";
type ReqFormFileProps = {
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedFile: any;
};
const ReqFormFile = ({ handleFileChange, selectedFile }: ReqFormFileProps) => {
  return (
    <div className="flex flex-row items-center">
      <label className="font-bold">فایل:</label>
      <input
        id="fileInput"
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <label
        htmlFor="fileInput"
        style={{ cursor: "pointer" }}
        className="bg-[#9DACDF] rounded-lg py-[2%] px-[2%] text-center text-white whitespace-nowrap"
      >
        {selectedFile ? selectedFile.name : "افزودن فایل"}
      </label>
    </div>
  );
};

export default ReqFormFile;
