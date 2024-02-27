import { CiSearch } from "react-icons/ci";
type AdDropdownProps = {
  title: string;
  defaultOption: string;
  //   MUST BE CHANGED TO ARRAY OF STRINGS
  options: string;
};
const AdDropdown = ({ title, defaultOption, options }: AdDropdownProps) => {
  return (
    <div className="flex flex-col font-YekanBakh gap-4">
      <label className="font-semibold">{title}</label>
      <div className="flex gap-2">
        <select required className="w-[350px] h-10 bg-[#F0F0F0] font-semibold">
          <option value="" hidden>
            {defaultOption}
          </option>
          <option value="">{options}</option>
        </select>
        <div>
          {title === "ابزارها و مهارت ها :" && (
            <button className="h-10 px-2 border bg-[#F0F0F0] flex justify-center items-center text-center">
              +افزودن
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default AdDropdown;
