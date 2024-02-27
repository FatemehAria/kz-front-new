type CheckboxProps = {
  label: string;
};
const AdCheckbox = ({ label }: CheckboxProps) => {
  return (
    <div className="flex gap-3 items-center justify-center">
      <input
        type={`${
          label === "مدیر ارشد" ||
          label === "مدیر" ||
          label === "کارشناسی ارشد" ||
          label === "کارمند" ||
          label === "بدون سابقه" ||
          label === "کارآموز" ||
          label === "ناهار" ||
          label === "پذیرایی" ||
          label === "سرویس رفت و آمد" ||
          label === "بیمه" ||
          label === "محل اسکان"
            ? "checkbox"
            : "radio"
        }`}
        className="appearance-none border-2 border-black rounded-sm w-4 h-4 checked:bg-[#4866CF]"
        name="radio-button"
        id={label}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};
export default AdCheckbox;
