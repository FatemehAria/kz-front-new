"use client";
import { getPlanDetail } from "@/utils/utils";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export type PlanDetailType = {
  title: string;
  description: string;
};

function PlanDetail() {
  const params = useSearchParams();
  const id = params.get("id");
  const [planDetail, setPlanDetail] = useState<PlanDetailType>({
    title: "",
    description: "",
  });

  useEffect(() => {
    getPlanDetail(id, setPlanDetail);
  }, []);

  return (
    <div className="bg-white shadow mx-auto rounded-2xl w-full p-[3%] text-center">
      <div className="grid grid-cols-2">
        <div>نام پلن</div>
        <div>توضیحات</div>
      </div>

      <div className="grid grid-cols-2 py-1 bg-[#EAEFF6] rounded-[4px] cursor-pointer">
        <p>{planDetail.title}</p>
        <p>{planDetail.description}</p>
      </div>
    </div>
  );
}

export default PlanDetail;
