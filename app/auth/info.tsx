import Image from "next/image";
import InfoForm from "./components/info-form";
import { Dispatch, SetStateAction } from "react";
import Logo from "./components/logo";
import FormSlider from "./components/form-slider";
type LoginProps = {
  setSteps: Dispatch<SetStateAction<number>>;
};
const Info = ({ setSteps }: LoginProps) => {
  return (
    <div>
      {/*  lg:grid lg:grid-cols-2  */}
      <div
        className="mx-auto grid grid-cols-1 font-YekanBakh rounded-3xl overflow-hidden my-[3%] shadow-2xl shadow-[13px_0_61px_-24px_rgba(0, 0, 0, 0.15)]"
        dir="rtl"
      >
        <div className="py-[5%] w-full relative px-[5%]">
          <Logo />
          <InfoForm setSteps={setSteps} />
        </div>

        {/* <div className="lg:block hidden bg-[#4866CF]"> */}
        {/* <FormSlider /> */}
        {/* </div>ّ */}
      </div>
    </div>
  );
};
export default Info;
