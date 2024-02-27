"use client";
import { deleteToken } from "@/redux/features/user/userSlice";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import PanelSidebarLogo from "./panel-sidebar-logo";
type SideOptionsProps = {
  text: string;
  imgSrc: string;
  address: string;
  path: string | string[];
};

const PanelSidebar = ({ sideOptions }: { sideOptions: SideOptionsProps[] }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      <div
        className="w-[190px] font-YekanBakh py-6 h-full border-l"
        style={{ boxShadow: "-9px 0px 61px 0px rgba(0, 0, 0, 0.07)" }}
      >
        <PanelSidebarLogo />
        <ul className="flex flex-col gap-y-5 items-start">
          {sideOptions.map((item, index) => (
            <li key={index} className="font-bold text-lg">
              <div className="flex flex-row w-full justify-around">
                <Image
                  src="/sidebar/pointer.png"
                  alt="pointer"
                  width={13}
                  height={13}
                  className={`${
                    item?.address === pathname ? "flex" : "hidden"
                  }`}
                />
                <div className="flex flex-row pr-4 pl-1 whitespace-nowrap items-center">
                  <Link href={item.address} className="pl-2">
                    <Image
                      src={item.imgSrc}
                      alt={`${item}`}
                      width={40}
                      height={40}
                    />
                  </Link>
                  <Link
                    href={item.address}
                    className={`${
                      item?.address === pathname || item.path.includes(pathname)
                        ? "text-[#4866CF]"
                        : "text-black"
                    }`}
                  >
                    {item.text}
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default PanelSidebar;
