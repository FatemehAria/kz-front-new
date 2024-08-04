"use client";
import React, { useEffect, useState } from "react";
import PanelFields from "../../components/panel-fileds";
import SubmitOrderDropdown from "./components/submit-order-dropdown";
import SubmitOrderModalfield from "./components/submit-order-modalfield";
import SubmitOrderDescription from "./components/submit-order-description";
import FileUpload from "./components/file-upload";
import OrdersubmissionModal from "./components/odersubmission-modal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import { Bounce, toast } from "react-toastify";
import Link from "next/link";

function SubmitOrder() {
  const { localToken, localUserId } = useSelector(
    (state: any) => state.userData
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIdFromLocal());
    dispatch(getTokenFromLocal());
  }, []);

  const [File, setFile] = useState<any>(null);
  const [similarSiteData, setSimilarSiteData] = useState<string[]>([]);
  const [templatesData, setTemplatesData] = useState<string[]>([]);
  const [colorsData, setColorsData] = useState<string[]>([]);
  const [modalInputValue, setModalInputValue] = useState("");
  const [showSimilarModal, setShowSimilarModal] = useState(false);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);
  const [showColorsModal, setShowColorsModal] = useState(false);
  const [projectFields, setProjectFields] = useState({
    title: "",
    type: "",
    plan: "",
    budget: "",
    Similar_Site: similarSiteData,
    Description: "",
    Templates: templatesData,
    Colors: colorsData,
  });
  const handleBudegtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");
    const formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setProjectFields((last) => ({ ...last, budget: formattedValue }));
  };
  const SubmitProject = async (
    title: string,
    type: string,
    plan: string,
    budget: string,
    Similar_Site: string,
    Description: string,
    Templates: string,
    Colors: string
  ) => {
    try {
      const { data } = await axios.post(
        `https://keykavoos.liara.run/Client/SubmitProject/${localUserId}`,
        {
          title,
          type,
          plan,
          budget,
          Similar_Site,
          Description,
          Templates,
          Colors,
        },
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        }
      );
      toast.success("پروژه با موفقیت ثبت شد.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        rtl: true,
      });
    } catch (error) {
      toast.error("خطا در ثبت پروژه.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        rtl: true,
      });
    }
  };
  const handleFileChange = (file: File) => {
    setFile(file);
  };
  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("File", File);
    try {
      const { data } = await axios.post(
        `https://keykavoos.liara.run/Client/UploadFileSubmit/${localUserId}`,
        formData,
        {
          headers: {
            authorization: `Bearer ${localToken}`,
          },
        }
      );
      toast.success("آپلود فایل موفق بود.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        rtl: true,
      });
    } catch (error) {
      toast.error("خطا در آپلود فایل، لطفا مجدد آپلود کنید.", {
        position: "top-right",
        autoClose: 3000,
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
  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (File) {
      Promise.all([
        await SubmitProject(
          projectFields.title,
          projectFields.type,
          projectFields.plan,
          projectFields.budget.replaceAll(",", ""),
          JSON.stringify(similarSiteData),
          projectFields.Description,
          JSON.stringify(templatesData),
          JSON.stringify(colorsData)
        ),
        await handleFileUpload(),
      ]);
    } else {
      await SubmitProject(
        projectFields.title,
        projectFields.type,
        projectFields.plan,
        projectFields.budget.replaceAll(",", ""),
        JSON.stringify(similarSiteData),
        projectFields.Description,
        JSON.stringify(templatesData),
        JSON.stringify(colorsData)
      );
    }
  };
  return (
    // w-[90%]
    <form
      onSubmit={(e) => handleSubmission(e)}
      className="py-[3%] w-[100%] shadow mx-auto bg-white rounded-2xl px-[3%] grid grid-cols-1 gap-5 relative"
    >
      {showSimilarModal && (
        <OrdersubmissionModal
          showModal={showSimilarModal}
          data={similarSiteData}
          setData={setSimilarSiteData}
          modalInputValue={modalInputValue}
          setModalInputValue={setModalInputValue}
          setShowModal={setShowSimilarModal}
        />
      )}
      {showTemplatesModal && (
        <OrdersubmissionModal
          showModal={showTemplatesModal}
          data={templatesData}
          setData={setTemplatesData}
          modalInputValue={modalInputValue}
          setModalInputValue={setModalInputValue}
          setShowModal={setShowTemplatesModal}
        />
      )}
      {showColorsModal && (
        <OrdersubmissionModal
          showModal={showColorsModal}
          data={colorsData}
          setData={setColorsData}
          modalInputValue={modalInputValue}
          setModalInputValue={setModalInputValue}
          setShowModal={setShowColorsModal}
        />
      )}
      <div className="grid grid-cols-2 gap-3">
        <PanelFields
          label="عنوان پروژه:"
          onChange={(e) =>
            setProjectFields((last) => ({ ...last, title: e.target.value }))
          }
          value={projectFields.title}
          name="title"
        />
        <SubmitOrderDropdown
          dropDownTitle="نوع پروژه:"
          dropdownItems={["فروشگاهی", "شرکتی ", "پنل سازمانی"]}
          value={projectFields.type}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setProjectFields((last) => ({ ...last, type: e.target.value }))
          }
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <SubmitOrderDropdown
          dropDownTitle="پلن انتخابی:"
          dropdownItems={["وردپرس ", "برنامه نویسی اختصاصی "]}
          value={projectFields.plan}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setProjectFields((last) => ({ ...last, plan: e.target.value }))
          }
        />
        <PanelFields
          label="بودجه مورد نظر: (برحسب تومان)"
          onChange={handleBudegtChange}
          value={projectFields.budget}
          name="budget"
        />
      </div>
      <SubmitOrderModalfield
        modalFieldTitle="سایت مشابه مورد نظر شماست:"
        setShowModal={setShowSimilarModal}
        data={similarSiteData}
        setData={setSimilarSiteData}
      />
      <SubmitOrderDescription
        value={projectFields.Description}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setProjectFields((last) => ({ ...last, Description: e.target.value }))
        }
      />
      <SubmitOrderModalfield
        modalFieldTitle="قالب و افزونه های مورد نیاز:"
        setShowModal={setShowTemplatesModal}
        data={templatesData}
        setData={setTemplatesData}
      />
      <SubmitOrderModalfield
        modalFieldTitle="رنگ سازمانی:"
        setShowModal={setShowColorsModal}
        data={colorsData}
        setData={setColorsData}
      />
      <div className="flex justify-between">
        <FileUpload File={File} handleChange={handleFileChange} />
        <div className="flex gap-5">
          <Link href={`/panel/user/submit-order/consultation`} className="bg-[#4866CE] text-white rounded-lg p-1 whitespace-nowrap flex justify-center items-center">
            <span>درخواست مشاوره رایگان</span>
          </Link>
          <button className="bg-[#4866CE] text-white rounded-lg p-1 w-[80px] flex justify-center items-center">
            <span>ثبت</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default SubmitOrder;
