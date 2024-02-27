import React from "react";
import InfoFields from "../../components/info-fields";
import { useFormik } from "formik";
import axios from "axios";
import { useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";

type MorakhasiProps = {
  currentDate: string;
};
const initialValues = {
  position: "",
  FirstName: "",
  LastName: "",
  Vacation_Period: "",
  Type_of_leave: "",
  start_date: "",
  end_date: "",
  text: "",
};
const Morakhasi = ({ currentDate }: MorakhasiProps) => {
  const { localToken } = useSelector((state: any) => state.userRole);
  const SubmitMorakhasiByAdmin = async (
    position: string,
    FirstName: string,
    LastName: string,
    Vacation_Period: number | string,
    Type_of_leave: string,
    start_date: string,
    end_date: string,
    text: string
  ) => {
    try {
      const { data } = await axios.post(
        "https://keykavoos.liara.run/Admin/submit_Leave",
        {
          position,
          FirstName,
          LastName,
          Vacation_Period,
          Type_of_leave,
          start_date,
          end_date,
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        }
      );
      toast.success("اطلاعات با موفقیت ثبت شد.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        rtl: true,
      });
      console.log(data);
    } catch (error) {
      toast.error("ثبت اطلاعات ناموفق بود.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        rtl: true,
      });
      console.log(error);
    }
  };
  const handleSubmission = async () => {
    await SubmitMorakhasiByAdmin(
      formik.values.position,
      formik.values.FirstName,
      formik.values.LastName,
      formik.values.Vacation_Period,
      formik.values.Type_of_leave,
      formik.values.start_date,
      formik.values.end_date,
      formik.values.text
    );
  };
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmission,
  });
  return (
    <div className="px-[5%] py-[2%] w-full">
      <p className="pb-[3%] font-semibold">فرم مرخصی</p>
      <form className="grid grid-cols-1 gap-4" onSubmit={formik.handleSubmit}>
        {/* <div className="flex flex-row items-center"> */}
        <InfoFields
          info={currentDate}
          title="تاریخ درخواست"
          type="text"
          disable={true}
        />
        {/* <label className="whitespace-nowrap"></label>
          <input type="text" className="bg-[#9DACDF] rounded-lg py-[1%]" /> */}
        {/* </div> */}
        {/* <div className="flex flex-row items-center"> */}
        <InfoFields
          info={formik.values.position}
          title="سمت"
          type="text"
          name="position"
          onChange={formik.handleChange}
        />
        {/* <label className="whitespace-nowrap"></label>
          <input type="text" className="bg-[#9DACDF] rounded-lg py-[1%]" /> */}
        {/* </div> */}

        {/* <div className="flex flex-row items-center"> */}
        <InfoFields
          info={formik.values.FirstName}
          title="نام"
          type="text"
          onChange={formik.handleChange}
          name="FirstName"
        />
        {/* <label className="whitespace-nowrap">نام</label>
          <input type="text" className="bg-[#9DACDF] rounded-lg py-[1%]" /> */}
        {/* </div> */}
        {/* <div className="flex flex-row items-center"> */}
        <InfoFields
          info={formik.values.LastName}
          title="نام خانوادگی"
          type="text"
          name="LastName"
          onChange={formik.handleChange}
        />
        {/* <label className="whitespace-nowrap">نام خانوادگی</label>
          <input type="text" className="bg-[#9DACDF] rounded-lg py-[1%]" /> */}
        {/* </div> */}
        {/* <div className="flex flex-row items-center"> */}
        <InfoFields
          info={formik.values.Vacation_Period}
          title="مدت مرخصی"
          type="text"
          onChange={formik.handleChange}
          name="Vacation_Period"
        />
        {/* <label className="whitespace-nowrap">محل خدمت</label>
          <input type="text" className="bg-[#9DACDF] rounded-lg py-[1%]" /> */}
        {/* </div> */}

        {/* <div className="flex flex-row items-center"> */}
        <InfoFields
          info={formik.values.start_date}
          title="تاریخ شروع"
          type="text"
          name="start_date"
          onChange={formik.handleChange}
        />
        {/* <label className="whitespace-nowrap">مبلغ مساعده به عدد</label>
          <input type="text" className="bg-[#9DACDF] rounded-lg py-[1%]" /> */}
        {/* </div> */}
        {/* <div className="flex flex-row items-center"> */}
        <InfoFields
          info={formik.values.end_date}
          title="تاریخ پایان"
          type="text"
          onChange={formik.handleChange}
          name="end_date"
        />
        {/* <label className="whitespace-nowrap">مبلغ مساعده به حروف</label>
          <input type="text" className="bg-[#9DACDF] rounded-lg py-[1%]" /> */}
        {/* </div> */}

        {/* <div className="flex flex-row items-center"> */}
        <InfoFields
          info={formik.values.Type_of_leave}
          title="نوع درخواست"
          type="text"
          name="Type_of_leave"
          onChange={formik.handleChange}
        />
        {/* <label className="whitespace-nowrap">علت درخواست</label>
          <input type="text" className="bg-[#9DACDF] rounded-lg py-1" /> */}
        {/* </div> */}
        <InfoFields
          info={formik.values.text}
          title="علت درخواست"
          type="text"
          onChange={formik.handleChange}
          name="text"
        />
        <div className="flex flex-row justify-around">
          <p>امضا متقاضی</p>
          <p>تایید مدیر</p>
        </div>
        <button type="submit">ثبت درخواست</button>
      </form>
    </div>
  );
};

export default Morakhasi;
