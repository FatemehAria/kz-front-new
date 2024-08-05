"use client";
import { getBrandDetail } from "@/utils/utils";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export type BrandDetailType = {
  title: string;
  description: string;
};
function BrandDetail() {
  const params = useSearchParams();
  const id = params.get("id");
  const [brandDetail, setBrandDetail] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    getBrandDetail(id, setBrandDetail);
  }, []);

  return (
    <div className="bg-white shadow mx-auto rounded-2xl w-full p-[3%] text-center">
      <div className="grid grid-cols-2">
        <div>نام برند</div>
        <div>توضیحات</div>
      </div>

      <div className="grid grid-cols-2 py-1 bg-[#EAEFF6] rounded-[4px] cursor-pointer">
        <p>{brandDetail.title}</p>
        <p>{brandDetail.description}</p>
      </div>
    </div>
  );
}

export default BrandDetail;
