import React from "react";

const AdApproval = () => {
  return (
    <div className="w-full px-[5%]">
      <p className="pb-4">اطلاعات مسئول شرکت فلان</p>
      <div className="bg-profileBorderbg">
        <div className="flex items-center justify-between px-[5%]">
          <button>
            تایید<span className="bg-white">✔️</span>
          </button>
          <button>
            عدم تایید<span className="bg-white">❌</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdApproval;
