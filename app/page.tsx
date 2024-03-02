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
import Plans from "@/components/new-home-components/plans";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <Script src="/navachat.js" async />
      <Nav />
      <main className="font-YekanBakh">
        <div className="flex flex-col gap-10 w-[80%] mx-auto">
          <Intro />
          <IntroStatistics />
          <Plans />
          {/* <SliderOne />
          <SliderTwo />
          <Technologie />
          <Reasons />
          <Support />
          <CostumSlider /> */}
        </div>
      </main>
      <Footer />
    </>
  );
}
