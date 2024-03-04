import CostumSlider from "@/components/homepage-components/costum-slider/costum-slider";
import Footer from "@/components/homepage-components/footer";
import Nav from "@/components/homepage-components/nav";
import Reasons from "@/components/homepage-components/reason";
import SliderOne from "@/components/homepage-components/slider-one";
import SliderTwo from "@/components/homepage-components/slider-two";
import Support from "@/components/homepage-components/support";
import Technologie from "@/components/homepage-components/technologie";
import Intro from "@/components/new-home-components/intro";
import IntroStatistics from "@/components/new-home-components/intro-statistics";
import Order from "@/components/new-home-components/order";
import OrderProgress from "@/components/new-home-components/order-progress";
import Plans from "@/components/new-home-components/plans";
import Reason from "@/components/new-home-components/reason";
import Script from "next/script";

export default function Home() {
  return (
    // className=" bg-blue-100"
    <div className="bg-[#EAEFF6]">
      <Script src="/navachat.js" async />
      <Nav />
      <main className="">
        <div className="flex flex-col w-[80%] mx-auto my-[3%]">
          <Intro />
          <IntroStatistics />
          <Plans />
          <Reason />
          <Order />
          {/* <SliderOne />
          <SliderTwo />
          <Technologie />
          <Reasons />
          <Support />
          <CostumSlider /> */}
        </div>
      </main>
      <Footer />
    </div>
  );
}
