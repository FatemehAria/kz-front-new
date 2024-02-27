import Image from "next/image";
import Link from "next/link";

type DashboardInfoProps = {
  title: string;
  subtitle?: string;
  sub?: string;
  imgSrc: string;
  imgWidth?: number;
  imgheight?: number;
  linkHref?: string;
  top?: string;
};
type EmployerInfoProps = {
  active: number;
  deactive: number;
  employed: number;
  activeTickets: number;
};
type PanelCardsProps = {
  dashboardInfo: DashboardInfoProps[];
  membership?: string;
  employerInfo?: EmployerInfoProps;
};
const PanelCards = ({
  dashboardInfo,
  membership,
  employerInfo,
}: PanelCardsProps) => {
  return (
    <div className="grid grid-cols-2 2xl:max-4xl:grid-cols-3 4xl:grid-cols-2 lg:max-2xl:grid-cols-2 justify-center items-center lg:gap-y-20 gap-y-[15%] gap-x-[3%] font-YekanBakh py-10 lg:px-0">
      {dashboardInfo.map((item) => (
        <div key={item.imgSrc}>
          {item.linkHref ? (
            <Link
              href={`${item.linkHref}`}
              className={`relative lg:w-[80%] w-[100%] h-[160px] mx-auto flex flex-col justify-center items-center rounded-lg bg-[#EDF1FF] ${
                item.linkHref ? "cursor-pointer" : "cursor-context-menu"
              }`}
            >
              {item.imgSrc !== "" && (
                <Image
                  src={item.imgSrc}
                  alt={`${item.title}`}
                  width={item.imgWidth}
                  height={item.imgheight}
                  quality={100}
                  className={`absolute lg:${item.top} right-25 overflow-hidden -top-12 `}
                />
              )}
              <p className="lg:text-[2rem] text-[1.5rem] font-bold pt-3">
                {item.title}
              </p>
              <span className="font-medium lg:text-lg text-sm">
                {item.title === "آگهی فعال"
                  ? `شما ${employerInfo?.active} آگهی فعال دارید`
                  : item.title === "آگهی غیر فعال"
                  ? `شما ${employerInfo?.deactive} آگهی غیرفعال دارید`
                  : item.title === " استخدام شده"
                  ? `شما ${employerInfo?.employed} نفر استخدام شده دارید`
                  : item.sub === "support"
                  ? `شما ${employerInfo?.activeTickets} تیکت فعال دارید`
                  : item.title === "برنامه نویس" || item.title === "عضویت"
                  ? item.sub
                  : item.subtitle === ""
                  ? membership + " " + "روز"
                  : item.subtitle}
              </span>
            </Link>
          ) : (
            <div
              className={`relative lg:w-[80%] w-[100%] h-[160px] mx-auto flex flex-col justify-center items-center rounded-lg bg-[#EDF1FF] ${
                item.linkHref ? "cursor-pointer" : "cursor-context-menu"
              }`}
            >
              {item.imgSrc !== "" && (
                <Image
                  src={item.imgSrc}
                  alt={`${item.title}`}
                  width={item.imgWidth}
                  height={item.imgheight}
                  quality={100}
                  className={`absolute lg:${item.top} right-25 overflow-hidden -top-12 `}
                />
              )}
              <p className="lg:text-[2rem] text-[1.5rem] font-bold pt-3">
                {item.title}
              </p>
              <span className="font-medium lg:text-lg text-sm">
                {item.title === "آگهی فعال"
                  ? `شما ${employerInfo?.active} آگهی فعال دارید`
                  : item.title === "آگهی غیر فعال"
                  ? `شما ${employerInfo?.deactive} آگهی غیرفعال دارید`
                  : item.title === " استخدام شده"
                  ? `شما ${employerInfo?.employed} نفر استخدام شده دارید`
                  : item.sub === "support"
                  ? `شما ${employerInfo?.activeTickets} تیکت فعال دارید`
                  : item.title === "برنامه نویس" || item.title === "عضویت"
                  ? item.sub
                  : item.subtitle === ""
                  ? membership + " " + "روز"
                  : item.subtitle}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PanelCards;
