import SingleadCard from "@/components/panel/singlead-card";
import SingleadDropdown from "@/components/panel/singlead-dropdown";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { RxCross2 } from "react-icons/rx";
type SingleAdProps = {
  setSteps: Dispatch<SetStateAction<number>>;
};
const SingleAd = ({ setSteps }: SingleAdProps) => {
  // request and get the name
  return (
    <div className="font-YekanBakh px-[3%] flex flex-col gap-10">
      {/* <div className="flex items-center gap-4 px-2 font-bold"> */}
      {/* <p className="flex items-center gap-3">
          <Image
            src="/employerpanel/adtitleicon.svg"
            alt="icon"
            width={30}
            height={30}
          />
          <span>کارآموز حسابداری(هلو)</span>
        </p> */}
      {/* <div className="flex bg-[#F0F0F0] w-[300px] rounded-md p-1 gap-2 text-base">
          <Image
            src="/employerpanel/searchicon.svg"
            alt="search"
            width={20}
            height={20}
          />
          <input
            type="text"
            placeholder="جستجو نام..."
            className="bg-[#F0F0F0] outline-none w-full rounded-md"
          />
        </div> */}
      {/* </div> */}

      {/* <div className="grid grid-cols-6 w-[95%] mx-auto gap-4 my-4"> */}
      {/* <div className="col-span-1 border border-black rounded-lg pb-1 h-full">
          <div className="flex justify-between p-3 mx-auto font-bold border border-b-black">
            <p>فیلترها</p>
            <span className="text-red-500">
              <RxCross2 />
            </span>
          </div>
          <SingleadDropdown />
        </div> */}

      {/* <div className="col-span-5"> */}
      <SingleadCard name="حمیدرضا بخشی" setSteps={setSteps} />
      <SingleadCard name="حمیدرضا بخشی" setSteps={setSteps} />
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};
export default SingleAd;
