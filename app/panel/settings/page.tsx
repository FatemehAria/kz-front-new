"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Genuine from "./genuine";
import Legal from "./legal";
import {
  getIdFromLocal,
  getTokenFromLocal,
  readPhoneNumberFromLocalStroage,
} from "@/redux/features/user/userSlice";
import SettingsHeader from "./components/settings-header";

function PersonalInfo() {
  const [step, setStep] = useState(1);
  const { PhoneNumber, localToken, localUserId, userProfile } =
    useSelector((state: any) => state.userData);
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
            userId={localUserId}
            token={localToken}
          />
        );
      case 2:
        return (
          <Legal
            PhoneNumber={PhoneNumber}
            userId={localUserId}
            token={localToken}
            userProfile={userProfile}
          />
        );
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <div className="py-[5%] w-[90%] shadow mx-auto bg-white rounded-2xl px-[3%]">
        <div className="pb-[5%] pt-0">
          <SettingsHeader step={step} setStep={setStep} />
        </div>
        {renderSteps()}
      </div>
    </React.Fragment>
  );
}

export default PersonalInfo;
