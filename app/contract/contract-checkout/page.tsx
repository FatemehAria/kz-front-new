import Footer from "@/components/homepage-components/footer";
import Nav from "@/components/homepage-components/nav";
import Image from "next/image";
import Link from "next/link";

const ContractCheckout = () => {
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
          <div
            className="font-bold font-faNum h-[200px] rounded-xl flex flex-col leading-7"
            style={{ boxShadow: "0px 4px 17px 1px rgba(0, 0, 0, 0.25)" }}
          >
            <p className="border-black border-b p-8">
              اسم کوچک عزیز ثبت نام شما با موفقیت انجام شد ساعت 12 روز شنبه جهت
              امضای قرارداد با کارت ملی منتظرتون هستیم.
            </p>
            <p className="p-4">آدرس:خیابان قائم مقام فراهانی،کوچه ماگنولیا،پلاک30،واحد 12.</p>
          </div>
          <button className="bg-[#4866CF] rounded-[44px] text-white p-2 self-end">
            <Link href="/"> بازگشت به خانه </Link>
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
export default ContractCheckout;
