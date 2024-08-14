"use client";
import {
  deletePosition,
  getAllPositions,
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
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import NotFound from "../../components/NotFound";
import NewInfoOnEachPageBtn from "@/app/panel/user/components/NewInfoOnEachPageBtn";

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
  const [positions, setPositions] = useState<PositionType[]>([]);
  const [positionsStatus, setPositionsStatus] = useState({
    loading: false,
    error: "",
  });
  // const { positions, setPositions } = useContext(PositionContext);
  const { token } = useSelector((state: any) => state.userData);
  const [positionIsDeleted, setPositionIsDeleted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localPositions = JSON.parse(
        window.sessionStorage.getItem("positions") as string
      );
      setPositions(localPositions);
    }
  }, []);

  useEffect(() => {
    getAllPositions(token, setPositions, setPositionsStatus);
  }, []);
  const [editField, setEditField] = useState({
    showEditField: false,
    title_en: "",
    title_fa: "",
    dept_id: "",
    user_id: "",
  });

  return (
    <div className="grid grid-cols-1 gap-5">
      <div className="flex">
        <NewInfoOnEachPageBtn
          btnText="ایجاد موقعیت"
          src="/panel/admin/view-users/position-management/create-position"
        />
      </div>
      <div className="bg-white shadow mx-auto rounded-2xl w-full p-[3%] text-center space-y-3">
        <div className="grid grid-cols-4">
          <div>ردیف</div>
          <div>نام موقعیت به فارسی</div>
          <div>نام موقعیت به انگلیسی</div>
          <div>عملیات</div>
        </div>

        {positionsStatus.loading ? (
          <SkeletonTheme>
            <Skeleton count={1} className="p-2" baseColor="#EAEFF6" />
          </SkeletonTheme>
        ) : positionsStatus.error ? (
          <NotFound text={`${positionsStatus.error}`} />
        ) : (
          positions.map((item: any, index) => (
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
                    deletePosition(
                      item.position.id,
                      token,
                      setPositionIsDeleted
                    )
                  }
                  className="flex justify-center"
                >
                  <RxCross1 className="text-red-600 text-lg" />
                </span>
                <span
                  onClick={() =>
                    restorePosition(
                      item.position.id,
                      token,
                      setPositionIsDeleted
                    )
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

export default PositionManagement;
