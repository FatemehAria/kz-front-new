import React from "react";
import PlanCard from "./plan-card";
import news from "../../public/Plans/news.svg";
import SectionHeader from "./section-header";
const PlanData = [
  {
    id: 1,
    type: "خبری",
    title: "لورم ایپسوم متن ساختگی",
    planInfo: [
      "لورم ایپسوم متن ساختگی",
      "لورم ایپسوم متن ساختگی",
      "لورم ایپسوم متن ساختگی",
      "لورم ایپسوم متن ساختگی",
    ],
    price: "10",
    imgSrc: news,
  },
  {
    id: 2,
    type: "خبری",
    title: "لورم ایپسوم متن ساختگی",
    planInfo: [
      "لورم ایپسوم متن ساختگی",
      "لورم ایپسوم متن ساختگی",
      "لورم ایپسوم متن ساختگی",
      "لورم ایپسوم متن ساختگی",
    ],
    price: "10",
    imgSrc: news,
  },
  {
    id: 3,
    type: "خبری",
    title: "لورم ایپسوم متن ساختگی",
    planInfo: [
      "لورم ایپسوم متن ساختگی",
      "لورم ایپسوم متن ساختگی",
      "لورم ایپسوم متن ساختگی",
      "لورم ایپسوم متن ساختگی",
    ],
    price: "10",
    imgSrc: news,
  },
];
function Plans() {
  return (
    <div className="flex flex-col">
      <SectionHeader
        mainTitle="جدول پلن‌های طراحی سایت"
        subTitle="کدام طرح مناسب کسب و کار شماست؟"
        width="28%"
      />
      <div className="flex sm:flex-row sm:justify-between sm:max-lg:flex-wrap flex-col items-center lg:gap-0 gap-5">
        {PlanData.map((item) => (
          <div
            key={item.id}
            className={`${
              item == PlanData[PlanData.length - 1] &&
              "sm:max-lg:w-full sm:max-lg:flex sm:max-lg:justify-center"
            }`}
          >
            <PlanCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plans;
