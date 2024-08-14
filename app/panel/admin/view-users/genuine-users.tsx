"use client";
import Image from "next/image";
import React from "react";
import vieweye from "../../../../public/ViewUsers/vieweye.svg";
import Link from "next/link";
import NotFound from "../components/NotFound";
import GenuineUserHeader from "../components/GenuineUserHeader";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { RxCross1 } from "react-icons/rx";
import { deleteUser } from "@/utils/utils";
import SearchInput from "../components/SearchInput";

type GenuineUsersProps = {
  GenuineUsersData: never[];
  usersStatus: {
    loading: boolean;
  };
  token: string;
  setAllUsers: React.Dispatch<any>;
  setDataStatus: React.Dispatch<
    React.SetStateAction<{
      loading: boolean;
    }>
  >;
  AllUsersData: [];
  searchUsers: string;
  setSearchUsers: React.Dispatch<React.SetStateAction<string>>;
};

function GenuineUsers({
  GenuineUsersData,
  usersStatus,
  token,
  setAllUsers,
  setDataStatus,
  AllUsersData,
  searchUsers,
  setSearchUsers,
}: GenuineUsersProps) {
  return (
    <div className="flex flex-col gap-5">
      <SearchInput
        value={searchUsers}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchUsers(e.target.value)
        }
        placeholder="جستجو بر اساس شماره موبایل"
      />
      <GenuineUserHeader />
      {usersStatus.loading ? (
        <SkeletonTheme>
          <Skeleton count={1} className="p-2" baseColor="#EAEFF6" />
        </SkeletonTheme>
      ) : GenuineUsersData?.length > 0 ? (
        GenuineUsersData.filter(
          (item: { id: number; mobile: string; name: string; email: string }) =>
            item.mobile.includes(searchUsers)
        ).map(
          (
            item: { id: number; mobile: string; name: string; email: string },
            index: number
          ) => (
            <div
              key={item.id}
              className="grid grid-cols-5 text-center py-1 bg-[#EAEFF6] rounded-[4px] cursor-pointer"
            >
              <p>{index + 1}</p>
              <p className="font-faNum">{item.mobile}</p>
              <p>{item.name}</p>
              <p>{item.email ? item.email : "-"}</p>
              <span
                onClick={() =>
                  deleteUser(item.id, token, setAllUsers, AllUsersData)
                }
                className="flex justify-center"
              >
                <RxCross1 />
                {/* <Image src={vieweye} alt="مشاهده" width={20} height={20} /> */}
              </span>
            </div>
          )
        )
      ) : (
        <NotFound text="کاربری یافت نشد." />
      )}
    </div>
  );
}

export default GenuineUsers;
