"use client";
import React, { useEffect, useState } from "react";
import PersonalInfoHeader from "./components/personal-info-header";
import { useDispatch, useSelector } from "react-redux";
import Genuine from "./genuine";
import Legal from "./legal";
import {
  getIdFromLocal,
  getTokenFromLocal,
  readPhoneNumberFromLocalStroage,
} from "@/redux/features/user/userSlice";
import axios from "axios";

function PersonalInfo() {
  const [step, setStep] = useState(1);
  const { userId, PhoneNumber, localToken,localUserId } = useSelector(
    (state: any) => state.userData
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(readPhoneNumberFromLocalStroage());
    dispatch(getTokenFromLocal());
    dispatch(getIdFromLocal());
  }, []);
  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <Genuine
            PhoneNumber={PhoneNumber}
            userId={userId}
            token={localToken}
          />
        );
      case 2:
        return (
          <Legal PhoneNumber={PhoneNumber} userId={localUserId} token={localToken} />
        );
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <div className="py-[5%] w-[90%] shadow mx-auto bg-white rounded-2xl px-[3%]">
        <div className="pb-[5%] pt-0">
          <PersonalInfoHeader step={step} setStep={setStep} />
        </div>
        {renderSteps()}
      </div>
    </React.Fragment>
  );
}

export default PersonalInfo;
