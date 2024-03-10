import Image from "next/image";
import React from "react";
import vieweye from "../../../../public/ViewUsers/vieweye.svg";
import search from "../../../../public/ViewUsers/search.svg";

type SearchGenuineProps = {
  GenuineUsers: any[];
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};
function SearchGenuine({ GenuineUsers, value, onChange }: SearchGenuineProps) {
  return (
    <div>
      <div className="relative mb-3">
        <input
          type="text"
          placeholder="جستجو بر اساس شماره موبایل"
          className="w-full outline-none border border-[#4866CF] rounded-[8px] p-2"
          value={value}
          onChange={onChange}
        />
        <Image
          src={search}
          alt="search"
          className="absolute left-2 top-1/2 -translate-y-1/2"
        />
      </div>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-6 text-center">
          <p>ردیف</p>
          <p>نام سازمان</p>
          <p>شماره ملی</p>
          <p>شماره موبایل </p>
          <p>شماره ثبت</p>
          <p>مشاهده</p>
        </div>
        {GenuineUsers.filter((item) => item.PhoneNumber.includes(value)).map(
          (item, index) => (
            <div
              key={item._id}
              className="grid grid-cols-6 text-center py-1 bg-[#EAEFF6] rounded-[4px] cursor-pointer"
              // onClick={() => setStep(2)}
            >
              <p>{index + 1}</p>
              <p>{item.name_of_Organization}</p>
              <p>{item.National_ID}</p>
              <p>{item.PhoneNumber}</p>
              <p>{item.registration_Number}</p>
              <div className="flex justify-center">
                <Image src={vieweye} alt="مشاهده" width={20} height={20} />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default SearchGenuine;
