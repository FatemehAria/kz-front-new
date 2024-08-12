import React from "react";
import FinanceInput from "../../finance/components/finance-input";
import { handleBudegtChange, sendAmount } from "@/utils/utils";

function FirstPayment({
  firstOrderPayment,
  token,
}: {
  firstOrderPayment: {
    final_price: number;
    debt: number;
    amount: number;
    id: number;
  };
  token: string;
}) {
    
  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendAmount(token, firstOrderPayment.amount, firstOrderPayment.id);
  };

  return (
    <form onSubmit={(e) => handleSubmission(e)} className="grid grid-cols-1 gap-5">
      <div>
        <p className="font-semibold my-4 border-b-2 border-[#4866CE] text-[18px] max-w-[15rem]">
          اطلاعات قسط اول:
        </p>
        <div className="grid grid-cols-1 gap-5">
          <div className="grid grid-cols-2 gap-5">
            <FinanceInput
              label="مبلغ کل پروژه:"
              disable={true}
              value={`${handleBudegtChange(
                String(firstOrderPayment?.final_price)
              )} ریال`}
            />
            <FinanceInput
              label="مبلغ باقی مانده:"
              disable={true}
              value={`${handleBudegtChange(
                String(firstOrderPayment?.debt)
              )} ریال`}
            />
            <FinanceInput
              label="مبلغ پرداخت شده:"
              disable={true}
              value={`0 ریال`}
            />
            <FinanceInput
              label="مبلغ پرداختی شما:"
              value={`${handleBudegtChange(
                String(firstOrderPayment?.amount)
              )} ریال`}
              setToBlue={true}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <button className="bg-[#4866CE] text-white p-2 rounded-[4px]">
          پرداخت قسط اول
        </button>
      </div>
    </form>
  );
}

export default FirstPayment;
