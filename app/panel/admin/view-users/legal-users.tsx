"use client";
import Image from "next/image";
import React from "react";
import vieweye from "../../../../public/ViewUsers/vieweye.svg";
import Link from "next/link";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import NotFound from "../components/NotFound";
import LegalUserHeader from "../components/LegalUserHeader";
import { deleteUser } from "@/utils/utils";
import { RxCross1 } from "react-icons/rx";
import SearchInput from "../components/SearchInput";

type LegalUsersProps = {
  LegalUsersData: any[];
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

function LegalUsers({
  LegalUsersData,
  usersStatus,
  token,
  setAllUsers,
  setDataStatus,
  AllUsersData,
  searchUsers,
  setSearchUsers,
}: LegalUsersProps) {
  console.log(LegalUsersData);
  return (
    <div className="flex flex-col gap-5">
      <SearchInput
        value={searchUsers}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchUsers(e.target.value)
        }
        placeholder="جستجو بر اساس شماره موبایل"
      />
      <LegalUserHeader />
      {usersStatus.loading ? (
        <SkeletonTheme>
          <Skeleton count={1} className="p-2" baseColor="#EAEFF6" />
        </SkeletonTheme>
      ) : LegalUsersData?.length > 0 ? (
        LegalUsersData?.filter((item) => item.mobile.includes(searchUsers)).map(
          (item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-6 text-center py-1 bg-[#EAEFF6] rounded-[4px] cursor-pointer"
            >
              <p className="font-faNum">{index + 1}</p>
              <p>{item.org_name ? item.org_name : "-"}</p>
              <p>{item.ncode}</p>
              <p>{item.mobile}</p>
              <p>
                {item.org_registration_Number
                  ? item.org_registration_Number
                  : "-"}
              </p>
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

export default LegalUsers;
