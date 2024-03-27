"use client";
import React, { useEffect, useState } from "react";
import TicketFields from "./components/ticket-fields";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import { FcCheckmark } from "react-icons/fc";
type NewPlacardProps = {
  setSteps: React.Dispatch<React.SetStateAction<number>>;
};
function NewPlacard({ setSteps }: NewPlacardProps) {
  const { localUserId, localToken } = useSelector(
    (state: any) => state.userData
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTokenFromLocal());
    dispatch(getIdFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);

  const [annonceInfo, setAnnounceInfo] = useState({
    RelevantUnit: "",
    text: "",
  });
  const sendAnnouncementToSigleUser = async (
    RelevantUnit: string,
    text: string,
    UserPhoneNumber: string
  ) => {
    try {
      const { data } = await axios.post(
        `https://keykavoos.liara.run/Admin/SendOneAnnouncement/${localUserId}`,
        {
          RelevantUnit,
          text,
          UserPhoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        }
      );
      console.log(data);
      // console.log(UserPhoneNumber);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendAnnouncementToSigleUser(
      annonceInfo.RelevantUnit,
      annonceInfo.text,
      sessionStorage.getItem("userPhoneNumber") || ""
    );
  };
  return (
    <form
      onSubmit={(e) => handleSubmission(e)}
      className="grid grid-cols-1 gap-3"
    >
      <div className="flex gap-3 items-center">
        <p>ایجاد اعلان به:</p>
        <div className="flex flex-row gap-3">
          <button
            className="bg-[#EAEFF6] text-[#4866CE] p-2 rounded-[4px] border flex"
            onClick={() => setSteps(1)}
          >
            <span>کاربر تکی</span>
            {sessionStorage.getItem("userPhoneNumber") ? <FcCheckmark /> : ""}
          </button>
          <button
            className="bg-[#4866CE] text-white p-2 rounded-[4px] border"
            onClick={() => setSteps(2)}
          >
            کاربر گروهی
          </button>
        </div>
      </div>
      <TicketFields
        label="واحد مربوطه:"
        width="30%"
        value={annonceInfo.RelevantUnit}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setAnnounceInfo((last) => ({ ...last, RelevantUnit: e.target.value }))
        }
      />
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
            value={annonceInfo.text}
            onChange={(e) =>
              setAnnounceInfo((last) => ({ ...last, text: e.target.value }))
            }
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
    </form>
  );
}

export default NewPlacard;
