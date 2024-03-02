import React from "react";
import PlanCard from "./plan-card";
import news from "../../public/plans/news.svg";
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
    <div className="flex flex-col my-[8%]">
      <SectionHeader
        mainTitle="جدول پلن‌های طراحی سایت"
        subTitle="کدام طرح مناسب کسب و کار شماست؟"
        width="30%"
      />
      <div className="flex flex-row justify-between mt-[5%]">
        {PlanData.map((item) => (
          <div key={item.id}>
            <PlanCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plans;
