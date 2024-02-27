import Image from "next/image";
import React from "react";
type MentorTableProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};
const MentorTable = ({ setStep }: MentorTableProps) => {
  return (
    <div>
      <div className="w-full px-[3%] py-[2%]">
        <table className="w-full text-center">
          <thead className="border-b border-black">
            <tr>
              <th>ردیف</th>
              <th>تاریخ</th>
              <th>موضوع</th>
              <th>شماره</th>
              <th>آخرین وضعیت</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>1402/01/02</td>
              <td>ul</td>
              <td>123456</td>
              <td
                onClick={() => setStep(3)}
                className="flex justify-center cursor-pointer"
              >
                {/* <Image
                  src="/mainadminpanel/eye.svg"
                  alt="eye"
                  width={20}
                  height={20}
                /> */}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MentorTable;
