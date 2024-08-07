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

export type RoleType = {
  role: {
    name_en: string;
    name_fa: string;
    id: number;
    deleted_at: string;
  };
};
function RoleManagement() {
  // const [roles, setRoles] = useState<RoleType[]>([]);
  const { setRoles, roles } = useContext(RoleContext);
  const { token } = useSelector((state: any) => state.userData);
  const [roleIsDeleted, setRoleIsDeleted] = useState(false);

  // useEffect(() => {
  //   getAllRole(token, setRoles);
  // }, []);

  const [editField, setEditField] = useState({
    showEditField: false,
    name_en: "",
    name_fa: "",
  });

  const handleRoleEdit = async (id: number) => {
    const selectedPermission = roles.find(
      (item: RoleType) => item.role.id === id
    );
    // check
    if (selectedPermission) {
      setRoles((last) =>
        last.map((item: RoleType) =>
          item.role.id === id
            ? {
                ...item,
                role: {
                  ...item.role,
                  name_en:
                    editField.name_en !== ""
                      ? editField.name_en
                      : item.role.name_en,
                  name_fa:
                    editField.name_fa !== ""
                      ? editField.name_fa
                      : item.role.name_fa,
                },
              }
            : item
        )
      );
    }
    await updateRole(token, id, editField.name_en, editField.name_fa);
  };

  console.log(roles);
  return (
    <div className="grid grid-cols-1 gap-5">
      <div className="flex">
        <Link
          href={`/panel/admin/view-users/role-management/create-role`}
          className="text-white bg-[#4866CF] p-2 rounded-[5px]"
        >
          + ایجاد نقش
        </Link>
      </div>
      <div className="bg-white shadow mx-auto rounded-2xl w-full p-[3%] text-center space-y-3">
        <div className="grid grid-cols-4">
          <div>ردیف</div>
          <div>نام نقش به فارسی</div>
          <div>نام تقش به انگلیسی</div>
          <div>عملیات</div>
        </div>

        {roles.map((item: any, index) => (
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
              value={
                editField.showEditField ? editField.name_en : item.role.name_en
              }
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
              value={
                editField.showEditField ? editField.name_fa : item.role.name_fa
              }
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
              <span
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
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoleManagement;
