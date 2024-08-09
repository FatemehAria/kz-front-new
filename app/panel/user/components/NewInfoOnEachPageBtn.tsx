import Link from "next/link";
import React from "react";

const NewInfoOnEachPageBtn = ({ btnText }: { btnText: string }) => {
  return (
    <Link
      href={`/panel/user/submit-order`}
      className="text-white bg-[#4866CF] p-2 rounded-[5px]"
    >
      + {btnText}
    </Link>
  );
};

export default NewInfoOnEachPageBtn;
