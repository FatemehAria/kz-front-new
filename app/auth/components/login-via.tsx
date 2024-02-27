import React from "react";
import microsoft from "../../../public/Auth/microsoft.svg";
import github from "../../../public/Auth/github.svg";
import google from "../../../public/Auth/google.svg";
import Image from "next/image";
function LoginVia() {
  return (
    <div className="flex flex-col gap-5">
      <div className="relative border border-blue-700">
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white px-2">
          ورود از طریق
        </p>
      </div>
      <div className="flex flex-row justify-around">
        <Image src={github} alt="github" />
        <Image src={google} alt="google" />
        <Image src={microsoft} alt="microsoft" />
      </div>
    </div>
  );
}

export default LoginVia;
