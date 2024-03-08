import Footer from "@/components/homepage-components/footer";
import Nav from "@/components/homepage-components/nav";
import Intro from "@/components/new-home-components/intro";
import IntroStatistics from "@/components/new-home-components/intro-statistics";
import News from "@/components/new-home-components/news";
import Order from "@/components/new-home-components/order";
import Plans from "@/components/new-home-components/plans";
import Reason from "@/components/new-home-components/reason";
import Script from "next/script";

export default function Home() {
  return (
    // className=" bg-blue-100"
    <div className="bg-[#EAEFF6]">
      <Script src="/navachat.js" async />
      <Nav />
      <main className="flex flex-col w-[80%] mx-auto my-[3%]">
        <Intro />
        <IntroStatistics />
        <Plans />
        <Reason />
        <Order />
        <News />
      </main>
      <Footer />
    </div>
  );
}
