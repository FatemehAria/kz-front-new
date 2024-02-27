import React, { useState } from "react";
import InfoFields from "../../components/info-fields";
import axios from "axios";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { Bounce, toast } from "react-toastify";
type MosaedeProps = {
  currentDate: string;
};
const initialValues = {
  Amount_String: "",
  Amount_Number: "",
  Position: "",
  FirstName: "",
  LastName: "",
  Service_location: "",
  text: "",
};
const Mosaede = ({ currentDate }: MosaedeProps) => {
  const { localToken } = useSelector((state: any) => state.userRole);
  const SubmitMosaedeByAdmin = async (
    Amount_String: string,
    Amount_Number: number | string,
    Position: string,
    FirstName: string,
    LastName: string,
    Service_location: string,
    text: string
  ) => {
    try {
      const { data } = await axios.post(
        "https://keykavoos.liara.run/Admin/Submit_Aid",
        {
          Amount_String,
          Amount_Number,
          Position,
          FirstName,
          LastName,
          Service_location,
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
    await SubmitMosaedeByAdmin(
      formik.values.Amount_String,
      formik.values.Amount_Number,
      formik.values.Position,
      formik.values.FirstName,
      formik.values.LastName,
      formik.values.Service_location,
      formik.values.text
    );
  };
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmission,
  });

  return (
    <div className="px-[5%] py-[2%] w-full">
      <p className="pb-[3%] font-semibold">فرم مساعده</p>
      <form className="grid grid-cols-1 gap-4" onSubmit={formik.handleSubmit}>
        <InfoFields
          info={currentDate}
          title="تاریخ درخواست"
          type="text"
          disable={true}
        />
        <InfoFields
          info={formik.values.Position}
          title="سمت"
          type="text"
          name="Position"
          onChange={formik.handleChange}
        />
        <InfoFields
          info={formik.values.FirstName}
          title="نام"
          type="text"
          name="FirstName"
          onChange={formik.handleChange}
        />
        <InfoFields
          info={formik.values.LastName}
          title="نام خانوادگی"
          type="text"
          name="LastName"
          onChange={formik.handleChange}
        />
        <InfoFields
          info={formik.values.Service_location}
          title="محل خدمت"
          type="text"
          name="Service_location"
          onChange={formik.handleChange}
        />
        <InfoFields
          info={formik.values.Amount_Number}
          title="مبلغ مساعده به عدد"
          type="text"
          name="Amount_Number"
          onChange={formik.handleChange}
        />
        <InfoFields
          info={formik.values.Amount_String}
          title="مبلغ مساعده به حروف"
          type="text"
          name="Amount_String"
          onChange={formik.handleChange}
        />
        <InfoFields
          info={formik.values.text}
          title="علت درخواست"
          type="text"
          name="text"
          onChange={formik.handleChange}
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

export default Mosaede;
