import React from "react";
import InfoFields from "../../components/info-fields";

const Morakhasi = () => {
  return (
    <div className="p-[3%] w-full">
      <p className="font-semibold text-lg pb-[3%]">فرم مرخصی</p>
      <form className="grid grid-cols-1 gap-4">
        <InfoFields info="" type="text" title="تاریخ درخواست " color={true} />
        <InfoFields info="" type="text" title="سمت " color={true} />
        <InfoFields info="" type="text" title="نام " color={true} />
        <InfoFields info="" type="text" title="نام خانوادگی " color={true} />
        <InfoFields info="" type="text" title="مدت مرخصی " color={true} />
        <InfoFields
          info=""
          type="text"
          title="تاریخ شروع "
          color={true}
        />
        <InfoFields
          info=""
          type="text"
          title="تاریخ پایان "
          color={true}
        />
        <InfoFields info="" type="text" title="نوع مرخصی " color={true} />
        <InfoFields info="" type="text" title="علت درخواست " color={true} />

        <div className="flex flex-row justify-around pt-4">
          <p>امضا متقاضی</p>
          <p>تایید مدیر</p>
        </div>
      </form>
    </div>
  );
};

export default Morakhasi;
