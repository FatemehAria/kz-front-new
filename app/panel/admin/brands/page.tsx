"use client";
import {
  deleteBrand,
  getAllBrands,
  restoreBrand,
  updateBrand,
} from "@/utils/utils";
import React, { useEffect, useState } from "react";
import vieweye from "@/public/ViewUsers/vieweye.svg";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";

export type BrandType = {
  brand: {
    title: string;
    description: string;
    id: number;
    deleted_at: string;
  };
};
function Brands() {
  const [brands, setBrands] = useState<BrandType[]>([]);
  const { token } = useSelector((state: any) => state.userData);
  const [brandIsDeleted, setBrandIsDeleted] = useState(false);

  useEffect(() => {
    getAllBrands(setBrands);
  }, []);

  const [editField, setEditField] = useState({
    showEditField: false,
    editTitle: "",
    editDesc: "",
  });

  const handleBrandEdit = async (id: number) => {
    const selectedBrand = brands.find(
      (item: BrandType) => item.brand.id === id
    );

    if (selectedBrand) {
      setBrands((last) =>
        last.map((item: BrandType) =>
          item.brand.id === id
            ? {
                ...item,
                brand: {
                  ...item.brand,
                  title:
                    editField.editTitle !== ""
                      ? editField.editTitle
                      : item.brand.title,
                  description:
                    editField.editDesc !== ""
                      ? editField.editDesc
                      : item.brand.description,
                },
              }
            : item
        )
      );
    }
    console.log("brands", brands);
    await updateBrand(token, id, editField.editTitle, editField.editDesc);
  };
  return (
    <div className="grid grid-cols-1 gap-5">
      <div className="flex">
        <Link
          href={`/panel/admin/brands/create-brand`}
          className="text-white bg-[#4866CF] p-2 rounded-[5px]"
        >
          + ایجاد برند
        </Link>
      </div>
      <div className="bg-white shadow mx-auto rounded-2xl w-full p-[3%] text-center space-y-3">
        <div className="grid grid-cols-4">
          <div>ردیف</div>
          <div>نام برند</div>
          <div>توضیحات</div>
          <div>عملیات</div>
        </div>

        {brands.map(
          (
            item: {
              brand: {
                title: string;
                description: string;
                id: number;
                deleted_at: string;
              };
            },
            index
          ) => (
            <div
              className={`${
                brandIsDeleted && item.brand.deleted_at
                  ? "bg-red-300"
                  : "bg-[#EAEFF6]"
              } grid grid-cols-4 gap-x-5 text-center py-1 rounded-[4px] cursor-pointer`}
              key={index}
            >
              <p>{index + 1}</p>
              <input
                value={
                  editField.showEditField
                    ? editField.editTitle
                    : item.brand.title
                }
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
                    deleteBrand(item.brand.id, token, setBrandIsDeleted)
                  }
                  className="flex justify-center"
                >
                  <RxCross1 className="text-red-600 text-lg" />
                </span>
                <span
                  onClick={() =>
                    restoreBrand(item.brand.id, token, setBrandIsDeleted)
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
                      onClick={() => handleBrandEdit(item.brand.id)}
                      className="text-green-600 text-lg"
                    />
                  ) : (
                    <AiOutlineEdit className="text-green-600 text-lg" />
                  )}
                </span>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Brands;
