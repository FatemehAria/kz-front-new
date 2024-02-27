import React from "react";
import JobCard from "./components/job-card";

const Job = () => {
  return (
    <div className="lg:w-[90%] mx-auto rounded-xl px-[2%] grid grid-cols-1 gap-[5%] justify-center lg:bg-profileBorderbg">
      <img
        src="/in-hand/inhand.svg"
        alt="in-hand"
        className="w-[100%] mx-auto"
      />
    </div>
  );
};

export default Job;

{
  /* <div className="bg-white flex flex-col gap-[3%] p-[3%]">
  <JobCard />
  <JobCard />
  <div className="text-center">
    <button className="bg-[#4866CF] text-white p-[1%] rounded-3xl">فرصت های بیشتر</button>
  </div>
</div> */
}
