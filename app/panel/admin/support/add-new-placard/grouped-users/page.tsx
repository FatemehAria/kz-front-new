import Link from "next/link";
import React from "react";
import { IoArrowBack } from "react-icons/io5";
type GroupedUsersProps = {
  AllUsers: any;
};
function GroupedUsers({ AllUsers }: GroupedUsersProps) {
  return (
    <div className="flex flex-col gap-5 relative">
      <Link
        className="flex justify-end text-xl cursor-pointer absolute -top-20 -left-10"
        href="/panel/admin/support"
      >
        <div className="bg-white rounded-full p-2">
          <IoArrowBack />
        </div>
      </Link>
      <div className="grid grid-cols-5 text-center">
        <p>ردیف</p>
        <p>شماره موبایل</p>
        <p>نام و نام خانوادگی</p>
        <p>ایمیل</p>
        <p>انتخاب</p>
      </div>
      {AllUsers.map((item: any, index: number) => (
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
          <div className="flex gap-3 items-center justify-center">
            <input
              type="checkbox"
              className="appearance-none border-2 border-black rounded-sm w-4 h-4 checked:bg-[#4866CF]"
              name="radio-button"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default GroupedUsers;
