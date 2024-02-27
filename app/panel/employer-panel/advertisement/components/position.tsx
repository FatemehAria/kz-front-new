import AdCheckbox from "@/components/panel/ad-checkbox";

const Position = () => {
  return (
    <div className="font-YekanBakh font-bold" dir="rtl">
      <p className="pb-6">لطفاً رده سازمانی مورد نیازتان را انتخاب نمایید </p>
      <div className="flex items-center gap-5">
        <AdCheckbox label="مدیر ارشد" />
        <AdCheckbox label="مدیر" />
        <AdCheckbox label="کارشناسی ارشد" />
        <AdCheckbox label="کارمند" />
        <AdCheckbox label="بدون سابقه" />
        <AdCheckbox label="کارآموز" />
      </div>
    </div>
  );
};
export default Position;
