import Image from "next/image";
import React from "react";
import vieweye from "../../../../public/ViewUsers/vieweye.svg";
import Link from "next/link";
import NotFound from "../components/NotFound";
import GenuineUserHeader from "../components/GenuineUserHeader";

type GenuineUsersProps = {
  GenuineUsersData: any[];
};

function GenuineUsers({ GenuineUsersData }: GenuineUsersProps) {
  return (
    <div className="flex flex-col gap-5">
      <GenuineUserHeader />
      {GenuineUsersData.length > 0 ? (
        GenuineUsersData.map((item, index) => (
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
        ))
      ) : (
        <NotFound text="کاربری یافت نشد." />
      )}
    </div>
  );
}

export default GenuineUsers;
