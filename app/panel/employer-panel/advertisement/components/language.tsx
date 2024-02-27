import AdCheckbox from "@/components/panel/ad-checkbox";
import React from "react";

const Language = () => {
  return (
    <div className="font-semibold">
      <p className="pb-6">
        لطفاً زبان که قصد دارید آگهی را منتشر نمایید انتخاب نمایید{" "}
      </p>
      <div className="flex items-center gap-5">
        <AdCheckbox label="فارسی" />
        <AdCheckbox label="English" />
        <AdCheckbox label="همه" />
      </div>
    </div>
  );
};

export default Language;
