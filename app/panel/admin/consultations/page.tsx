"use client";
import {
  deleteConsultation,
  getAllConsultations,
  restoreConsultation,
} from "@/utils/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import vieweye from "@/public/ViewUsers/vieweye.svg";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";

export type ConsultTypes = {
  id: number;
  deleted_at: string;
  title: string;
  description: string;
};
function Consultations() {
  const { token } = useSelector((state: any) => state.userData);
  const [allConsults, setAllConsults] = useState<ConsultTypes[]>([]);
  const [consultIsDeleted, setConsultIsDeleted] = useState(false);

  useEffect(() => {
    getAllConsultations(token, setAllConsults);
  }, []);
  
  return (
    <div className="grid grid-cols-1 gap-5">
      <div className="bg-white shadow mx-auto rounded-2xl w-full p-[3%] text-center space-y-3">
        <div className="grid grid-cols-5">
          <div>ردیف</div>
          <div>تاریخ</div>
          <div>موضوع</div>
          <div>توضیحات</div>
          <div>عملیات</div>
        </div>

        {allConsults.map((item, index) => (
          <div
            className={`${
              consultIsDeleted && item.deleted_at
                ? "bg-red-300"
                : "bg-[#EAEFF6]"
            } grid grid-cols-4 gap-x-5 text-center py-1 rounded-[4px] cursor-pointer`}
            key={index}
          >
            <p>{index + 1}</p>
            <p>{item.title}</p>
            <p>{item.description}</p>
            <div className="flex flex-row items-center justify-center gap-3">
              <Link
                href={`/panel/admin/consultations/consult-detail?id=${item.id}`}
                className="flex justify-center"
              >
                <Image src={vieweye} alt="مشاهده" width={20} height={20} />
              </Link>
              <span
                onClick={() =>
                  deleteConsultation(item.id, token, setConsultIsDeleted)
                }
                className="flex justify-center"
              >
                <RxCross1 className="text-red-600 text-lg" />
              </span>
              <span
                onClick={() =>
                  restoreConsultation(item.id, token, setConsultIsDeleted)
                }
              >
                <MdOutlineSettingsBackupRestore className="text-yellow-600 text-lg" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Consultations;
