"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import TableSelect from "../components/table-select";
type FinancialReportsProps = {
  confirmSingleCostByGeneral: any;
  deleteSingleCostByGeneral: any;
  costId: number;
  getCostsByGeneral: any;
  deleteSingleIncomeByGeneral: any;
  confirmSingleIncomeByGeneral: any;
  costsByGeneral: any;
  incomeByGeneral: any;
};
// بر اساس نوع گزارش یکی از دیلیت ها یا کانفیرم هارو میذاریم
const FinancialReports = ({
  confirmSingleCostByGeneral,
  deleteSingleCostByGeneral,
  costId,
  getCostsByGeneral,
  deleteSingleIncomeByGeneral,
  confirmSingleIncomeByGeneral,
  costsByGeneral,
  incomeByGeneral,
}: FinancialReportsProps) => {
  useEffect(() => {
    getCostsByGeneral();
  }, []);
  console.log(costsByGeneral, incomeByGeneral);
  return (
    <div className="px-[3%] py-[2%] bg-[#4866CF1A] rounded-lg w-full">
      <table className="w-full my-2">
        <thead className="border-b-[1px] border-black">
          <tr>
            <th>
              <TableSelect
                selectText="وضعیت"
                dropDownOptions={["تایید شده", "تایید نشده"]}
              />
            </th>
            <th>
              <TableSelect selectText="تاریخ" />
            </th>
            <th>
              <TableSelect selectText="مبلغ" />
            </th>
            <th>
              <TableSelect selectText="علت هزینه" />
            </th>
            <th>
              <TableSelect selectText="پرداخت شده از" />
            </th>
            <th>
              <TableSelect selectText="محل پرداخت" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b-[1px] border-black">
            <td className="flex justify-center items-center pt-1">
              <button onClick={() => deleteSingleCostByGeneral(costId)}>
                <span>❌</span>
              </button>
              <button onClick={() => confirmSingleCostByGeneral(costId)}>
                <span>✔️</span>
              </button>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="text-center flex justify-center items-center pt-1">
              <Image
                src="/mainadminpanel/downloadiconpng.png"
                width={20}
                height={20}
                alt="download"
              />
            </td>
          </tr>
          <tr className="border-b-[1px] border-black">
            <td className="flex justify-center items-center pt-1">
              <button onClick={() => deleteSingleCostByGeneral(costId)}>
                <span>❌</span>
              </button>
              <button onClick={() => confirmSingleCostByGeneral(costId)}>
                <span>✔️</span>
              </button>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="text-center flex justify-center items-center pt-1">
              <Image
                src="/mainadminpanel/downloadiconpng.png"
                width={20}
                height={20}
                alt="download"
              />
            </td>
          </tr>
          <tr className="">
            <td className="flex justify-center items-center pt-1">
              <button onClick={() => deleteSingleCostByGeneral(costId)}>
                <span>❌</span>
              </button>
              <button onClick={() => confirmSingleCostByGeneral(costId)}>
                <span>✔️</span>
              </button>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="text-center flex justify-center items-center pt-1">
              <Image
                src="/mainadminpanel/downloadiconpng.png"
                width={20}
                height={20}
                alt="download"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FinancialReports;
