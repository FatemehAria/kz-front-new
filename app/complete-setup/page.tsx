import Footer from "@/components/homepage-components/footer";
import Nav from "@/components/homepage-components/nav";
import Image from "next/image";
import Link from "next/link";

const CompleteSetup = () => {
  return (
    <div>
      <Nav />
      <div
        className="w-[80%] mx-auto grid grid-cols-[80%,70%] font-YekanBakh rounded-xl overflow-hidden my-8"
        style={{ boxShadow: "13px 0px 61px -24px rgba(0, 0, 0, 0.15)" }}
        dir="rtl"
      >
        <div className="flex flex-wrap p-8 gap-6 pb-24">
          <div className="flex flex-row items-center gap-4">
            <Image src="/logo.svg" width={130} height={115} alt="logo" />
            <p className="font-bold">تکمیل اطلاعات ثبت نام</p>
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="نام"
              className="border p-3 rounded-md"
            />
            <input
              type="text"
              placeholder="نام خانوادگی"
              className="border p-3 rounded-md"
            />
            <input
              type="text"
              placeholder="نام پدر"
              className="border p-3 rounded-md"
            />
          </div>
          <div className="grid grid-cols-[98%,50%] gap-4">
            <input
              type="text"
              placeholder="آدرس"
              className="border p-3 rounded-md"
            />
            <input
              type="text"
              placeholder="شماره ملی"
              className="border p-3 rounded-md"
            />
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="شماره تماس"
              className="border p-3 rounded-md"
            />
            <input
              type="text"
              placeholder="شماره تماس اضطراری"
              className="border p-3 rounded-md"
            />
            <input
              type="text"
              placeholder="تصویر کارت ملی"
              className="border p-3 rounded-md"
            />
          </div>
          <button className="bg-[#4866CF] rounded-[44px] text-white p-2 relative top-14 px-4">
            <Link href="/info"> تایید و ادامه</Link>
          </button>
        </div>
        <div className="bg-[#7F98F1] flex justify-center items-end w-[40%] relative -right-20">
          {/* gets replaced with a slider */}
          <div className="flex flex-row pb-8 pl-4 gap-2">
            <Image
              src="/login/bullets.png"
              width={10}
              height={10}
              alt="bullets"
            />
            <Image
              src="/login/bullets.png"
              width={10}
              height={10}
              alt="bullets"
            />
            <Image
              src="/login/bullets.png"
              width={10}
              height={10}
              alt="bullets"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default CompleteSetup;
