import Image from "next/image";
import { activeAds } from "@/lib/data";

type SinglepageCardsProps = {
  title: string;
  amount: number;
};
const SinglepageCards = ({ title, amount }: SinglepageCardsProps) => {
  return (
    <div className="font-YekanBakh font-bold whitespace-nowrap">
      <div className="flex items-center gap-2 text-lg py-4">
        <Image
          src="/employerpanel/adtitleicon.svg"
          alt="icon"
          width={30}
          height={30}
        />
        <span>{title}</span>
      </div>

      <div
        className="grid grid-cols-5 justify-center items-center rounded-lg p-[1%]"
        style={{ boxShadow: "0px 26px 54.5px 6px rgba(0, 0, 0, 0.25)" }}
      >
        {activeAds.map((item, index) => (
          <div
            key={item.title}
            className="flex justify-center items-center"
          >
            <div className="flex flex-col justify-center items-center gap-4">
              <div className="relative">
                <Image
                  src="/employerpanel/docu.svg"
                  alt="document"
                  width={110}
                  height={110}
                />
                <Image
                  src={`${
                    item.status === true
                      ? "/employerpanel/recieved.svg"
                      : item.status === false
                      ? "/employerpanel/rejected.svg"
                      : "/employerpanel/inhands.svg"
                  }`}
                  className="absolute -left-3 top-16"
                  alt="status"
                  width={55}
                  height={55}
                />
                <span className="absolute left-2 top-20 font-faNum">
                  {amount}
                </span>
              </div>
              <p className="font-YekanBakh font-bold">{item.title}</p>
            </div>

            {index < activeAds.length - 1 ? (
              <Image
                src="/employerpanel/divider.png"
                alt="divider"
                width={5}
                height={5}
              />
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default SinglepageCards;
