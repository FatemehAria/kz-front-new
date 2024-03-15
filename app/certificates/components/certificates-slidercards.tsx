"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

const ImageLinks = [
  {
    id: 0,
    link: "/certificates/sliderpic1.svg",
    padding: 2,
    altText: "cer-1",
    info: "ایزو ۹۰۰۱ یک استاندارد بین‌المللی سیستم مدیریت کیفیت است. این استاندارد توسط سازمان‌هداوم محصولات و خدماتی که نیازهای مشتریان ا برای نشان‌دادن توانایی خود در ارائه مو مقررات را برآورده می‌کند، استفاده می‌شود. شرکت بین اللمللی کیکاووس زمان در سال .......  با ارائه مستندات کافی مفتخر به در یافت این استاندارد از مرجع TQS گردید",
  },
  {
    id: 1,
    link: "/certificates/sliderpic2.svg",
    padding: 2,
    altText: "cer-2",
    info: "استاندارد ایزو 21001 (مدیریت مراکز آموزشی) برای مدیریت کیفیت و بهبود فرآیندهای آموزشی در مراکز آموزشی به کار می‌رود. این استاندارد با ارائه یک سیستم مدیریتی جامع، به مراکز آموزشی کمک می‌کند تا کیفیت خدمات آموزشی را بهبود دهند و به نیازها و انتظارات دانشجویان و ذینفعان پاسخگو باشند. و شرکت بین اللمللی کیکاووس زمان در سال .......  با ارائه مستندات کافی مفتخر به در یافت این استاندارد از مرجع TQS گردید",
  },
  {
    id: 2,
    link: "/certificates/sliderpic3.svg",
    padding: 2,
    altText: "cer-3",
    info: "ایزو ۴۵۰۰۱ (انگلیسی: ISO 45001 )یک استاندارد ایزو در زمینه مدیریت سیستم‌های ایمنی و بهداشت شغلی است که در ماه مارس سال ۲۰۱۸ تدوین شده‌است. هدف این استاندارد کاهش بیماری‌ها و آسیب‌های شغلی است.و شرکت بین اللمللی کیکاووس زمان در سال .......  با ارائه مستندات کافی مفتخر به در یافت این استاندارد از مرجع TQS گردید",
  },
  {
    id: 3,
    link: "/certificates/sliderpic4.svg",
    padding: 2,
    altText: "cer-4",
    info: "ISO 29990 مربوط به مؤسسات آموزشی غیر رسمی است به عنوان مثال هر گونه آموزش سازماندهی شده با هدف مخاطب خاص، که بخشی از نظام آموزش رسمی نیست را شامل می شود. در این دسته مراکزی مانند موسسات زبان خارجی، آموزشگاه های IT ، سایر موسسات آموزشی و آموزشگاه های مهارتی، کالج های خصوصی، دانشکده های هنرهای رزمی و غیره قرار می گیرند.",
  },
  {
    id: 4,
    link: "/certificates/sliderpic5.svg",
    padding: 8,
    altText: "cer-4",
    info: "سیستم مدیریت یکپارچه (IMS) ترکیبی از استانداردهای سیستم مدیریت چندگانه که در سازمان آن ثبت شده است، میباشد. سیستم های مدیریتی از طریق یک سیستم با فرایندهایی که نیازهای هر استاندارد را و شرکت بین اللمللی کیکاووس زمان در سال .......  با ارائه مستندات کافی مفتخر به در یافت این استاندارد از مرجع TQS گردید",
  },
];
type CertificatesSliderCardsProps = {
  currentSlideIndex: number;
  setCurrentSlideIndex: React.Dispatch<React.SetStateAction<number>>;
};
const CertificatesSliderCards = ({
  currentSlideIndex,
  setCurrentSlideIndex,
}: CertificatesSliderCardsProps) => {
  // console.log("text slider",currentSlideIndex);
  return (
    <>
      <div className="flex justify-center items-center text-center lg:w-[55%] lg:h-[200px] w-[90%]">
        <Swiper
          modules={[Autoplay]}
          loop
          speed={1500}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          centeredSlides={true}
          preventInteractionOnTransition={true}
          allowTouchMove={false}
          onSlideChange={(swiper) => setCurrentSlideIndex(swiper.activeIndex)}
        >
          {ImageLinks.map((link) => (
            <SwiperSlide
              key={link.id}
              className="lg:leading-6 lg:text-sm lg:pt-[5%] mx-auto h-full flex justify-center items-center lg:h-[50%]"
            >
              <p>{link.info}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default CertificatesSliderCards;
