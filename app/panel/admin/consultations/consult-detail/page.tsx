"use client";
import { getConsultationDetail } from "@/utils/utils";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export type ConsultationDetail = {
  id: number;
  title: string;
  description: string;
  date: string;
};
function ConsultDetail() {
  const { token } = useSelector((state: any) => state.userData);
  const params = useSearchParams();
  const id = params.get("id");
  const [consultationDetail, setConsultationDetail] = useState({
    title: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    getConsultationDetail(token, id, setConsultationDetail);
  }, []);
  return (
    <div className="bg-white shadow mx-auto rounded-2xl w-full p-[3%] text-center">
      <div className="grid grid-cols-3">
        <div>تاریخ درخواست مشاوره</div>
        <div>عنوان مشاوره</div>
        <div>توضیحات</div>
      </div>

      <div className="grid grid-cols-3 py-1 bg-[#EAEFF6] rounded-[4px] cursor-pointer">
        <p>{consultationDetail.date}</p>
        <p>{consultationDetail.title}</p>
        <p>{consultationDetail.description}</p>
      </div>
    </div>
  );
}

export default ConsultDetail;
