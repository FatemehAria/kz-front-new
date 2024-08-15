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
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import NotFound from "../components/NotFound";
const moment = require("moment-jalaali");
export type ConsultTypes = {
  id: number;
  deleted_at: string;
  title: string;
  description: string;
  created_at: string;
};
function Consultations() {
  const { token } = useSelector((state: any) => state.userData);
  const [allConsults, setAllConsults] = useState<ConsultTypes[]>([]);
  const [consultIsDeleted, setConsultIsDeleted] = useState(false);
  const [consultStatus, setConsultStatus] = useState({
    loading: false,
    erorr: "",
  });
  useEffect(() => {
    getAllConsultations(token, setAllConsults, setConsultStatus);
  }, []);

  return (
    <div>
      <div className="bg-white shadow mx-auto rounded-2xl w-full p-[3%] text-center grid grid-cols-1 gap-5">
        <div className="grid grid-cols-5">
          <div>ردیف</div>
          <div>تاریخ</div>
          <div>موضوع</div>
          <div>توضیحات</div>
          <div>عملیات</div>
        </div>
        {consultStatus.loading ? (
          <SkeletonTheme>
            <Skeleton count={1} className="p-2" baseColor="#EAEFF6" />
          </SkeletonTheme>
        ) : consultStatus.erorr ? (
          <NotFound text={`${consultStatus.erorr}`} />
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {allConsults.map((item, index) => (
              <div
                className={`${
                  consultIsDeleted && item.deleted_at
                    ? "bg-red-300"
                    : "bg-[#EAEFF6]"
                } grid grid-cols-5 gap-x-5 text-center py-1 rounded-[4px] cursor-pointer`}
                key={index}
              >
                <p>{index + 1}</p>
                <p>
                  {item.created_at
                    ? moment(
                        item.created_at,
                        "YYYY-MM-DDTHH:mm:ss.SSSZ"
                      ).format("jYYYY/jM/jD")
                    : "-"}
                </p>
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
        )}
      </div>
    </div>
  );
}

export default Consultations;
