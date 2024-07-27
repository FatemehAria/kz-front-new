import Image from "next/image";
import React from "react";
import vieweye from "../../../../public/ViewUsers/vieweye.svg";

import NotFound from "../components/NotFound";
import GenuineUserHeader from "../components/LegalUserHeader";

type SearchGenuineProps = {
  GenuineUsers: any[];
  value: string;
  children: React.ReactNode;
};
function SearchGenuine({ GenuineUsers, value, children }: SearchGenuineProps) {
  return (
    <div>
      {children}
      <div className="flex flex-col gap-8">
        <GenuineUserHeader />
        {GenuineUsers.length > 0 ? (
          GenuineUsers.filter((item) => item.PhoneNumber.includes(value)).map(
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
          )
        ) : (
          <NotFound text="کاربری یافت نشد." />
        )}
      </div>
    </div>
  );
}

export default SearchGenuine;
