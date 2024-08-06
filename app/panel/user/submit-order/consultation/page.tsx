import Order from "@/components/home-components/order";
import Image from "next/image";
import React from "react";
import ConsultImage from "@/public/consult-image.svg";
import PhoneIcon from "@/public/consult/phone.svg";
import TicketIcon from "@/public/consult/ticket.svg";
import Link from "next/link";
function Consultation() {
  return (
    <div
      className="py-[3%] w-[100%] shadow mx-auto bg-white rounded-2xl px-[3%] grid grid-cols-1 gap-8"
      dir="ltr"
    >
      <div className="grid grid-cols-2">
        <div>
          <Image src={ConsultImage} alt="consultation" />
        </div>
        <div className="text-right">
          <p>مشاوره رایگان</p>
          <p>
            وقتی ثروت‌ های بزرگ به دست برخی مردم می‌افتد در پرتو آن نیرومند
            می‌شوند و در سایهٔ نیرومندی و ثروت خیال می‌ کنند که می‌توانند در
            خارج از وطن خود زندگی نمایند و خوشبخت و سرافراز باشند ولی به زودی
            می‌ فهمند که اشتباه کرده‌ اند و عظمت هر ملتی بر روی خرابه‌ های وطن
            خودش می‌باشد و بس!
          </p>
        </div>
      </div>

      <div className="flex flex-row-reverse justify-between text-[#4866CE]">
        <div className="border-[2px] border-[#4866CE] bg-[#F9F9F9] p-3 rounded-[12px] flex flex-row items-center gap-[10rem]">
          <Image src={PhoneIcon} alt="phone-icon" width={30} />
          <p>ارتباط از طریق شماره تماس 91691650</p>
        </div>
        <Link href="/panel/user/submit-order/consultation/submit-consultation" className="border-[2px] border-[#4866CE] bg-[#F9F9F9] p-3 rounded-[12px] flex flex-row items-center gap-[17rem]">
          <Image src={TicketIcon} alt="phone-icon" width={30} />
          <p>
            ارتباط از طریق تیکت
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Consultation;
