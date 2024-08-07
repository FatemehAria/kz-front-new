"use client";
import {
  createNewPermission,
  createNewPosition,
  createNewRole,
} from "@/utils/utils";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function CreatePosition() {
  const { token } = useSelector((state: any) => state.userData);
  const [createPosition, setCreatePosition] = useState({
    title_en: "",
    title_fa: "",
    dept_id: "",
    user_id: "",
  });
  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createNewPosition(
      token,
      createPosition.title_en,
      createPosition.title_fa,
      Number(createPosition.dept_id),
      Number(createPosition.user_id)
    );
    setCreatePosition({ title_en: "", title_fa: "", dept_id: "", user_id: "" });
  };
  return (
    <div className="bg-white shadow mx-auto rounded-2xl w-full p-[3%] space-y-3 flex flex-col gap-5">
      <p>ایجاد موقعیت جدید</p>
      <form
        onSubmit={(e) => handleSubmission(e)}
        className="flex flex-col gap-3"
      >
        <label htmlFor="">نام انگلیسی</label>
        <input
          type="text"
          value={createPosition.title_en}
          onChange={(e) =>
            setCreatePosition((last) => ({ ...last, title_en: e.target.value }))
          }
          className="bg-[#D0DBEC] border-[#D0DBEC] mx-auto outline-none rounded-md px-2 py-2 text-lg w-full border-[0.3px]"
        />

        <label htmlFor="">نام فارسی</label>
        <input
          type="text"
          value={createPosition.title_fa}
          onChange={(e) =>
            setCreatePosition((last) => ({ ...last, title_fa: e.target.value }))
          }
          className="bg-[#D0DBEC] border-[#D0DBEC]mx-auto outline-none rounded-md px-2 py-2 text-lg w-full border-[0.3px]"
        />

        {/* user id */}
        <select name="" id="" value={createPosition.user_id}>
          <option>1</option>
          <option>2</option>
        </select>

        {/* department id */}
        <select name="" id="" value={createPosition.dept_id}>
          <option>1</option>
          <option>2</option>
        </select>

        <div className="flex justify-end my-5">
          <button className="p-2 w-[80px] bg-[#4866CF] rounded-[4px] text-white">
            تایید
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePosition;
