import Image from "next/image";
import Link from "next/link";
type AdnavNumsProps = {
  text: string;
  number: number;
};
const AdnavNums = ({ text, number }: AdnavNumsProps) => {
  return (
    <div className="flex justify-center items-center gap-2 whitespace-nowrap">
      <div className="relative">
        <Image
          src="/employerpanel/adtitleicon.png"
          alt="icon"
          width={25}
          height={25}
        />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-faNum text-lg font-semibold">
          {number}
        </span>
      </div>
      <li className="font-YekanBakh flex justify-center items-center gap-2">
        <span>{text}</span>
        <Image
          src="/employerpanel/right-arrow.png"
          alt="arrow"
          width={15}
          height={15}
        />
      </li>
    </div>
  );
};
export default AdnavNums;
