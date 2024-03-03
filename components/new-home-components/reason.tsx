import React from "react";
import SectionHeader from "./section-header";
import data from "../../public/Reason/data.svg";
import time from "../../public/Reason/time.svg";
import mail from "../../public/Reason/mail.svg";
import book from "../../public/Reason/book.svg";
import ReasonCard from "./reason-card";
const ReasonData = [
  {
    id: 1,
    reasonTitle: "دامنه و هاست رایگان",
    reasonText:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از ",
    imgSrc: data,
  },
  {
    id: 2,
    reasonTitle: "دامنه و هاست رایگان",
    reasonText:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از ",
    imgSrc: time,
  },
  {
    id: 3,
    reasonTitle: "دامنه و هاست رایگان",
    reasonText:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از ",
    imgSrc: mail,
  },
  {
    id: 4,
    reasonTitle: "دامنه و هاست رایگان",
    reasonText:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از ",
    imgSrc: book,
  },
];
function Reason() {
  return (
    <div>
      <SectionHeader
        mainTitle="چرا کیکاووس زمان را انتخاب کنیم؟"
        subTitle="دلایل انتخاب کیکاووس زمان چه چیزهایی است؟"
        width="27%"
      />
      <div className="flex flex-row-reverse justify-between mt-[5%]">
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
