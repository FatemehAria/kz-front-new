import Image from "next/image";
import React from "react";
import vieweye from "../../../../public/ViewUsers/vieweye.svg";
import Link from "next/link";
type GenuineUsersProps = {
  GenuineUsersData: any[];
};
function GenuineUsers({ GenuineUsersData }: GenuineUsersProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-6 text-center">
        <p>ردیف</p>
        <p>نام سازمان</p>
        <p>شماره ملی</p>
        <p>شماره موبایل </p>
        <p>شماره ثبت</p>
        <p>مشاهده</p>
      </div>
      {GenuineUsersData.map((item,index) => (
        <div
          key={item._id}
          className="grid grid-cols-6 text-center py-1 bg-[#EAEFF6] rounded-[4px] cursor-pointer"
        >
          <p>{index + 1}</p>
          <p>{item.name_of_Organization}</p>
          <p>{item.National_ID}</p>
          <p>{item.PhoneNumber}</p>
          <p>{item.registration_Number}</p>
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

export default GenuineUsers;
