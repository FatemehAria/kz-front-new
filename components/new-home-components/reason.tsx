import React from "react";
import SectionHeader from "./section-header";
import data from "../../public/Reason/data.svg";
import hoveredData from "../../public/Reason/datahover.svg";
import time from "../../public/Reason/time.svg";
import hoveredTime from "../../public/Reason/timehover.svg";
import mail from "../../public/Reason/mail.svg";
import hoveredMail from "../../public/Reason/mailhover.svg";
import book from "../../public/Reason/book.svg";
import hoveredBook from "../../public/Reason/bookhover.svg";
import ReasonCard from "./reason-card";
const ReasonData = [
  {
    id: 1,
    reasonTitle: "دامنه و هاست رایگان",
    reasonText:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از ",
    imgSrc: data,
    hoveredImgSrc: hoveredData,
  },
  {
    id: 2,
    reasonTitle: "دامنه و هاست رایگان",
    reasonText:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از ",
    imgSrc: time,
    hoveredImgSrc: hoveredTime,
  },
  {
    id: 3,
    reasonTitle: "دامنه و هاست رایگان",
    reasonText:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از ",
    imgSrc: mail,
    hoveredImgSrc: hoveredMail,
  },
  {
    id: 4,
    reasonTitle: "دامنه و هاست رایگان",
    reasonText:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از ",
    imgSrc: book,
    hoveredImgSrc: hoveredBook,
  },
];
function Reason() {
  return (
    <div className="flex flex-col">
      <SectionHeader
        mainTitle="چرا کیکاووس زمان را انتخاب کنیم؟"
        subTitle="دلایل انتخاب کیکاووس زمان چه چیزهایی است؟"
        width="24%"
      />
      <div className="lg:flex lg:flex-row-reverse lg:justify-between grid grid-cols-2 gap-[5%] lg:gap-0">
        {ReasonData.map((item) => (
          <div key={item.id}>
            <ReasonCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reason;
