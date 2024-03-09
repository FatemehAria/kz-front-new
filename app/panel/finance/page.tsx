import React from "react";
import FinanceInput from "./components/finance-input";

function Finance() {
  return (
    <form className="py-[3%] w-[90%] shadow mx-auto bg-white rounded-2xl px-[3%] flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-5">
        <FinanceInput label="مبلغ پروژه:" />
        <FinanceInput label="نوع باقی مانده:" />
        <FinanceInput label="مبلغ پرداخت شده:" />
        <FinanceInput label="مبلغ پرداختی شما:" />
      </div>
      <div className="w-full flex justify-center">
        <button className="bg-[#4866CE] text-white p-2 rounded-[4px]">
          تایید پرداخت
        </button>
      </div>
    </form>
  );
}

export default Finance;
