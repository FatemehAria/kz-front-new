import Image from "next/image";
import React from "react";

const Personel = () => {
  return (
    <div className="w-full px-[3%]">
      <div className="flex justify-between items-center my-[2%]">
        <p className="font-semibold text-lg">پرسنل شرکت</p>
        <button className="bg-[#9DACDF] px-[2%] py-1 rounded-lg text-white whitespace-nowrap">
          +افزودن پرسنل
        </button>
      </div>
      <div className="px-[3%] py-[2%] bg-[#4866CF1A] rounded-lg w-full text-center">
        <table className="w-full my-2">
          <thead className="border-b-[1px] border-black">
            <tr>
              <th>شماره وظیفه</th>
              <th>عنوان وظیفه</th>
              <th>مهلت انجام</th>
              <th>توضیحات</th>
              <th>پیش نیازها</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b-[1px] border-black">
              <td className="flex justify-center items-center pt-1">1001</td>
              <td>ul</td>
              <td>1402/01/02</td>
              <td>
                <div className="flex justify-center items-center gap-2">
                  <span>مشاهده</span>
                  <span>
                    <Image
                      src="/mainadminpanel/eye.svg"
                      alt="eye"
                      width={15}
                      height={15}
                    />
                  </span>
                </div>
              </td>
              <td>
                <div className="flex justify-center items-center gap-2">
                  <span>مشاهده</span>
                  <span>
                    <Image
                      src="/mainadminpanel/eye.svg"
                      alt="eye"
                      width={15}
                      height={15}
                    />
                  </span>
                </div>
              </td>
            </tr>
            <tr className="border-b-[1px] border-black">
              <td className="flex justify-center items-center pt-1">1001</td>
              <td>ul</td>
              <td>1402/01/02</td>
              <td>
                <div className="flex justify-center items-center gap-2">
                  <span>مشاهده</span>
                  <span>
                    <Image
                      src="/mainadminpanel/eye.svg"
                      alt="eye"
                      width={15}
                      height={15}
                    />
                  </span>
                </div>
              </td>
              <td>
                <div className="flex justify-center items-center gap-2">
                  <span>مشاهده</span>
                  <span>
                    <Image
                      src="/mainadminpanel/eye.svg"
                      alt="eye"
                      width={15}
                      height={15}
                    />
                  </span>
                </div>
              </td>
            </tr>
            <tr className="">
              <td className="flex justify-center items-center pt-1">1001</td>
              <td>ul</td>
              <td>1402/01/02</td>
              <td>
                <div className="flex justify-center items-center gap-2">
                  <span>مشاهده</span>
                  <span>
                    <Image
                      src="/mainadminpanel/eye.svg"
                      alt="eye"
                      width={15}
                      height={15}
                    />
                  </span>
                </div>
              </td>
              <td>
                <div className="flex justify-center items-center gap-2">
                  <span>مشاهده</span>
                  <span>
                    <Image
                      src="/mainadminpanel/eye.svg"
                      alt="eye"
                      width={15}
                      height={15}
                    />
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Personel;
