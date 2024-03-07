"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import sidebarpicbg from "../../public/Panel/sidebarpicbg.svg";
import Logo from "@/app/auth/components/logo";

type SideOptionsProps = {
  text: string;
  imgSrc: string;
  address: string;
  path: string | string[];
};

const PanelSidebar = ({ sideOptions }: { sideOptions: SideOptionsProps[] }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col">
      <div
        className="w-[260px] font-YekanBakh py-6 border-l relative h-full"
        // style={{ boxShadow: "-9px 0px 61px 0px rgba(0, 0, 0, 0.07)" }}
      >
        <div className="flex justify-center">
          <Logo />
        </div>
        <Image src={sidebarpicbg} alt="sidebarbg" height={605} />
        <div className="absolute top-40 flex flex-col gap-10 pr-2 w-full">
          {sideOptions.map((item) => (
            <Link
              href={item.address}
              key={item.text}
              className="flex flex-row items-center gap-7 whitespace-nowrap"
            >
              <Image src={item.imgSrc} alt={item.text} width={30} height={30} />
              <p
                className={`text-[24px] font-extrabold w-full ${
                  item?.address === pathname || item.path.includes(pathname)
                    ? "text-[#4866CF] border-l-4 border-l-[#4866CF]"
                    : " text-[#68707A]"
                }`}
              >
                {item.text}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default PanelSidebar;
