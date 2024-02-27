import AdCheckbox from "@/components/panel/ad-checkbox";
import AdRange from "@/components/panel/ad-rang";

const Benefits = () => {
  return (
    <div className="w-[90%] mx-auto font-YekanBakh flex flex-col gap-4 font-semibold">
      <p>بازه حقوقی :</p>
      <AdRange />

      <p>سایر مزایا:</p>
      <div className="flex  gap-4 items-center">
        <AdCheckbox label="ناهار" />
        <AdCheckbox label="پذیرایی" />
        <AdCheckbox label="سرویس رفت و آمد" />
        <AdCheckbox label="بیمه" />
        <AdCheckbox label="محل اسکان" />
      </div>
    </div>
  );
};
export default Benefits;
