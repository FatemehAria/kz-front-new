import React from "react";
import PanelFields from "../../components/panel-fileds";
import Image from "next/image";
import malegender from "../../../../public/Panel/malegender.svg";
import Link from "next/link";
type LegalProps = {
  PhoneNumber: string;
  token: string;
  name_of_Organization: string;
  National_ID: string;
  registration_Number: string;
  path?: string;
};
function Legal({
  PhoneNumber,
  name_of_Organization,
  National_ID,
  registration_Number,
  path,
}: LegalProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-[5%]">
        <div className="flex flex-col justify-between gap-3">
          <PanelFields
            label="نام سازمان:"
            value={name_of_Organization}
            name="name_of_Organization"
            disable={true}
          />
          <PanelFields
            label="شماره موبایل:"
            value={PhoneNumber}
            disable={true}
          />
          <PanelFields
            label="شناسه ملی:"
            value={National_ID}
            name="National_ID"
            disable={true}
          />
        </div>
        <div className="flex flex-col justify-between">
          <div className="self-center">
            <Image
              src={path ? path : malegender}
              alt="profile"
              width={250}
              height={250}
            />
          </div>
          <PanelFields
            label="شماره ثبت:"
            value={registration_Number}
            name="registration_Number"
            disable={true}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Link
          className="bg-[#4866CF] text-white px-3 py-1 rounded-lg"
          href="/panel/user/settings"
        >
          ویرایش حساب کاربری
        </Link>
      </div>
    </div>
  );
}

export default Legal;
