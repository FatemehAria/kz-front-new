"use client";
import {
  deleteDepartment,
  getAllDepartments,
  restoreDepartment,
  updateBrand,
} from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import vieweye from "@/public/ViewUsers/vieweye.svg";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { AiOutlineEdit } from "react-icons/ai";
import { DepartmentContext } from "../../context/department-context/DepartmentContext";
import NewInfoOnEachPageBtn from "@/app/panel/user/components/NewInfoOnEachPageBtn";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import NotFound from "../../components/NotFound";

export type DepartmentType = {
  id: number;
  name_en: string;
  name_fa: string;
  deleted_at: string;
};
export type DepartmentFinalType = {
  department: {
    id: number;
    name_en: string;
    name_fa: string;
    deleted_at: string;
  };
};
function Departments() {
  // const { departments } = useContext(DepartmentContext);
  // const typedDepartments: DepartmentType[] = departments as DepartmentType[];
  const [departments, setDepartments] = useState<
    DepartmentType[] | DepartmentFinalType[]
  >([]);
  const [departmentLoading, setDepartmentLoading] = useState({
    loading: false,
    error: "",
  });
  const { token } = useSelector((state: any) => state.userData);
  const [departmentIsDeleted, setDepartmentIsDeleted] = useState(false);
  const [editField, setEditField] = useState({
    showEditField: false,
    name_en: "",
    name_fa: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localDepartments = JSON.parse(
        window.sessionStorage.getItem("departments") as string
      );
      setDepartments(localDepartments);
    }
  }, []);

  useEffect(() => {
    getAllDepartments(token, setDepartments, setDepartmentLoading);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="flex">
        <NewInfoOnEachPageBtn
          btnText="ایجاد دپارتمان"
          src="/panel/admin/org_management/departments/create-department"
        />
      </div>
      <div className="bg-white shadow mx-auto rounded-2xl w-full p-[3%] text-center grid grid-cols-1 gap-5">
        <div className="grid grid-cols-4">
          <div>ردیف</div>
          <div>نام دپارتمان به انگلیسی</div>
          <div>نام دپارتمان به فارسی</div>
          <div>عملیات</div>
        </div>

        {departmentLoading.loading ? (
          <SkeletonTheme>
            <Skeleton count={1} className="p-2" baseColor="#EAEFF6" />
          </SkeletonTheme>
        ) : departmentLoading.error ? (
          <NotFound text={`${departmentLoading.error}`} />
        ) : (
          departments.map((item: any, index) => (
            <div
              className={`${
                departmentIsDeleted && item.department.deleted_at
                  ? "bg-red-300"
                  : "bg-[#EAEFF6]"
              } grid grid-cols-4 gap-x-5 text-center py-1 rounded-[4px] cursor-pointer`}
              key={index}
            >
              <p>{index + 1}</p>
              <input
                value={item.department.name_en}
                onChange={(e) =>
                  setEditField((last) => ({
                    ...last,
                    name_en: e.target.value,
                  }))
                }
                className={`${
                  editField.showEditField
                    ? "bg-white"
                    : "bg-[#EAEFF6] caret-transparent cursor-default text-center"
                } outline-none`}
              />
              <input
                value={item.department.name_fa}
                onChange={(e) =>
                  setEditField((last) => ({
                    ...last,
                    name_fa: e.target.value,
                  }))
                }
                className={`${
                  editField.showEditField
                    ? "bg-white"
                    : "bg-[#EAEFF6] caret-transparent cursor-default text-center"
                } outline-none`}
              />
              <div className="flex flex-row items-center justify-center gap-3">
                <Link
                  href={`/panel/admin/org_management/departments/department-detail?id=${item.department.id}`}
                  className="flex justify-center"
                >
                  <Image src={vieweye} alt="مشاهده" width={20} height={20} />
                </Link>
                <span
                  onClick={() =>
                    deleteDepartment(
                      item.department.id,
                      token,
                      setDepartmentIsDeleted
                    )
                  }
                  className="flex justify-center"
                >
                  <RxCross1 className="text-red-600 text-lg" />
                </span>
                <span
                  onClick={() =>
                    restoreDepartment(
                      item.department.id,
                      token,
                      setDepartmentIsDeleted
                    )
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
                    onClick={() => handleBrandEdit(item.id)}
                    className="text-green-600 text-lg"
                  />
                ) : (
                  <AiOutlineEdit className="text-green-600 text-lg" />
                )}
              </span> */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Departments;
