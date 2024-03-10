import Image from "next/image";
import React from "react";
import vieweye from "../../../../public/ViewUsers/vieweye.svg";
import Link from "next/link";
type LegalUsersProps = {
  LegalUsersData: any[];
};
function LegalUsers({ LegalUsersData }: LegalUsersProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-5 text-center">
        <p>ردیف</p>
        <p>شماره موبایل</p>
        <p>نام و نام خانوادگی</p>
        <p>ایمیل</p>
        <p>مشاهده</p>
      </div>
      {LegalUsersData.map((item, index) => (
        <div
          key={item.id}
          className="grid grid-cols-5 text-center py-1 bg-[#EAEFF6] rounded-[4px] cursor-pointer"
        >
          <p>{index + 1}</p>
          <p>{item.PhoneNumber}</p>
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
      ))}
    </div>
  );
}

export default LegalUsers;
