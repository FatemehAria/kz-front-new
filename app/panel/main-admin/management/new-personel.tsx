import React from "react";
import InfoFields from "../../components/info-fields";

const NewPersonel = () => {
  return (
    <div className="px-[8%]">
      <form className="grid grid-cols-1 gap-[7%]">
        {/* نام نام خانوادگی */}
        <div className="grid grid-cols-2 gap-[3%]">
          <InfoFields info="" title="نام" type="text" />
          <InfoFields info="" title="نام خانوادگی" type="text" />
        </div>
        {/* معرف کدملی سمت */}
        <div className="grid grid-cols-2 gap-[3%]">
          <InfoFields info="" title="معرف" type="text" />
          <InfoFields info="" title="کدملی" type="text" />
        </div>
        <div className="grid grid-cols-2 gap-[3%]">
          <InfoFields info="" title="سمت" type="text" />
          <InfoFields info="" title="شماره تماس" type="text" />
        </div>
        {/*شماره تماس */}
        {/* ساعت کاری شروع پایان */}
        <div className="grid grid-cols-2 gap-[3%]">
          <InfoFields info="" title="شروع" type="text" />
          <InfoFields info="" title="پایان" type="text" />
        </div>
        <div className="grid grid-cols-2 gap-[1%]">
          <InfoFields info="" title=" ساعت کاری" type="text" />
          <InfoFields info="" title="دستمزد هر روز" type="text" />
        </div>
        <div className="grid grid-cols-2 gap-[3%]">
          <InfoFields info="" title="قرارداد" type="text" />
          <InfoFields info="" title="آدرس" type="text" />
        </div>

        <div className="grid grid-cols-2 gap-[3%]">
          <div className="flex flex-row items-center gap-[5%]">
            <label className="whitespace-nowrap">تصویر کارت ملی:</label>
            <input
              id="fileInput"
              type="file"
              // onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label
              htmlFor="fileInput"
              style={{ cursor: "pointer" }}
              className="bg-[#EDF0FB] rounded-lg w-full p-[2%] text-center"
            >
              افزودن فایل
              {/* {selectedFile ? selectedFile.name : "افزودن فایل"} */}
            </label>
          </div>

          <div className="flex flex-row items-center gap-[5%]">
            <label className="whitespace-nowrap">تصویر پشت کارت ملی:</label>
            <input
              id="fileInput"
              type="file"
              // onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label
              htmlFor="fileInput"
              style={{ cursor: "pointer" }}
              className="bg-[#EDF0FB] rounded-lg w-full p-[2%] text-center"
            >
              افزودن فایل
              {/* {selectedFile ? selectedFile.name : "افزودن فایل"} */}
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[5%]">
          <div className="flex flex-row items-center gap-[9%]">
            <label className="whitespace-nowrap">عکس:</label>
            <input
              id="fileInput"
              type="file"
              // onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label
              htmlFor="fileInput"
              style={{ cursor: "pointer" }}
              className="bg-[#EDF0FB] rounded-lg w-full p-[2%] text-center"
            >
              افزودن فایل
              {/* {selectedFile ? selectedFile.name : "افزودن فایل"} */}
            </label>
          </div>

          <div className="flex flex-row items-center gap-[8%]">
            <label className="whitespace-nowrap">تصاویر شناسنامه:</label>
            <input
              id="fileInput"
              type="file"
              // onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label
              htmlFor="fileInput"
              style={{ cursor: "pointer" }}
              className="bg-[#EDF0FB] rounded-lg p-[2%] w-full text-center whitespace-nowrap"
            >
              افزودن فایل
              {/* {selectedFile ? selectedFile.name : "افزودن فایل"} */}
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[5%]">
          <div className="flex flex-row items-center gap-[5%]">
            <label className="whitespace-nowrap">فرم بیمه:</label>
            <input
              id="fileInput"
              type="file"
              // onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label
              htmlFor="fileInput"
              style={{ cursor: "pointer" }}
              className="bg-[#EDF0FB] rounded-lg p-[2%] w-full text-center whitespace-nowrap"
            >
              افزودن فایل
              {/* {selectedFile ? selectedFile.name : "افزودن فایل"} */}
            </label>
          </div>
        </div>

        <button className="bg-[#8BA4FF] flex w-[100px] justify-center items-center rounded-lg py-1">
          تایید اطلاعات
        </button>
      </form>
    </div>
  );
};

export default NewPersonel;
