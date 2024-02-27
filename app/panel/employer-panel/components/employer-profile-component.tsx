"use client";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useState } from "react";
import InfoFields from "../../components/info-fields";
import { useSelector } from "react-redux";
type EmployerProfileComponentProps = {
  setSteps: Dispatch<SetStateAction<number>>;
};
const EmployerProfileComponent = ({
  setSteps,
}: EmployerProfileComponentProps) => {
  const { userProfile } = useSelector((store: any) => store.userRole);
  const [disable, setDisable] = useState(true);
  return (
    <div className="w-[90%] mx-auto rounded-xl p-[2%] grid grid-cols-1 justify-center gap-[3%] lg:bg-profileBorderbg my-[2%]">
      <div className="bg-white w-full rounded-lg grid grid-cols-1 gap-[20%] lg:gap-[8%] lg:py-[5%] lg:px-[3%]">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-[5%]">
          <div className="grid grid-cols-1 justify-between gap-y-[8%] order-2 lg:order-none">
            <InfoFields
              title="شماره تماس"
              info={userProfile.PhoneNumber}
              disable={disable}
              type="text"
            />
            <InfoFields
              title="اسم کامل"
              info={userProfile.FirstName + " " + userProfile.LastName}
              disable={disable}
              type="text"
            />
            <InfoFields
              title="نام کاربری"
              info={userProfile.PhoneNumber}
              disable={disable}
              type="text"
            />
          </div>
          <div className="grid grid-cols-1 gap-y-[2%]">
            <div className="lg:w-[200px] lg:h-[200px] rounded-full bg-[#D9D9D9] mx-auto w-[100px] h-[100px]"></div>
            <div
              className="bg-[#EDF0FB] text-black lg:flex justify-center items-center rounded-lg py-[1%] px-[5%] mx-auto lg:w-[8%] w-[30%] hidden"
              onClick={() => setSteps(1)}
            >
              <button>ادیت</button>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center gap-[25%]">
          <Link
            href="/panel/profile/edit-info"
            className="bg-[#EDF0FB] text-black flex justify-center w-full items-center rounded-xl py-[1%] lg:px-[5%] mx-auto lg:w-[8%] lg:hidden"
          >
            <button>ادیت</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfileComponent;
