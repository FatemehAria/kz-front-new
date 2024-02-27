import Footer from "@/components/homepage-components/footer";
import Nav from "@/components/homepage-components/nav";
import Image from "next/image";
import Link from "next/link";

const ChooseCourse = () => {
  return (
    <div>
      <Nav />
      <div
        className="w-[70%] mx-auto grid grid-cols-6 font-YekanBakh rounded-xl overflow-hidden my-8"
        style={{ boxShadow: "13px 0px 61px -24px rgba(0, 0, 0, 0.15)" }}
        dir="rtl"
      >
        <div className="col-span-5 justify-center items-start flex flex-col p-4">
          <div className="flex gap-6 items-center font-bold">
            <Image src="/logo.svg" width={130} height={115} alt="logo" />
            <p className="">انتخاب دوره های آموزشی</p>
          </div>
          {/* cards */}
          <div className="flex justify-center items-center gap-5 my-6">
            <div
              className="flex flex-col justify-start h-[250px] gap-4 px-2 py-1 items-center rounded-lg font-bold"
              style={{ boxShadow: "0px 4px 54px -1px rgba(0, 0, 0, 0.10)" }}
            >
              <Image
                src="/choosecourse/marketing.svg"
                alt="digital-marketing"
                width={150}
                height={150}
              />
              <p>آموزش دیجیتال مارکتینگ</p>
              <button className="bg-[#4866CF] rounded-[44px] text-white py-2 w-full">
                انتخاب
              </button>
            </div>
            <div
              className="flex flex-col justify-start items-center h-[250px] gap-6 rounded-lg font-bold"
              style={{ boxShadow: "0px 4px 54px -1px rgba(0, 0, 0, 0.10)" }}
            >
              <Image
                src="/choosecourse/frontend.svg"
                alt="digital-marketing"
                width={200}
                height={200}
              />
              <div className="flex flex-col gap-7 px-2 py-1 w-full justify-center items-center">
                <p>آموزش فرانت-اِند</p>
                <button className="bg-[#4866CF] rounded-[44px] text-white py-2 w-[90%]">
                  انتخاب
                </button>
              </div>
            </div>
            <div
              className="flex flex-col justify-start items-center h-[250px] gap-6 rounded-lg font-bold px-2 py-1"
              style={{ boxShadow: "0px 4px 54px -1px rgba(0, 0, 0, 0.10)" }}
            >
              <Image
                src="/choosecourse/backend.svg"
                alt="digital-marketing"
                width={200}
                height={150}
              />
              <p>آموزش بک-اِند</p>
              <button className="bg-[#4866CF] rounded-[44px] text-white py-2 w-[90%]">
                انتخاب
              </button>
            </div>
            <div
              className="flex flex-col justify-start items-center h-[250px] rounded-lg px-9 py-1 font-bold gap-4"
              style={{ boxShadow: "0px 4px 54px -1px rgba(0, 0, 0, 0.10)" }}
            >
              <Image
                src="/choosecourse/accounting.svg"
                alt="digital-marketing"
                width={120}
                height={120}
              />
              <p>آموزش حسابداری</p>
              <button className="bg-[#4866CF] rounded-[44px] text-white py-2 w-full">
                انتخاب
              </button>
            </div>
          </div>
          <div className="self-end">
            <button className="bg-[#4866CF] rounded-[44px] text-white p-2">
              <Link href="/complete-setup"> تایید و ادامه</Link>
            </button>
          </div>
        </div>

        <div className="bg-[#7F98F1] flex justify-end items-end col-span-1">
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
export default ChooseCourse;
