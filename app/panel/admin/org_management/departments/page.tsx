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
import { DepartmentContext } from "../../view-users/context/department-context/DepartmentContext";

export type DepartmentType = {
  id: number;
  name_en: string;
  name_fa: string;
  deleted_at: string;
};
function Departments() {
  const { departments, setDepartments } = useContext(DepartmentContext);
  const { token } = useSelector((state: any) => state.userData);
  const [departmentIsDeleted, setDepartmentIsDeleted] = useState(false);

  const [editField, setEditField] = useState({
    showEditField: false,
    name_en: "",
    name_fa: "",
  });

  const handleBrandEdit = async (id: number) => {
    // const selectedBrand = brands.find(
    //   (item: BrandType) => item.brand.id === id
    // );

    // if (selectedBrand) {
    //   setBrands((last) =>
    //     last.map((item: BrandType) =>
    //       item.brand.id === id
    //         ? {
    //             ...item,
    //             brand: {
    //               ...item.brand,
    //               title:
    //                 editField.editTitle !== ""
    //                   ? editField.editTitle
    //                   : item.brand.title,
    //               description:
    //                 editField.editDesc !== ""
    //                   ? editField.editDesc
    //                   : item.brand.description,
    //             },
    //           }
    //         : item
    //     )
    //   );
    // }
    await updateBrand(token, id, editField.name_en, editField.name_fa);
  };
  return (
    <div>
      <div className="flex">
        <Link
          href={`/panel/admin/org_management/departments/create-department`}
          className="text-white bg-[#4866CF] p-2 rounded-[5px]"
        >
          + ایجاد دپارتمان
        </Link>
      </div>
      <div className="bg-white shadow mx-auto rounded-2xl w-full p-[3%] text-center space-y-3">
        <div className="grid grid-cols-4">
          <div>ردیف</div>
          <div>نام دپارتمان به فارسی</div>
          <div>نام دپارتمان به انگلیسی</div>
          <div>عملیات</div>
        </div>

        {departments.map((item, index) => (
          <div
            className={`${
              departmentIsDeleted && item.deleted_at
                ? "bg-red-300"
                : "bg-[#EAEFF6]"
            } grid grid-cols-4 gap-x-5 text-center py-1 rounded-[4px] cursor-pointer`}
            key={index}
          >
            <p>{index + 1}</p>
            <input
              value={editField.showEditField ? editField.name_en : item.name_en}
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
              value={editField.showEditField ? editField.name_fa : item.name_fa}
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
                href={`/panel/admin/org_department/departments/department-detail?id=${item.id}`}
                className="flex justify-center"
              >
                <Image src={vieweye} alt="مشاهده" width={20} height={20} />
              </Link>
              <span
                onClick={() =>
                  deleteDepartment(item.id, token, setDepartmentIsDeleted)
                }
                className="flex justify-center"
              >
                <RxCross1 className="text-red-600 text-lg" />
              </span>
              <span
                onClick={() =>
                  restoreDepartment(item.id, token, setDepartmentIsDeleted)
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
                    onClick={() => handleBrandEdit(item.id)}
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

export default Departments;
