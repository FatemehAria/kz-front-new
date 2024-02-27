import React from 'react'

const ChangeCoursesBackend = () => {
  return (
    <div className="bg-[#D9D9D933] w-[90%] mx-auto py-[2%] px-[2%] rounded-lg">
      <form className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <label>نام دوره:</label>
            <input className="bg-[#9DACDF] rounded-md" />
          </div>
          <p className="text-left">
            حذف دوره:<span>❌</span>
          </p>
        </div>
        <div className="flex flex-row">
          <label>ویژگی 1:</label>
          <input className="bg-[#9DACDF] rounded-md" />
        </div>
        <div className="flex flex-row">
          <label>آیکون 1:</label>
          <input className="bg-[#9DACDF] rounded-md" />
        </div>
        <div className="flex flex-row">
          <label>ویژگی 2:</label>
          <input className="bg-[#9DACDF] rounded-md" />
        </div>
        <div className="flex flex-row">
          <label>آیکون 2:</label>
          <input className="bg-[#9DACDF] rounded-md" />
        </div>
        <div className="flex flex-row">
          <label>متن:</label>
          <input className="bg-[#9DACDF] rounded-md" />
        </div>
        <div className="flex flex-row">
          <label>ساعت:</label>
          <input className="bg-[#9DACDF] rounded-md" />
        </div>
        <div className="flex flex-row">
          <label>تعداد دانش پژوه:</label>
          <input className="bg-[#9DACDF] rounded-md" />
        </div>
        <div className="flex flex-row">
          <label>ستاره:</label>
          <input className="bg-[#9DACDF] rounded-md" />
        </div>
        <div className="flex flex-row">
          <label>مطالب:</label>
          <input className="bg-[#9DACDF] h-[200px] rounded-md" />
        </div>
        <div className="flex flex-row">
          <label>مباحث:</label>
          <input className="bg-[#9DACDF] rounded-md" />
        </div>
        <div className="flex flex-row">
          <label>مدرس:</label>
          <input className="bg-[#9DACDF] rounded-md" />
        </div>

        <div className="flex flex-row justify-between text-white">
          <button className="bg-[#9DACDF] w-[100px] rounded-lg py-1">
            تایید ادیت
          </button>
          <button className="bg-[#9DACDF] w-[100px] rounded-lg py-1">
            کلمه کلیدی
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChangeCoursesBackend