import Image from "next/image";
import React from "react";
import vieweye from "../../../../public/ViewUsers/vieweye.svg";
import NotFound from "../components/NotFound";
import LegalUserHeader from "../components/GenuineUserHeader";

type SearchLegalProps = {
  LegalUsers: any[];
  value: string;
  children: React.ReactNode;
};
function SearchLegal({ LegalUsers, value, children }: SearchLegalProps) {
  return (
    <div>
      {children}
      <div className="flex flex-col gap-8">
        <LegalUserHeader />
        {LegalUsers.length > 0 ? (
          LegalUsers.filter((item) => item.PhoneNumber.includes(value)).map(
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
          )
        ) : (
          <NotFound text="کاربری یافت نشد." />
        )}
      </div>
    </div>
  );
}

export default SearchLegal;
