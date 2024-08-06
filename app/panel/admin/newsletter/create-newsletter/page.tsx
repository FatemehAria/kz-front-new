"use client";
import React, { useState } from "react";
import TicketFields from "../../support/add-new-placard/components/ticket-fields";
import CostumSelect from "@/app/panel/components/costum-select";
import { createNewsLetter } from "@/utils/utils";
import { useSelector } from "react-redux";

// test
const userIds = ["1", "2", "3"];

function CreateNewsletter() {
  const { token } = useSelector((state: any) => state.userData);
  const [newsletterInfo, setNewsLetteInfo] = useState({
    title: "",
    description: "",
    user_id: "",
    dept_id: "",
  });

  const handleNewsLetterSubmission = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    await createNewsLetter(
      token,
      Number(newsletterInfo.user_id),
      Number(newsletterInfo.dept_id),
      newsletterInfo.title,
      newsletterInfo.description
    );
  };
  return (
    <form
      onSubmit={(e) => handleNewsLetterSubmission(e)}
      className="flex flex-col gap-5 bg-white shadow mx-auto rounded-2xl w-full p-[3%]"
    >
      <p>ایجاد خبرنامه جدید</p>
      <TicketFields
        label="عنوان:"
        width="100%"
        value={newsletterInfo.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewsLetteInfo((last) => ({
            ...last,
            title: e.target.value,
          }))
        }
        direction="flex-row items-center"
      />
      <div className="grid grid-cols-2 gap-5">
        <CostumSelect
          label="به کاربر:"
          selectOptions={userIds}
          value={newsletterInfo.user_id}
          name={newsletterInfo.user_id}
          changeHandler={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setNewsLetteInfo((last) => ({ ...last, user_id: e.target.value }))
          }
        />
        <CostumSelect
          label="دپارتمان:"
          selectOptions={userIds}
          value={newsletterInfo.dept_id}
          name={newsletterInfo.dept_id}
          changeHandler={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setNewsLetteInfo((last) => ({ ...last, dept_id: e.target.value }))
          }
        />
      </div>
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
          <label htmlFor="">متن خبرنامه:</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            className="p-2 bg-[#EAEFF6] w-[30%] rounded-[4px]"
            value={newsletterInfo.description}
            onChange={(e) =>
              setNewsLetteInfo((last) => ({
                ...last,
                description: e.target.value,
              }))
            }
          ></textarea>
        </div>
      </div>

      <div className="flex items-center justify-end gap-5">
        <button className="bg-[#4866CE] text-white p-2 rounded-[4px]">
          ارسال خبرنامه
        </button>
      </div>
    </form>
  );
}

export default CreateNewsletter;
