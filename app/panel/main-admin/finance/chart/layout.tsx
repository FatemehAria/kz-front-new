import AdnavNums from "@/components/panel/adnav-nums";
import Link from "next/link";
import ChartNav from "./components/chart-nav";

const ChartLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="flex flex-row justify-center gap-[2%] items-center">
        <div className="flex border border-black rounded-lg gap-2 px-[1%] py-1 items-center whitespace-nowrap">
          <ChartNav text="بالانس مالی" linkSrc="" />
          <ChartNav text="هزینه های شرکت" linkSrc="" />
          <ChartNav text="درآمد های شرکت" linkSrc="" />
        </div>
        <Link href="" className="bg-[#9DACDF] w-[100px] rounded-lg py-1 text-center text-white">جزئیات</Link>
      </div>
      {children}
    </div>
  );
};
export default ChartLayout;
