"use client";
import {
  deletePermission,
  getAllPermissions,
  restorePermission,
} from "@/utils/utils";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import vieweye from "@/public/ViewUsers/vieweye.svg";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { PermissionContext } from "../../context/permission-context/PermissionContext";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import NotFound from "../../components/NotFound";
import NewInfoOnEachPageBtn from "@/app/panel/user/components/NewInfoOnEachPageBtn";

export type PermissionType = {
  name_en: string;
  name_fa: string;
  id: number;
};

function PermissionManagement() {
  const { permissions, setPermissions, permissionStatus, setPermissionStatus } =
    useContext(PermissionContext);
  const { token } = useSelector((state: any) => state.userData);
  const [permissionIsDeleted, setPermissionIsDeleted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localPermissions = JSON.parse(
        window.sessionStorage.getItem("permissions") as string
      );
      setPermissions(localPermissions);
    }
  }, [setPermissions]);

  useEffect(() => {
    getAllPermissions(token, setPermissions, setPermissionStatus);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-5">
      <div className="flex gap-5">
        <NewInfoOnEachPageBtn
          btnText="ایجاد دسترسی"
          src="/panel/admin/view-users/permission-management/create-permission"
        />
        <Link
          href={`/panel/admin/view-users/permission-management/change-permission`}
          className="text-white bg-[#4866CF] p-2 rounded-[5px]"
        >
          تغییر و مدیریت دسترسی ها
        </Link>
      </div>
      <div className="bg-white shadow mx-auto rounded-2xl w-full p-[3%] text-center space-y-3">
        <div className="grid grid-cols-4">
          <div>ردیف</div>
          <div>نام دسترسی به فارسی</div>
          <div>نام دسترسی به انگلیسی</div>
          <div>عملیات</div>
        </div>

        {permissionStatus.loading ? (
          <SkeletonTheme>
            <Skeleton count={1} className="p-2" baseColor="#EAEFF6" />
          </SkeletonTheme>
        ) : permissionStatus.error ? (
          <NotFound text={`${permissionStatus.error}`} />
        ) : (
          permissions?.map((item: any, index) => (
            <div
              className={`${
                permissionIsDeleted && item.deleted_at
                  ? "bg-red-300"
                  : "bg-[#EAEFF6]"
              } grid grid-cols-4 gap-x-5 text-center py-1 rounded-[4px] cursor-pointer`}
              key={index}
            >
              <p>{index + 1}</p>
              <input
                value={item.name_en}
                readOnly={true}
                className="bg-[#EAEFF6] caret-transparent cursor-default text-center outline-none"
              />
              <input
                value={item.name_fa}
                readOnly={true}
                className="bg-[#EAEFF6] caret-transparent cursor-default text-center outline-none"
              />
              <div className="flex flex-row items-center justify-center gap-3">
                <Link
                  href={`/panel/admin/view-users/permission-management/permission-detail?id=${item.id}`}
                  className="flex justify-center"
                >
                  <Image src={vieweye} alt="مشاهده" width={20} height={20} />
                </Link>
                <span
                  onClick={() =>
                    deletePermission(item.id, token, setPermissionIsDeleted)
                  }
                  className="flex justify-center"
                >
                  <RxCross1 className="text-red-600 text-lg" />
                </span>
                <span
                  onClick={() =>
                    restorePermission(item.id, token, setPermissionIsDeleted)
                  }
                >
                  <MdOutlineSettingsBackupRestore className="text-yellow-600 text-lg" />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PermissionManagement;
