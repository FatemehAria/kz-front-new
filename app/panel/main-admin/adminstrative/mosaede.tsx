import React, { useEffect } from "react";
import InfoFields from "../../components/info-fields";
import axios from "axios";
import { useSelector } from "react-redux";

const Mosaede = () => {
  return (
    <div className="p-[3%] w-full">
      <p className="font-semibold text-lg pb-[3%]">فرم مساعده</p>
      <form className="grid grid-cols-1 gap-y-4">
        <InfoFields info="" type="text" title="تاریخ درخواست" color={true} />
        <InfoFields info="" type="text" title="سمت" color={true} />
        <InfoFields info="" type="text" title="نام" color={true} />
        <InfoFields info="" type="text" title="نام خانوادگی" color={true} />
        <InfoFields info="" type="text" title="محل خدمت" color={true} />
        <InfoFields
          info=""
          type="text"
          title="مبلغ مساعده به عدد"
          color={true}
        />
        <InfoFields
          info=""
          type="text"
          title="مبلغ مساعده به حروف"
          color={true}
        />
        <InfoFields info="" type="text" title="علت درخواست" color={true} />

        <div className="flex flex-row justify-around pt-4">
          <p>امضا متقاضی</p>
          <p>تایید مدیر</p>
        </div>
      </form>
    </div>
  );
};

export default Mosaede;
