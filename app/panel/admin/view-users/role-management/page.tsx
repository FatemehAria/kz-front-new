"use client";
import { deleteRole, getAllRole, restoreRole, updateRole } from "@/utils/utils";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import vieweye from "@/public/ViewUsers/vieweye.svg";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { AiOutlineEdit } from "react-icons/ai";
import { RoleContext } from "../../context/role-context/RoleContext";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import NotFound from "../../components/NotFound";
import NewInfoOnEachPageBtn from "@/app/panel/user/components/NewInfoOnEachPageBtn";

export type RoleType = {
  role: {
    name_en: string;
    name_fa: string;
    id: number;
    deleted_at: string;
  };
};
function RoleManagement() {
  const [roles, setRoles] = useState<RoleType[]>([]);
  // const { setRoles, roles } = useContext(RoleContext);
  const [roleLoading, setRoleLoading] = useState({
    loading: false,
    error: "",
  });
  const { token } = useSelector((state: any) => state.userData);
  const [roleIsDeleted, setRoleIsDeleted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localRoles = JSON.parse(
        window.sessionStorage.getItem("roles") as string
      );
      console.log(localRoles);
      setRoles(localRoles);
    }
  }, []);

  useEffect(() => {
    getAllRole(token, setRoles, setRoleLoading);
  }, []);

  const [editField, setEditField] = useState({
    showEditField: false,
    name_en: "",
    name_fa: "",
  });
  console.log(roles);
  return (
    <div className="grid grid-cols-1 gap-5">
      <div className="flex">
        <NewInfoOnEachPageBtn
          btnText="ایجاد نقش"
          src="/panel/admin/view-users/role-management/create-role"
        />
      </div>
      <div className="bg-white shadow mx-auto rounded-2xl w-full p-[3%] text-center space-y-3">
        <div className="grid grid-cols-4">
          <div>ردیف</div>
          <div>نام نقش به فارسی</div>
          <div>نام نقش به انگلیسی</div>
          <div>عملیات</div>
        </div>

        {roleLoading.loading ? (
          <SkeletonTheme>
            <Skeleton count={1} className="p-2" baseColor="#EAEFF6" />
          </SkeletonTheme>
        ) : roleLoading.error ? (
          <NotFound text={`${roleLoading.error}`} />
        ) : (
          roles.map((item: any, index) => (
            <div
              className={`${
                roleIsDeleted && item.role.deleted_at
                  ? "bg-red-300"
                  : "bg-[#EAEFF6]"
              } grid grid-cols-4 gap-x-5 text-center py-1 rounded-[4px] cursor-pointer`}
              key={index}
            >
              <p>{index + 1}</p>
              <input
                value={item.role.name_en}
                className="bg-[#EAEFF6] caret-transparent cursor-default text-center"
                readOnly={true}
              />
              <input
                value={item.role.name_fa}
                className="bg-[#EAEFF6] caret-transparent cursor-default text-center"
                readOnly={true}
              />
              <div className="flex flex-row items-center justify-center gap-3">
                <Link
                  href={`/panel/admin/view-users/role-management/role-detail?id=${item.role.id}`}
                  className="flex justify-center"
                >
                  <Image src={vieweye} alt="مشاهده" width={20} height={20} />
                </Link>
                <span
                  onClick={() =>
                    deleteRole(item.role.id, token, setRoleIsDeleted)
                  }
                  className="flex justify-center"
                >
                  <RxCross1 className="text-red-600 text-lg" />
                </span>
                <span
                  onClick={() =>
                    restoreRole(item.role.id, token, setRoleIsDeleted)
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
                    onClick={() => handleRoleEdit(item.role.id)}
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

export default RoleManagement;
