"use client";
import React, { useEffect, useState } from "react";
import PersonalInfoHeader from "./components/personal-info-header";
import { useDispatch, useSelector } from "react-redux";
import Genuine from "./genuine";
import Legal from "./legal";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
  readPhoneNumberFromLocalStroage,
} from "@/redux/features/user/userSlice";
import NotFound from "../../admin/components/NotFound";
import SubLoading from "@/components/SubLoading";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function PersonalInfo() {
  const {
    userId,
    PhoneNumber,
    localToken,
    localUserId,
    type,
    userProfile,
    status,
  } = useSelector((state: any) => state.userData);
  const dispatch = useDispatch();
  const [step, setStep] = useState(type);
  useEffect(() => {
    dispatch(readPhoneNumberFromLocalStroage());
    dispatch(getTokenFromLocal());
    dispatch(getIdFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);

  useEffect(() => {
    setStep(type);
  }, [type]);

  const renderSteps = () => {
    switch (step) {
      case "Genuine":
        return (
          <Genuine
            PhoneNumber={PhoneNumber}
            userId={userId}
            token={localToken}
          />
        );
      case "Legal":
        return (
          <Legal
            PhoneNumber={PhoneNumber}
            userId={localUserId}
            token={localToken}
            name_of_Organization={userProfile.name_of_Organization}
            National_ID={userProfile.National_ID}
            registration_Number={userProfile.registration_Number}
            path={userProfile.avatar?.path}
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
          <PersonalInfoHeader
            step={step}
            color="#EAEFF6"
            // cursor={`${step === "Genuine" ? "cursor-default" : "cursor-pointer"}`}
          />
        </div>
        {status === "loading" || status === "idle" ? (
          // <SubLoading />
          <SkeletonTheme>
            <Skeleton count={1} className="p-3" baseColor="#EAEFF6" />
          </SkeletonTheme>
        ) : status === "failed" ? (
          <NotFound text="خطا در دریافت اطلاعات" />
        ) : (
          status === "success" && renderSteps()
        )}
      </div>
    </React.Fragment>
  );
}

export default PersonalInfo;
