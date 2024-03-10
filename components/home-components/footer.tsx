"use client";
import { loadScript } from "@/redux/features/user/userSlice";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FooterRabon from "./footer-rabon";
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i;

const Footer = () => {
  const [hoverOne, setHoverOne] = useState(false);
  const [hoverTwo, setHoverTwo] = useState(false);
  const [hoverThree, setHoverThree] = useState(false);
  const [hoverFour, setHoverFour] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState("");
  const dispatch = useDispatch();

  const handleEmailSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://keykavoos.liara.run/User/signNewsClub",
        {
          email,
        }
      );
      setEmailSuccess("شما با موفقیت عضو شدید.");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const validMail = emailRegex.test(email);
    setValidEmail(validMail);
  }, [email]);

  return (
    <React.Fragment>
      <div className="w-full h-8 bg-blue-50"></div>
      <div className="w-full h-10 bg-blue-200 bg-opacity-70"></div>
      <div
        dir="rtl"
        className="flex flex-col bg-[#4866CF] font-YekanBakh gap-3 lg:px-[4%] px-8 pt-[2%] 3xl:px-[8%]"
      >
        <FooterRabon />

        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-2 lg:gap-0 lg:mx-0 text-[#DEEBFF]">
          <div className="flex flex-col gap-2 items-stretch justify-center lg:justify-start lg:gap-6">
            <p className="w-full">مشترک شوید تا آخرین اخبار را دریافت کنید.</p>
            <form
              className="flex gap-2 flex-col lg:flex-row"
              onSubmit={(e) => handleEmailSubmission(e)}
            >
              <div className="w-full">
                <input
                  placeholder="ایمیل خودرا وارد کنید..."
                  type="email"
                  value={email}
                  className="bg-[#7E9BFF] placeholder:text-white rounded-md w-full py-3 px-2 outline-none"
                  aria-describedby="emailnote"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p
                  id="emailnote"
                  className={
                    email && !validEmail
                      ? "bg-black text-white text-[0.75rem] p-[0.25rem] rounded-lg relative -bottom-[10px] mb-2 lg:mb-0"
                      : "absolute -left-[9999px]"
                  }
                >
                  ایمیل معتبر نیست.
                </p>
              </div>
              <button className="flex gap-1 p-1 bg-[#7E9BFF] rounded-md items-center whitespace-nowrap lg:w-[160px] w-[120px] lg:h-[48px]">
                مشترک شوید
                <img src="/white-arrow.svg" className="w-4 h-4" />
              </button>
            </form>
            {emailSuccess !== "" && emailSuccess && (
              <span className="bg-indigo-800 text-white text-center text-[1rem] p-[0.25rem] rounded-lg relative -bottom-[10px] mb-2 lg:mb-0">
                {emailSuccess !== "" && emailSuccess}
              </span>
            )}
            <p className="lg:text-center">
              ما به شما تمامی اخبار فروش ویژه و رویداد ها را اطلاع رسانی میکنیم.
            </p>
          </div>
          {/* social media */}
          <div className="flex flex-col lg:gap-2 gap-8 items-stretch lg:w-[50%]">
            <p className="flex justify-center items-center mt-1 text-lg">
              کیکاووس زمان در شبکه های اجتماعی:
            </p>
            <div className="flex flex-col text-center justify-center items-center gap-5">
              <div className="flex justify-center items-center gap-8">
                <Image
                  src={`${
                    hoverOne
                      ? "/footer/insLogoSvg.svg"
                      : "/footer/insColoredLogoSvg.svg"
                  }`}
                  alt="instagram"
                  onMouseEnter={() => setHoverOne(true)}
                  onMouseLeave={() => setHoverOne(false)}
                  width={50}
                  height={50}
                  className="cursor-pointer"
                />
                <Image
                  src={`${
                    hoverTwo
                      ? "/footer/whatLogoSvg.svg"
                      : "/footer/whatColoredLogoSvg.svg"
                  }`}
                  alt="whatsapp"
                  onMouseEnter={() => setHoverTwo(true)}
                  onMouseLeave={() => setHoverTwo(false)}
                  width={50}
                  height={50}
                  className="cursor-pointer"
                />
                <Image
                  src={`${
                    hoverThree
                      ? "/footer/baleLogoSvg.svg"
                      : "/footer/baleColoredLogoSvg.svg"
                  }`}
                  alt="bale"
                  width={50}
                  height={50}
                  onMouseEnter={() => setHoverThree(true)}
                  onMouseLeave={() => setHoverThree(false)}
                  className="cursor-pointer"
                />
                <Image
                  src={`${
                    hoverFour
                      ? "/footer/telegramLogoSvg.svg"
                      : "/footer/telegramColoredLogoSvg.svg"
                  }`}
                  alt="telegram"
                  width={50}
                  height={50}
                  onMouseEnter={() => setHoverFour(true)}
                  onMouseLeave={() => setHoverFour(false)}
                  className="cursor-pointer"
                />
              </div>
              <p className="font-faNum w-[50%] hidden lg:flex">
                دفتر پشتیبانی:تهران،خیابان قائم مقام فراهانی،کوچه ماگنولیا، پلاک
                30 ،واحد 12
              </p>
            </div>
          </div>
          {/* logos */}
          <div className="flex flex-col justify-center items-center text-center">
            <div className="md:hidden">
              <p className="font-faNum">
                دفتر پشتیبانی:تهران،خیابان قائم مقام فراهانی،کوچه ماگنولیا، پلاک
                30 ،واحد 12
              </p>
            </div>
            <div className="flex lg:flex-col justify-center items-center flex-row">
              <Link
                referrerPolicy="origin"
                target="_blank"
                href="https://trustseal.enamad.ir/?id=422622&Code=KGdskS8BDuEuvxkxW9GT5eCCOJ3TO3sa"
              >
                <Image
                  src="/footer/senfi.svg"
                  alt="header-logo"
                  width={100}
                  height={135}
                />
              </Link>
              <Link
                href="https://trustseal.enamad.ir/?id=446767&code=Y6oDWjmfcaGlRuWAK8t9YKGUq2VNkzYJ"
                target="_blank"
              >
                <Image
                  src="/footer/enamaad.svg"
                  alt="header-logo"
                  width={100}
                  height={135}
                />
              </Link>
            </div>
          </div>
        </div>
        {/* copyright */}
        <div className="flex border-t-[2.5px] w-full justify-center py-[1%] items-center text-blue-100 font-medium mt-4 text-center mx-auto text-lg">
          <p>
            کلیه حقوق این سایت متعلق به شرکت بین المللی کیکاووس زمان می‌باشد.
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Footer;
