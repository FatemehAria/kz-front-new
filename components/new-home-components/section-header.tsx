import React from "react";

type SectionHeaderProps = {
  mainTitle: string;
  subTitle: string;
  width: string;
};
function SectionHeader({ mainTitle, subTitle, width }: SectionHeaderProps) {
  return (
    <div className="relative whitespace-nowrap">
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: width,
          height: "100%",
          border: "none",
          borderTop: "3px solid",
          borderImage:
            "linear-gradient(to left, rgba(72, 102, 207, 1) -5%, rgba(234, 239, 246, 1) 100%) 1",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          width: width,
          height: "100%",
          border: "none",
          borderTop: "3px solid",
          borderImage:
            "linear-gradient(to left, rgba(234, 239, 246, 1) -5%, rgba(72, 102, 207, 1) 100%) 1",
        }}
      ></div>
      <div className="text-center absolute -top-14 left-1/2 -translate-x-1/2 bg-transparent">
        <p className="text-[#68707A] text-[37px] font-bold">{mainTitle}</p>
        <p className="text-[#4866CF] text-[24px]">{subTitle}</p>
      </div>
    </div>
  );
}

export default SectionHeader;
