import { ImCross } from "react-icons/im";

const FinalApproval = () => {
  return (
    <div
      className="w-[95%] mx-auto rounded-lg bg-[#4866CF] font-YekanBakh h-full my-[3%]"
      style={{ boxShadow: "0px 4px 25px 4px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="bg-white w-[700px] h-full rounded-lg">
        <div className="w-[90%] mx-auto py-4">
          <div className="flex justify-between py-2">
            <p className="font-bold text-lg">تایید مصاحبه</p>
            <span className="text-red-600">
              <ImCross />
            </span>
          </div>
          <p className="font-bold my-4">
            کارفرمای محترم پیام زیر برای کارجو ارسال گردید.
          </p>
          <p className="font-bold my-4">
            جناب آقای/سرکار خانم ------ لطفا در روز------ مورخه----- ساعت----
            جهت مصاحبه به شرکت ----- به آدرس-----مراجعه فرمایید.
          </p>
          <p className="font-bold my-4 font-faNum">کد پیگیری:615618941</p>
          <p className="font-bold my-4">نکات مورد توجه:</p>
        </div>
      </div>
    </div>
  );
};
export default FinalApproval;
