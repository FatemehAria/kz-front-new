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
    <div className="lg:w-[80%] w-[90%] mx-auto my-[3%]">
      <div
        className="mx-auto grid lg:grid-cols-2 grid-cols-1 font-YekanBakh rounded-3xl overflow-hidden shadow-2xl shadow-[13px_0_61px_-24px_rgba(0, 0, 0, 0.15)]"
        dir="rtl"
      >
        <div className="lg:py-0">
          <div className="p-[5%]">
            <Logo />
          </div>
          <div className="px-[5%] grid grid-cols-1 gap-[3%]">
            <p className="">
              شماره شما تا کنون در سامانه ثبت نشده است لطفا اطلاعات را کامل و
              تایید کنید.
            </p>

            <InfoForm setSteps={setSteps} />
          </div>
        </div>

        <div className="lg:block hidden">
          <FormSlider />
        </div>
      </div>
    </div>
  );
};
export default Info;
