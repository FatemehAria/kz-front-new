import Footer from "@/components/home-components/Footer";
import Nav from "@/components/home-components/nav";
import Intro from "@/components/home-components/intro";
import IntroStatistics from "@/components/home-components/intro-statistics";
import News from "@/components/home-components/news";
import Order from "@/components/home-components/order";
import Plans from "@/components/home-components/plans";
import Reason from "@/components/home-components/reason";
import Script from "next/script";
import Technology from "@/components/home-components/technology";

export default function Home() {
  return (
    <div className="bg-[#EAEFF6]">
      <Script src="/navachat.js" async />
      <Nav />
      <main className="flex flex-col w-[80%] mx-auto my-[3%]">
        <Intro />
        <IntroStatistics />
        <Plans />
        <Technology />
        <Reason />
        {/* <Order /> */}
        <News />
      </main>
      <Footer />
    </div>
  );
}
