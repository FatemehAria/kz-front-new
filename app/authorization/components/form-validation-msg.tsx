import React from "react";

type FormValidationMsgProps = {
  errorMsg: string;
};
function FormValidationMsg({ errorMsg }: FormValidationMsgProps) {
  return (
    <div className="text-white bg-[#4866CF] rounded-[4px] border-none outline-none text-[10px] absolute bottom-0 w-full">
      {errorMsg !== "undefined" ? errorMsg : ""}
    </div>
  );
}

export default FormValidationMsg;
