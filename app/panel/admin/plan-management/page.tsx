"use client";
import {
  deletePlan,
  getAllPlans,
  restorePlan,
  updatePlan,
} from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import vieweye from "@/public/ViewUsers/vieweye.svg";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import NotFound from "../components/NotFound";

export type PlanType = {
  plan: {
    title: string;
    description: string;
    id: number;
    deleted_at: string;
  };
};

function PlanManagement() {
  const { token } = useSelector((state: any) => state.userData);
  const [allPlans, setAllPlans] = useState<PlanType[]>([]);
  const [planIsDeleted, setPlanIsDeleted] = useState(false);
  const [plansStatus, setPlansStatus] = useState({
    loading: false,
    error: "",
  });
  const [editField, setEditField] = useState({
    showEditField: false,
    editTitle: "",
    editDesc: "",
  });

  const handlePlanEdit = async (id: number) => {
    const selectedPlan = allPlans.find((item: PlanType) => item.plan.id === id);
    if (selectedPlan) {
      setAllPlans((last) =>
        last.map((item: PlanType) =>
          item.plan.id === id
            ? {
                ...item,
                plan: {
                  ...item.plan,
                  title:
                    editField.editTitle !== ""
                      ? editField.editTitle
                      : item.plan.title,
                  description:
                    editField.editDesc !== ""
                      ? editField.editDesc
                      : item.plan.description,
                },
              }
            : item
        )
      );
    }
    await updatePlan(token, id, editField.editTitle, editField.editDesc);
  };

  useEffect(() => {
    getAllPlans(token, setAllPlans, setPlansStatus);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-center gap-5 whitespace-nowrap">
        <Link
          href={`/panel/admin/plan-management/create-plan`}
          className="text-white bg-[#4866CF] p-2 rounded-[5px] w-[100px]"
        >
          + ایجاد پلن
        </Link>
        <Link
          href={`/panel/admin/plan-management/site-types`}
          className="text-white bg-[#4866CF] p-2 rounded-[5px] w-[230px]"
        >
          مدیریت سایت های قابل طراحی
        </Link>
      </div>
      <div className="bg-white shadow mx-auto rounded-2xl w-full p-[3%] text-center space-y-3">
        <div className="grid grid-cols-4">
          <div>ردیف</div>
          <div>عنوان پلن</div>
          <div>توضیحات</div>
          <div>عملیات</div>
        </div>
        {plansStatus.loading ? (
          <SkeletonTheme>
            <Skeleton count={1} className="p-2" baseColor="#EAEFF6" />
          </SkeletonTheme>
        ) : plansStatus.error ? (
          <NotFound text={`${plansStatus.error}`} />
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {allPlans.map((item: PlanType, index) => (
              <div
                className={`${
                  planIsDeleted && item.plan.deleted_at
                    ? "bg-red-300"
                    : "bg-[#EAEFF6]"
                } grid grid-cols-4 text-center py-1 rounded-[4px] cursor-pointer`}
                key={index}
              >
                <p>{index + 1}</p>
                <input
                  value={item.plan.title}
                  // onChange={(e) =>
                  //   setEditField((last) => ({
                  //     ...last,
                  //     editTitle: e.target.value,
                  //   }))
                  // }
                  className={`${
                    editField.showEditField
                      ? "bg-white"
                      : "bg-[#EAEFF6] caret-transparent cursor-default text-center"
                  } outline-none`}
                  readOnly={true}
                />
                <input
                  value={item.plan.description ? item.plan.description : "-"}
                  // onChange={(e) =>
                  //   setEditField((last) => ({
                  //     ...last,
                  //     editDesc: e.target.value,
                  //   }))
                  // }
                  className={`${
                    editField.showEditField
                      ? "bg-white"
                      : "bg-[#EAEFF6] caret-transparent cursor-default text-center"
                  } outline-none`}
                  readOnly={true}
                />
                <div className="flex flex-row items-center justify-center gap-3">
                  <Link
                    href={`/panel/admin/plan-management/plan-detail?id=${item.plan.id}`}
                    className="flex justify-center"
                  >
                    <Image src={vieweye} alt="مشاهده" width={20} height={20} />
                  </Link>
                  <span
                    onClick={() =>
                      deletePlan(item.plan.id, token, setPlanIsDeleted)
                    }
                    className="flex justify-center"
                  >
                    <RxCross1 className="text-red-600 text-lg" />
                  </span>
                  <span
                    onClick={() =>
                      restorePlan(item.plan.id, token, setPlanIsDeleted)
                    }
                  >
                    <MdOutlineSettingsBackupRestore className="text-yellow-600 text-lg" />
                  </span>
                  {/* <span
                onClick={() =>
                  setEditField((last) => ({
                    ...last,
                    showEditField: !last.showEditField,
                  }))
                }
                className="flex justify-center"
              >
                {editField.showEditField ? (
                  <FaCheck
                    onClick={() => handlePlanEdit(item.plan.id)}
                    className="text-green-600 text-lg"
                  />
                ) : (
                  <AiOutlineEdit className="text-green-600 text-lg" />
                )}
              </span> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PlanManagement;
