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
  const { LastName, token, type, userProfile, status } = useSelector(
    (state: any) => state.userData
  );
  const [step, setStep] = useState(type);

  const LegalUserOrgName = userProfile.organizations?.map((item) => item.name)
  const LegalUserShenaseMellli = userProfile.organizations?.map((item) => item.shenase_melli)
  const LegalUserOrgReg = userProfile.organizations?.map((item) => item.registration_number)
  useEffect(() => {
    setStep(type);
  }, [type]);

  const renderSteps = () => {
    switch (step) {
      case "haghighi":
        return <Genuine userProfile={userProfile} />;
      case "hoghooghi":
        return (
          <Legal
            PhoneNumber={userProfile.mobile}
            token={token}
            name_of_Organization={LegalUserOrgName}
            shenase_melli={LegalUserShenaseMellli}
            registration_Number={LegalUserOrgReg}
            path={userProfile.pic_path}
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
