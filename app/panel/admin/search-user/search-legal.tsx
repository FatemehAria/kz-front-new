import Image from "next/image";
import React from "react";
import vieweye from "../../../../public/ViewUsers/vieweye.svg";
import search from "../../../../public/ViewUsers/search.svg";
type SearchLegalProps = {
  LegalUsers: any[];
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};
function SearchLegal({ LegalUsers, value, onChange }: SearchLegalProps) {
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
        <div className="grid grid-cols-5 text-center">
          <p>ردیف</p>
          <p>شماره موبایل</p>
          <p>نام و نام خانوادگی</p>
          <p>ایمیل</p>
          <p>مشاهده</p>
        </div>
        {LegalUsers.filter((item) => item.PhoneNumber.includes(value)).map(
          (item, index) => (
            <div
              key={item._id}
              className="grid grid-cols-5 text-center py-1 bg-[#EAEFF6] rounded-[4px] cursor-pointer"
              //   onClick={() => setStep(2)}
            >
              <p className="font-faNum">{index + 1}</p>
              <p className="font-faNum">{item.PhoneNumber}</p>
              <p>
                {item.FirstName} {item.LastName}
              </p>
              <p>{item.email}</p>
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

export default SearchLegal;
