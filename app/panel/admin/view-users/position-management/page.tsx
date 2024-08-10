"use client";
import {
  deletePosition,
  restorePosition,
} from "@/utils/utils";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import vieweye from "@/public/ViewUsers/vieweye.svg";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { PositionContext } from "../../context/position-context/PositionContext";

export type PositionType = {
  position: {
    title_en: string;
    title_fa: string;
    id: number;
    deleted_at: string;
    dept_id: string;
    user_id: string;
  };
};
function PositionManagement() {
  // const [positions, setPositions] = useState<PositionType[]>([]);
  const { positions, setPositions } = useContext(PositionContext);
  const { token } = useSelector((state: any) => state.userData);
  const [positionIsDeleted, setPositionIsDeleted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localPositions = JSON.parse(
        window.localStorage.getItem("positions") as string
      );
      setPositions(localPositions);
    }
  }, []);

  console.log("positions", positions);


  const [editField, setEditField] = useState({
    showEditField: false,
    title_en: "",
    title_fa: "",
    dept_id: "",
    user_id: "",
  });

  // const handlePositionEdit = async (id: number) => {
  //   const selectedPosition = positions.find(
  //     (item: PositionType) => item.position.id === id
  //   );
  //   // check
  //   if (selectedPosition) {
  //     setPositions((last) =>
  //       last.map((item: PositionType) =>
  //         item.position.id === id
  //           ? {
  //               ...item,
  //               position: {
  //                 ...item.position,
  //                 title_en:
  //                   editField.title_en !== ""
  //                     ? editField.title_en
  //                     : item.position.title_en,
  //                 title_fa:
  //                   editField.title_fa !== ""
  //                     ? editField.title_fa
  //                     : item.position.title_fa,
  //                 dept_id:
  //                   editField.dept_id !== ""
  //                     ? editField.dept_id
  //                     : item.position.dept_id,
  //                 user_id:
  //                   editField.user_id !== ""
  //                     ? editField.user_id
  //                     : item.position.user_id,
  //               },
  //             }
  //           : item
  //       )
  //     );
  //   }
  //   await updatePosition(
  //     token,
  //     id,
  //     editField.title_en,
  //     editField.title_fa,
  //     Number(editField.dept_id),
  //     Number(editField.user_id)
  //   );
  // };

  return (
    <div className="grid grid-cols-1 gap-5">
      <div className="flex">
        <Link
          href={`/panel/admin/view-users/position-management/create-position`}
          className="text-white bg-[#4866CF] p-2 rounded-[5px]"
        >
          + ایجاد موقعیت
        </Link>
      </div>
      <div className="bg-white shadow mx-auto rounded-2xl w-full p-[3%] text-center space-y-3">
        <div className="grid grid-cols-4">
          <div>ردیف</div>
          <div>نام موقعیت به فارسی</div>
          <div>نام موقعیت به انگلیسی</div>
          <div>عملیات</div>
        </div>

        {positions.map((item: any, index) => (
          <div
            className={`${
              positionIsDeleted && item.position.deleted_at
                ? "bg-red-300"
                : "bg-[#EAEFF6]"
            } grid grid-cols-4 gap-x-5 text-center py-1 rounded-[4px] cursor-pointer`}
            key={index}
          >
            <p>{index + 1}</p>
            <input
              value={
                editField.showEditField
                  ? editField.title_en
                  : item.position.title_en
              }
              onChange={(e) =>
                setEditField((last) => ({
                  ...last,
                  title_en: e.target.value,
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
                  ? editField.title_fa
                  : item.position.title_fa
              }
              onChange={(e) =>
                setEditField((last) => ({
                  ...last,
                  title_fa: e.target.value,
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
                href={`/panel/admin/view-users/role-management/position-detail?id=${item.position.id}`}
                className="flex justify-center"
              >
                <Image src={vieweye} alt="مشاهده" width={20} height={20} />
              </Link>
              <span
                onClick={() =>
                  deletePosition(item.role.id, token, setPositionIsDeleted)
                }
                className="flex justify-center"
              >
                <RxCross1 className="text-red-600 text-lg" />
              </span>
              <span
                onClick={() =>
                  restorePosition(item.position.id, token, setPositionIsDeleted)
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
                    onClick={() => handlePositionEdit(item.role.id)}
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
    </div>
  );
}

export default PositionManagement;
