import React from "react";
import LocationIcon from "../../public/footer/location.svg";
import PhoneIcon from "../../public/footer/phone.svg";
import MailIcon from "../../public/footer/mail.svg";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/authorization/components/logo";
import SocialMedia from "./SocialMedia";
import Copyright from "./Copyright";
import SenfiLogo from "../../public/footer/senfi.svg";
import EnamaadLogo from "../../public/footer/enamaad.svg";

function footer() {
  // bg:#ECF3F9,#FCFBFC,#EAEFF6,#4866CF
  return (
    <div className="text-[#000000] bg-slate-100 pt-7">
      <div
        className="grid lg:grid-cols-4 md:max-lg:grid-cols-2 grid-cols-1 w-[80%] gap-5 mx-auto"
        dir="rtl"
      >
        <div className="hidden md:flex">
          <Logo />
        </div>
        <Contact />
        <QuickNavigation />
        <AuthLogos />
      </div>
      <Copyright />
    </div>
  );
}

export default footer;

const Contact = () => {
  return (
    <div className="flex flex-col justify-stretch gap-3">
      <p className="text-[20px] text-[#4866CF] font-semibold">تماس با ما</p>
      <div className="flex flex-row items-center gap-1">
        <Image src={LocationIcon} alt="location" width={16} />
        <p className="font-faNum text-[16px]">
          تهران،خیابان قائم مقام فراهانی،کوچه ماگنولیا، پلاک 30 ،واحد 12
        </p>
      </div>

      <div className="flex flex-row items-center gap-1">
        <Image src={PhoneIcon} alt="phone" width={16} />
        <p className="font-faNum text-[16px]">021-88329768</p>
      </div>

      <div className="flex flex-row items-center gap-1">
        <Image src={MailIcon} alt="mail" width={16} />
        <p className="text-[16px]">info@gmail.com</p>
      </div>
    </div>
  );
};

const QuickNavigation = () => {
  return (
    <div className="flex flex-col justify-stretch gap-3">
      <p className="text-[20px] text-[#4866CF] font-semibold">دسترسی سریع</p>
      <p className="text-[16px]">سفارش سایت</p>
      <p className="text-[16px]">دریافت پشتیبانی</p>
      <p className="text-[16px]">دریافت مشاوره</p>
    </div>
  );
};

const AuthLogos = () => {
  return (
    <div className="flex flex-col gap-3">
      <SocialMedia />
      <div className="flex justify-around items-center">
        <Link
          referrerPolicy="origin"
          target="_blank"
          href="https://trustseal.enamad.ir/?id=422622&Code=KGdskS8BDuEuvxkxW9GT5eCCOJ3TO3sa"
        >
          <Image src={SenfiLogo} alt="senfi-logo" className="w-[5em]" />
        </Link>
        <Link
          href="https://trustseal.enamad.ir/?id=446767&code=Y6oDWjmfcaGlRuWAK8t9YKGUq2VNkzYJ"
          target="_blank"
        >
          <Image src={EnamaadLogo} alt="enamaad-logo" className="w-[5em]" />
        </Link>
      </div>
    </div>
  );
};
