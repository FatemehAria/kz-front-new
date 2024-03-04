import Image from "next/image";
import React from "react";
import uploadFile from "../../../../public/Panel/uploadfile.svg";
function FileUpload() {
  return (
    <div>
      <div className="flex flex-row items-center gap-[5%] whitespace-nowrap">
        <label>فایل انتخابی:</label>
        <input id="fileInput" type="file" style={{ display: "none" }} />
        <label
          htmlFor="fileInput"
          style={{ cursor: "pointer" }}
          className="bg-[#EDF0FB] rounded-lg flex flex-col items-center w-[70px] py-2"
        >
          <Image src={uploadFile} alt="انتخاب فایل" />
        </label>
      </div>
    </div>
  );
}

export default FileUpload;
