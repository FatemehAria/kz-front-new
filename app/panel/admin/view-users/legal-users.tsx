import Image from "next/image";
import React from "react";
import vieweye from "../../../../public/ViewUsers/vieweye.svg";
import Link from "next/link";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
type LegalUsersProps = {
  LegalUsersData: any[];
  legalUsersStatus: {
    error: string;
    loading: boolean;
  };
};
function LegalUsers({ LegalUsersData, legalUsersStatus }: LegalUsersProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-5 text-center">
        <p>ردیف</p>
        <p>شماره موبایل</p>
        <p>نام و نام خانوادگی</p>
        <p>ایمیل</p>
        <p>مشاهده</p>
      </div>
      {legalUsersStatus.loading ? (
        <SkeletonTheme>
          <Skeleton count={1} className="p-2" baseColor="#EAEFF6" />
        </SkeletonTheme>
      ) : LegalUsersData.length > 0 ? (
        LegalUsersData.map((item, index) => (
          <div
            key={item._id}
            className="grid grid-cols-5 text-center py-1 bg-[#EAEFF6] rounded-[4px] cursor-pointer"
          >
            <p className="font-faNum">{index + 1}</p>
            <p className="font-faNum">{item.PhoneNumber}</p>
            <p>
              {item.FirstName} {item.LastName}
            </p>
            <p>{item.email}</p>
            <Link
              href={`/panel/admin/view-users/user-detail?id=${item._id}`}
              className="flex justify-center"
            >
              <Image src={vieweye} alt="مشاهده" width={20} height={20} />
            </Link>
          </div>
        ))
      ) : (
        <p className="text-center font-bold text-red-700">
          کاربری یافت نشد.
        </p>
      )}
    </div>
  );
}

export default LegalUsers;
