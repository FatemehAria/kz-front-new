import React from "react";
import SectionHeader from "./section-header";
import TechnologyCard from "./technology-card";
import { TechnologyData } from "@/lib/data";

function Technology() {
  return (
    <div className="flex flex-col">
      <SectionHeader
        mainTitle="تکنولوژی طراحی و راه اندازی سایت در کیکاووس"
        subTitle="کدام طرح مناسب کسب و کار شماست؟"
        width="20%"
      />
      <div className="flex flex-row-reverse w-full justify-between gap-5">
        {TechnologyData.map((item) => (
          <TechnologyCard key={item.id} technologyInfo={item} />
        ))}
      </div>
    </div>
  );
}

export default Technology;
