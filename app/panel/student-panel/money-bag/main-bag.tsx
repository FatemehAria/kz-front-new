import Image from "next/image";
import React from "react";
type MainBagProps = {
  setSteps: React.Dispatch<React.SetStateAction<number>>;
};
const MainBag = ({ setSteps }: MainBagProps) => {
  return (
    <div className="rounded-xl grid grid-cols-1 justify-center lg:bg-profileBorderbg p-[2%]">
      <div className="rounded-lg grid grid-cols-3 gap-x-[2%] text-center">
        <div className="col-span-2">
          <p className="flex flex-row w-full rounded-lg justify-between p-[2%] bg-white font-semibold">
            <span>موجودی کیف پول</span>
            <span>مبلغ</span>
          </p>
          <div className="w-full my-2 bg-white rounded-lg p-[2%]">
            <table className="w-full">
              <thead className="border-b-[1px] border-black">
                <tr>
                  <th>مبلغ</th>
                  <th>تاریخ</th>
                  <th>شماره</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b-[1px] border-black">
                  <td>9،900،000</td>
                  <td>1399/10/11</td>
                  <td>#2546</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-1 bg-white rounded-lg p-[2%] flex flex-col gap-5">
          <div
            className="flex flex-row items-center justify-between bg-profileBorderbg rounded-lg px-[3%] cursor-pointer"
            onClick={() => setSteps(1)}
          >
            <p className="font-semibold">افزایش موجودی</p>
            <Image
              src="/studentpanel/increase.svg"
              alt="increase"
              width={50}
              height={50}
            />
          </div>

          <div
            className="flex flex-row items-center justify-between bg-profileBorderbg rounded-lg px-[3%] cursor-pointer"
            onClick={() => setSteps(2)}
          >
            <p className="font-semibold">انتقال موجودی</p>
            <Image
              src="/studentpanel/transfer.svg"
              alt="transfer"
              width={50}
              height={50}
            />
          </div>

          <div className="flex flex-row items-center justify-between bg-profileBorderbg rounded-lg px-[3%]">
            <p className="font-semibold">برداشت موجودی</p>
            <Image
              src="/studentpanel/decrease.svg"
              alt="decrease"
              width={50}
              height={50}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBag;
