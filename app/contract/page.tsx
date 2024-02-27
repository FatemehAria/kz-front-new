import Footer from "@/components/homepage-components/footer";
import Nav from "@/components/homepage-components/nav";
import Image from "next/image";
import Link from "next/link";

const Contract = () => {
  return (
    <div>
      <Nav />
      <div
        className="w-[70%] mx-auto grid grid-cols-2 font-YekanBakh rounded-xl overflow-hidden my-8"
        style={{ boxShadow: "13px 0px 61px -24px rgba(0, 0, 0, 0.15)" }}
        dir="rtl"
      >
        <div className="flex flex-col p-8 gap-4">
          <Image src="/logo.svg" width={130} height={115} alt="logo" />
          <p className="w-[90%]">
            قرارداد شما آماده است برای مشاهده کلیک کنید.
          </p>
          <div>
            <div className="flex items-center font-bold gap-3">
              <Image
                src="/courses/clockicon.png"
                alt="clock"
                width={30}
                height={30}
              />
              <p className="text-lg">تاریخ امضا قرارداد</p>
            </div>
            <table
              className="w-[400px] rounded-lg mx-auto text-center my-6"
              style={{ boxShadow: "0px 7px 18px 1px rgba(0, 0, 0, 0.25)" }}
            >
              <thead>
                <tr className="">
                  <th className="border-b border-l border-black py-2">شنبه</th>
                  <th className="border-b border-l border-black py-2">
                    یکشنبه
                  </th>
                  <th className="border-b border-l border-black py-2">
                    دوشنبه
                  </th>
                  <th className="border-b border-black py-2">سه شنبه</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-l border-black py-2">10:00</td>
                  <td className="border-l border-black py-2">10:00</td>
                  <td className="border-l border-black py-2">10:00</td>
                  <td>10:00</td>
                </tr>
                <tr>
                  <td className="border-l border-black py-2">10:00</td>
                  <td className="border-l border-black py-2">10:00</td>
                  <td className="border-l border-black py-2">10:00</td>
                  <td>10:00</td>
                </tr>
                <tr>
                  <td className="border-l border-black py-2">10:00</td>
                  <td className="border-l border-black py-2">10:00</td>
                  <td className="border-l border-black py-2">10:00</td>
                  <td>10:00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button className="bg-[#4866CF] rounded-[44px] text-white w-[40%] py-2 self-end relative -right-10">
            <Link href="/contract/contract-checkout"> تایید </Link>
          </button>
        </div>
        <div className="bg-[#7F98F1] flex justify-end items-end">
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
export default Contract;
