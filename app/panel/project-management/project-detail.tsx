import React from "react";
import { ImBackward, ImBackward2 } from "react-icons/im";
import { IoArrowBack } from "react-icons/io5";
const ProjectDetailNav = [
  "ثبت سفارش",
  "تهیه زیرساخت",
  "طراحی UI",
  "Front",
  "Back",
  "دیپلوی",
  "تحویل موقت",
  "پشتیبانی",
];
type ProjectDetailProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};
function ProjectDetail({ setStep }: ProjectDetailProps) {
  return (
    <div className="relative">
      <div
        className="flex justify-end w-full text-xl cursor-pointer absolute -top-12"
        onClick={() => setStep(1)}
      >
        <div className="bg-white rounded-full p-2">
          <IoArrowBack />
        </div>
      </div>
      <ul className="grid grid-cols-8 justify-between bg-[#4866CE] text-white text-center rounded-t-2xl overflow-hidden">
        {ProjectDetailNav.map((item, index) => (
          <li
            key={index}
            className="hover:bg-[#EAEFF6] p-5 hover:text-[#4866CE] border border-[#4866CE]"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectDetail;
