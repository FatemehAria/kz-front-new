import CostumSlider from "@/components/homepage-components/costum-slider/costum-slider";
import Reasons from "@/components/homepage-components/reason";
import SliderOne from "@/components/homepage-components/slider-one";
import SliderTwo from "@/components/homepage-components/slider-two";
import Support from "@/components/homepage-components/support";
import Technologie from "@/components/homepage-components/technologie";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <Script src="/navachat.js" async />
      <main className="font-YekanBakh">
        <div className="flex flex-col gap-10">
          <SliderOne />
          <SliderTwo />
          <Technologie />
          <Reasons />
          <Support />
          <CostumSlider />
        </div>
      </main>
    </>
  );
}
