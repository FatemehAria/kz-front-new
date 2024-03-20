"use client";
import axios from "axios";
import React, { useState } from "react";
import { Bounce, toast } from "react-toastify";
function News() {
  const [email, setEmail] = useState("");
  const submitEmail = async (email: string) => {
    try {
      const { data } = await axios.post(
        "https://keykavoos.liara.run/Client/Newsletter",
        {
          email,
        }
      );
      toast.success("ایمیل با موفقیت ثبت شد.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        rtl: true,
      });
    } catch (error: any) {
      toast.error("خطا در ثبت ایمیل.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        rtl: true,
      });
    }
  };
  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitEmail(email);
  };
  return (
    <form
      onSubmit={(e) => handleSubmission(e)}
      className="bg-[#D0DBEC] h-[400px] mt-[5%] flex flex-col justify-center items-center gap-3 rounded-xl px-[3%] sm:px-0"
    >
      <p className="text-[#334052] sm:text-[40px] max-w-lg text-center text-[30px]">
        با عضویت در خبرنامه شرکت بین المللی کیکاووس زمان از تخفیفات باخبر شوید
      </p>
      <div className="bg-[#F8FAFC] sm:w-[400px] flex flex-row rounded-[6px]">
        <button
          className="bg-[#B1BED0] w-[100px] py-[2%] rounded-[6px] text-white"
          type="submit"
        >
          تایید ایمیل
        </button>
        <input
          className="outline-none w-full rounded-[6px] px-3"
          dir="rtl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </form>
  );
}

export default News;
