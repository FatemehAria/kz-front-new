"use client";
import React, { useContext, useEffect, useState } from "react";
import TicketFields from "./components/ticket-fields";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import { FcCheckmark } from "react-icons/fc";
import CostumSelect from "@/app/panel/components/costum-select";
import { createTicket } from "@/utils/utils";
import { DepartmentContext } from "../../context/department-context/DepartmentContext";
import FormInput from "@/app/contact-us/components/form/form-inputs";
type NewPlacardProps = {
  setSteps: React.Dispatch<React.SetStateAction<number>>;
};
function NewPlacard({ setSteps }: NewPlacardProps) {
  const { departments } = useContext(DepartmentContext);
  const departmentInfo = departments.map(
    (item) => item.department.id + "-" + item.department.name_fa
  );
  const { token, userId } = useSelector((state: any) => state.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTokenFromLocal());
    dispatch(getIdFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);

  const [annonceInfo, setAnnounceInfo] = useState({
    title: "",
    description: "",
    status_id: false,
    priority_id: "",
    dept_id: "",
  });

  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createTicket(
      token,
      annonceInfo.title,
      annonceInfo.description,
      Number(annonceInfo.status_id === true ? "1" : "2"),
      Number(annonceInfo.priority_id === "کم" ? "1" : "2"),
      Number(userId),
      Number(annonceInfo.dept_id.split("")[0]),
      null
    );
  };

  return (
    <form
      onSubmit={(e) => handleSubmission(e)}
      className="grid grid-cols-1 gap-3"
    >
      <TicketFields
        label="عنوان:"
        width="100%"
        value={annonceInfo.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setAnnounceInfo((last) => ({
            ...last,
            title: e.target.value,
          }))
        }
        direction="flex-row items-center"
      />
      <div className="grid grid-cols-2 gap-8">
        <CostumSelect
          changeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAnnounceInfo((last) => ({ ...last, dept_id: e.target.value }))
          }
          label="ایجاد اعلان به:"
          name="dept_id"
          selectOptions={departmentInfo}
          value={annonceInfo.dept_id}
        />
        <CostumSelect
          label="اولویت:"
          value={annonceInfo.priority_id}
          changeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAnnounceInfo((last) => ({
              ...last,
              priority_id: e.target.value,
            }))
          }
          name="priority_id"
          selectOptions={["کم", "زیاد"]}
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
          <label htmlFor="">متن تیکت:</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            className="p-2 bg-[#EAEFF6] w-[30%] rounded-[4px]"
            value={annonceInfo.description}
            onChange={(e) =>
              setAnnounceInfo((last) => ({
                ...last,
                description: e.target.value,
              }))
            }
          ></textarea>
        </div>
      </div>
      <div className="flex items-center w-[37%] justify-between">
        <div className="flex gap-3 items-center">
          <div
            className={`border-2 border-black rounded-sm w-4 h-4 ${
              annonceInfo.status_id ? "bg-[#4866CF]" : "bg-white"
            }`}
            onClick={() =>
              setAnnounceInfo((last) => ({
                ...last,
                status_id: !last.status_id,
              }))
            }
          ></div>
          <span>قابلیت رد اعلان</span>
        </div>
        <button className="bg-[#4866CE] text-white p-2 rounded-[4px]">
          ارسال اعلان
        </button>
      </div>
    </form>
  );
}

export default NewPlacard;
