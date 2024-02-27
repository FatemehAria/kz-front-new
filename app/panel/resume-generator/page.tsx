import Image from "next/image";
import React from "react";
import about from "../../../public/resume/about.svg";
import contact from "../../../public/resume/contact.svg";
import website from "../../../public/resume/website.svg";
import location from "../../../public/resume/location.svg";
import reference from "../../../public/resume/reference.svg";
import edu from "../../../public/resume/edu.svg";
import bluefullname from "../../../public/resume/bluefullname.svg";
import blueworkhistory from "../../../public/resume/blueworkhistory.svg";
import skills from "../../../public/resume/skills.svg";
const ResumeGenerator = () => {
  return (
    <div className="grid grid-cols-5 w-[90%] mx-auto gap-2">
      <div className="relative bg-slate-800 col-span-1 text-red-100">
        <div
          style={{
            borderBottom: "50px solid transparent",
            borderTop: "1px solid blue",
            borderRight: "210px solid blue",
          }}
        ></div>
        <div className="w-[100px] h-[100px] border-white border-2 rounded-t-full rounded-bl-full mx-auto"></div>
        <ul className="grid grid-cols-1 border-b border-dashed px-[3%]">
          <li className="flex gap-[3%]">
            <Image src={about} alt="about" width={25} />
            <span>درباره من</span>
          </li>
          <li className="flex gap-[3%]">
            <Image src={contact} alt="contact" width={25} />
            <span>تماس با من</span>
          </li>
          <li className="flex gap-[3%]">
            <Image src={website} alt="website" width={25} />
            <span>وبسایت</span>
          </li>
          <li className="flex gap-[3%]">
            <Image src={location} alt="website" width={25} />
            <span>آدرس</span>
          </li>
        </ul>
        <div className="flex gap-[3%] border-b border-dashed px-[3%]">
          <Image src={reference} alt="reference" width={25} />
          <span>رفرنس</span>
        </div>
        <div className="flex gap-[3%] px-[3%]">
          <Image src={edu} alt="edu" width={25} />
          <span>تحصیلات</span>
        </div>
      </div>
      <div className="col-span-4 border-r-2 border-black relative">
        <div className="bg-indigo-600 rounded-lg w-2 h-14 absolute -right-1 top-4"></div>
        <p className="absolute top-8 right-2 flex gap-[3%] whitespace-nowrap">
          <Image src={bluefullname} alt="fullname" width={25} />
          <span>نام کامل</span>
        </p>
        <div className="bg-indigo-600 rounded-lg w-2 h-14 absolute -right-1 top-36"></div>
        <p className="absolute top-40 right-2 flex gap-[3%] whitespace-nowrap">
          <Image src={blueworkhistory} alt="work history" width={25} />
          <span>سابقه کاری</span>
        </p>
        <div className="bg-indigo-600 rounded-lg w-2 h-14 absolute -right-1 top-64"></div>
        <p className="absolute top-[17rem] right-2 flex gap-[3%] whitespace-nowrap">
          <Image src={skills} alt="skills" width={25} />
          <span>سابقه کاری</span>
        </p>
      </div>
    </div>
  );
};

export default ResumeGenerator;
