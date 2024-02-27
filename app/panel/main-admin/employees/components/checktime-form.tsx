import React from "react";
type ChecktimeFormProps = {
  title: string;
  field: string;
  currentDate: string;
  fullName: string;
  setCheckTime: React.Dispatch<
    React.SetStateAction<{
      time_log: string;
      time_exit: string;
    }>
  >;
  checkTime: {
    time_log: string;
    time_exit: string;
  };
  handleLogSubmission?: any;
  handleExitSubmission?: any;
};
const ChecktimeForm = ({
  title,
  field,
  currentDate,
  fullName,
  setCheckTime,
  checkTime,
  handleLogSubmission,
  handleExitSubmission,
}: ChecktimeFormProps) => {
  return (
    <div className="grid grid-cols-1 gap-y-3">
      <p className="flex justify-center">{title}</p>
      <form
        className="bg-profileBorderbg p-[5%] grid grid-cols-1 gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          checkTime.time_log
            ? () => handleLogSubmission(checkTime.time_log)
            : checkTime.time_exit
            ? () => handleExitSubmission(checkTime.time_exit)
            : "";
        }}
      >
        <div className="flex flex-row justify-between gap-[5%]">
          <div className="flex flex-row items-center w-[50%]">
            <label className="whitespace-nowrap w-full">نام خانوادگی</label>
            <input type="text" className="w-full" value={fullName} />
          </div>
          <div className="flex flex-row items-center justify-center gap-5 w-[40%]">
            <label className="whitespace-nowrap">تاریخ</label>
            <input type="text" className="w-full" value={currentDate} />
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center w-[50%]">
            <label className="whitespace-nowrap w-full">ساعت {field}</label>
            <input
              type="text"
              className="w-full"
              onChange={(e) => {
                field === "ورود" &&
                  setCheckTime((last) => ({
                    ...last,
                    time_log: e.target.value,
                  }));
                field === "خروج" &&
                  setCheckTime((last) => ({
                    ...last,
                    time_exit: e.target.value,
                  }));
              }}
              value={
                field === "ورود" ? checkTime.time_log : checkTime.time_exit
              }
            />
          </div>
          <button className="bg-white text-black px-[5%]">تایید</button>
        </div>
      </form>
    </div>
  );
};

export default ChecktimeForm;
