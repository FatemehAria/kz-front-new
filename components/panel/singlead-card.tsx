"use client";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type SingleadCardProps = {
  name: string;
  setSteps: Dispatch<SetStateAction<number>>;
};

const SingleadCard = ({ name, setSteps }: SingleadCardProps) => {
  return (
    <div className="font-YekanBakh font-bold">
      <div className="flex items-center gap-2 text-lg pb-4">
        <Image
          src="/employerpanel/adtitleicon.svg"
          alt="icon"
          width={30}
          height={30}
        />
        <span onClick={() => setSteps(2)} className="cursor-pointer">
          {name}
        </span>
      </div>
      <div
        className="grid grid-cols-5 text-center p-[2%] rounded-lg"
        style={{ boxShadow: "0px 26px 54.5px 6px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="flex flex-row justify-center">
          <div className="flex flex-col justify-center items-center w-full gap-2">
            <Image
              src="/employerpanel/age.svg"
              alt="document"
              width={110}
              height={110}
            />
            <p className="font-YekanBakh font-bold">
              سن:<span className="font-faNum">20</span>سال
            </p>
          </div>
          <Image
            src="/employerpanel/divider.svg"
            alt="divider"
            width={5}
            height={5}
          />
        </div>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col justify-center items-center w-full gap-2">
            <Image
              src="/employerpanel/docu.svg"
              alt="document"
              width={100}
              height={100}
            />
            <p className="font-YekanBakh font-bold">
              سابقه:<span className="font-faNum">20</span>سال
            </p>
          </div>
          <Image
            src="/employerpanel/divider.svg"
            alt="divider"
            width={5}
            height={5}
          />
        </div>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col justify-center items-center w-full gap-2">
            <Image
              src="/employerpanel/edu.svg"
              alt="document"
              width={110}
              height={110}
            />
            <p className="font-YekanBakh font-bold">
              تحصیل:<span>دیپلم</span>
            </p>
          </div>
          <Image
            src="/employerpanel/divider.svg"
            alt="divider"
            width={5}
            height={5}
          />
        </div>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col justify-center items-center w-full gap-2">
            <Image
              src="/employerpanel/sol.svg"
              alt="document"
              width={150}
              height={150}
              className="mb-2"
            />
            <p className="font-YekanBakh font-bold">
              سربازی:<span>معاف</span>
            </p>
          </div>
          <Image
            src="/employerpanel/divider.svg"
            alt="divider"
            width={5}
            height={5}
          />
        </div>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col justify-center items-center w-full gap-2">
            <Image
              src="/employerpanel/clock.svg"
              alt="document"
              width={90}
              height={90}
            />
            <p className="font-YekanBakh font-bold">
              <span className="font-faNum">20</span>ساعت پیش ارسال شد.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleadCard;
