"use client";
import { deleteSiteType, getAllSiteTypes, restoreSiteType, updateSiteType } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import vieweye from "@/public/ViewUsers/vieweye.svg";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { AiOutlineEdit } from "react-icons/ai";

function SiteTypes() {
  const [siteTypes, setSiteTypes] = useState<never[]>([]);
  const { token } = useSelector((state: any) => state.userData);
  const [siteTypeIsDeleted, setSiteTypeIsDeleted] = useState(false);

  useEffect(() => {
    getAllSiteTypes(token, setSiteTypes);
  }, []);

  const [editField, setEditField] = useState({
    showEditField: false,
    editTitle: "",
    editDesc: "",
  });

  const handleSiteTypeEdit = async (id: number) => {
    const selectedSiteType = siteTypes.find(
      //check
      (item: any) => item.id === id
    );

    if (selectedSiteType) {
      setSiteTypes((last) =>
        last.map((item: any) =>
          item.id === id
            ? {
                ...item,
                brand: {
                  ...item.brand,
                  title:
                    editField.editTitle !== ""
                      ? editField.editTitle
                      : item.title,
                  description:
                    editField.editDesc !== ""
                      ? editField.editDesc
                      : item.description,
                },
              }
            : item
        )
      );
    }
    await updateSiteType(token, id, editField.editTitle, editField.editDesc);
  };
  return (
    <div className="grid grid-cols-1 gap-5">
      <Link
        href={`/panel/admin/plan-management/site-types/create-site-type`}
        className="text-white bg-[#4866CF] p-2 rounded-[5px] w-[140px] whitespace-nowrap"
      >
        + ایجاد نوع طراحی
      </Link>
      <div className="bg-white shadow mx-auto rounded-2xl w-full p-[3%] text-center space-y-3">
        <div className="grid grid-cols-4">
          <div>ردیف</div>
          <div>نام طراحی</div>
          <div>توضیحات</div>
          <div>عملیات</div>
        </div>

        {siteTypes.map((item: any, index) => (
          <div
            className={`${
              siteTypeIsDeleted && item.deleted_at
                ? "bg-red-300"
                : "bg-[#EAEFF6]"
            } grid grid-cols-4 gap-x-5 text-center py-1 rounded-[4px] cursor-pointer`}
            key={index}
          >
            <p>{index + 1}</p>
            <input
              value={editField.showEditField ? editField.editTitle : item.title}
              onChange={(e) =>
                setEditField((last) => ({
                  ...last,
                  editTitle: e.target.value,
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
                editField.showEditField
                  ? editField.editDesc
                  : item.brand.description
              }
              onChange={(e) =>
                setEditField((last) => ({
                  ...last,
                  editDesc: e.target.value,
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
                href={`/panel/admin/brands/brand-detail?id=${item.brand.id}`}
                className="flex justify-center"
              >
                <Image src={vieweye} alt="مشاهده" width={20} height={20} />
              </Link>
              <span
                onClick={() =>
                  deleteSiteType(item.id, token, setSiteTypeIsDeleted)
                }
                className="flex justify-center"
              >
                <RxCross1 className="text-red-600 text-lg" />
              </span>
              <span
                onClick={() =>
                  restoreSiteType(item.brand.id, token, setSiteTypeIsDeleted)
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
                    onClick={() => handleSiteTypeEdit(item.id)}
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

export default SiteTypes;
