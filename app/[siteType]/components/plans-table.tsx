import React from "react";
import base from "../../../public/Plans/base-logo.svg";
import advanced from "../../../public/Plans/advanced-logo.svg";
import special from "../../../public/Plans/special-logo.svg";
import elite from "../../../public/Plans/ellite-logo.svg";
import Image from "next/image";
import styles from "./plans-table.module.css";

type PlansTableProps = {
  TableData: object[];
};
function PlansTable({ TableData }: PlansTableProps) {
  return (
    <div className={`${styles["table-container"]}`}>
      <table className="text-center bg-white w-full">
        <thead>
          <tr>
            <th>
              <div className="text-center">
                <span className="text-[#4866CF]">مشاوره رایگان</span>
                <p className="text-black">
                  برای مشاوره رایگان با کارشناسان ما تماس بگیرید
                </p>
                <p className="text-[#4866CF] font-faNum">09961900684</p>
              </div>
            </th>
            <th>
              <div className="flex flex-col items-center text-[#E4624C]">
                <Image src={base} alt="پایه" />
                <span className="font-bold">پلن پایه</span>
                <span>شروع قیمت از</span>
                <span className="font-faNum">10 میلیون تومان</span>
              </div>
            </th>
            <th>
              <div className="flex flex-col items-center text-[#A8B1EC]">
                <Image src={advanced} alt="حرفه ای" />
                <span className="font-bold">پلن حرفه ای</span>
                <span>شروع قیمت از</span>
                <span className="font-faNum">15 میلیون تومان</span>
              </div>
            </th>
            <th>
              <div className="flex flex-col items-center text-[#FBAC5B]">
                <Image src={special} alt="پایه" />
                <span className="font-bold">پلن ویژه</span>
                <span>شروع قیمت از</span>
                <span className="font-faNum">30 میلیون تومان</span>
              </div>
            </th>
            <th>
              <div className="flex flex-col items-center text-[#FFDF40]">
                <Image src={elite} alt="الیت" />
                <span className="font-bold">پلن الیت</span>
                <span>شروع قیمت از</span>
                <span className="font-faNum">50 میلیون تومان</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="font-semibold">
          {TableData.map((item, index) => (
            <tr key={index}>
              {Object.entries(item).map(([key, value]) => (
                <React.Fragment key={key}>
                  <td>{key}</td>
                  {value.map((item: string, index: number) => (
                    <td key={index} className="font-faNum">
                      {typeof item !== "string" ? (
                        <div className="flex justify-center">
                          <Image src={item} alt="" />
                        </div>
                      ) : (
                        item
                      )}
                    </td>
                  ))}
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlansTable;
