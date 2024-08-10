"use client";
import { getBrandDetail, getOrganizationDetail } from "@/utils/utils";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export type BrandDetailType = {
  title: string;
  description: string;
};
function OrgDetail() {
  const { token } = useSelector((state: any) => state.userData);
  const params = useSearchParams();
  const id = params.get("id");
  const [orgDetail, setOrgDetail] = useState({
    name: "",
    descriprion: "",
    phone: "",
    shenase_melli: "",
  });

  useEffect(() => {
    getOrganizationDetail(token, id, setOrgDetail);
  }, []);

  return (
    <div className="bg-white shadow mx-auto rounded-2xl w-full p-[3%] text-center">
      <div className="grid grid-cols-4">
        <div>نام سازمان</div>
        <div>توضیحات</div>
        <div>شماره تماس</div>
        <div>شناسه ملی</div>
      </div>

      <div className="grid grid-cols-4 py-1 bg-[#EAEFF6] rounded-[4px] cursor-pointer">
        <p>{orgDetail.name}</p>
        <p>{orgDetail.descriprion}</p>
        <p>{orgDetail.phone}</p>
        <p>{orgDetail.shenase_melli ? orgDetail.shenase_melli : "-"}</p>
      </div>
    </div>
  );
}

export default OrgDetail;
