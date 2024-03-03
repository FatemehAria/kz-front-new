import React from "react";
const ProjectsData = [
  {
    id: 1,
    title: "پروژه یک",
    title1: "پروژه یک",
    title2: "پروژه یک",
    title3: "پروژه یک",
    title4: "پروژه یک",
  },
  {
    id: 2,
    title: "پروژه یک",
    title1: "پروژه یک",
    title2: "پروژه یک",
    title3: "پروژه یک",
    title4: "پروژه یک",
  },
];
function ProjectManagement() {
  return (
    <div className="bg-white p-[3%] shadow mx-auto rounded-2xl">
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-5 text-center">
          <p>ردیف</p>
          <p>عنوان پروژه</p>
          <p>وضعیت پیشرفت پروژه</p>
          <p>وضعیت مالی پروژه</p>
          <p>درخواست فاکتور</p>
        </div>
        {ProjectsData.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-5 text-center py-1 bg-[#EAEFF6] rounded-[4px]"
          >
            <p>{item.title}</p>
            <p>{item.title1}</p>
            <p>{item.title2}</p>
            <p>{item.title3}</p>
            <p>{item.title4}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectManagement;
