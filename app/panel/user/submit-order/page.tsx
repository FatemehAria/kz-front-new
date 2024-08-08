"use client";
import React, { useContext, useEffect, useState } from "react";
import PanelFields from "../../components/panel-fileds";
import SubmitOrderDropdown from "./components/submit-order-dropdown";
import SubmitOrderModalfield from "./components/submit-order-modalfield";
import SubmitOrderDescription from "./components/submit-order-description";
import OrdersubmissionModal from "./components/odersubmission-modal";
import { useSelector } from "react-redux";
import Link from "next/link";
import { createProject } from "@/utils/utils";
import ColorSubmissionModal from "./components/color-submission-modal";
import SubmitColorModalfield from "./components/submit-colors-modalfield";
import SubmitPluginModalfield from "./components/submit-plugin-modalfield";
import PluginSubmissionModal from "./components/plugin-submission-modal";
import TemplateSubmissionModal from "./components/template-sumission-modal";
import SubmitTemplateModalfield from "./components/submit-template-modalfield";
import { OrderSubmissionContext } from "../../context/order-submission-contexts/OrderSubmissionContext";

export type PlanType = {
  plan: { id?: number; title: string; description: string; price: number };
};
export type SimilarSiteType = { title: string; url: string; id?: number };
export type ColorType = { title: string; color: string };
export type TemplateType = { template_name: string };
export type PluginType = { plugin_name: string };

function SubmitOrder() {
  const { token, userProfile } = useSelector((state: any) => state.userData);
  const { allPlans, setAllPlans, siteTypes, setSiteTypes } = useContext(
    OrderSubmissionContext
  );
  useEffect(() => {
    if (typeof window !== "undefined") {
      const localPlans = JSON.parse(
        window.localStorage.getItem("plans") as string
      );
      const localSiteTypes = JSON.parse(
        window.localStorage.getItem("site-types") as string
      );
      setSiteTypes(localSiteTypes);
      setAllPlans(localPlans);
    }
  }, []);

  const [File, setFile] = useState<any>(null);
  const [similarSiteData, setSimilarSiteData] = useState<SimilarSiteType[]>([
    { title: "", url: "" },
  ]);
  const [similarSiteModalInputValue, setSimilarSiteModalInputValue] = useState({
    title: "",
    url: "",
  });
  const [showSimilarModal, setShowSimilarModal] = useState(false);
  const [templatesData, setTemplatesData] = useState<TemplateType[]>([]);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);
  const [templateModalInputValue, setTemplateModalInputValue] = useState({
    template_name: "",
  });
  const [showPluginModal, setShowPluginModal] = useState(false);
  const [pluginData, setPluginData] = useState<PluginType[]>([
    {
      plugin_name: "",
    },
  ]);
  const [pluginModalInputValue, setPluginModalInputValue] = useState({
    plugin_name: "",
  });
  const [showColorsModal, setShowColorsModal] = useState(false);
  const [colorsData, setColorsData] = useState<ColorType[]>([
    {
      title: "",
      color: "",
    },
  ]);
  const [colorsModalInputValue, setColorsModalInputValue] = useState({
    title: "",
    color: "",
  });
  const planTitlesAndDescs = allPlans.map((item) => item.plan.title);
  const siteTypeTitles = siteTypes.map((item: SimilarSiteType) => item.title);
  const [projectFields, setProjectFields] = useState({
    title: "",
    // نوع پروژه(طراحی) /types
    type: "",
    // پلن /plans
    plan: "",
    budget: "",
    priority: "",
    Similar_Site: similarSiteData,
    Description: "",
    Templates: templatesData,
    Colors: colorsData,
  });

  const plansId = allPlans.filter((item) =>
    projectFields.plan.includes(item.plan.title)
  )[0]?.plan.id;
  const typeId = siteTypes.filter(
    (item: SimilarSiteType) => item.title === projectFields.type
  )[0]?.id;

  const handleBudegtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");
    const formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setProjectFields((last) => ({ ...last, budget: formattedValue }));
  };

  const handleFileChange = (file: File) => {
    setFile(file);
  };

  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createProject(
      token,
      projectFields.title,
      projectFields.Description,
      Number(projectFields.budget.replaceAll(",", "")),
      null,
      projectFields.priority === "کم" ? "low" : "high",
      userProfile.id,
      Number(plansId),
      similarSiteData,
      colorsData,
      pluginData,
      templatesData
    );
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
          modalInputValue={similarSiteModalInputValue}
          setModalInputValue={setSimilarSiteModalInputValue}
          setShowModal={setShowSimilarModal}
        />
      )}
      {showTemplatesModal && (
        <TemplateSubmissionModal
          showModal={showTemplatesModal}
          data={templatesData}
          setData={setTemplatesData}
          modalInputValue={templateModalInputValue}
          setModalInputValue={setTemplateModalInputValue}
          setShowModal={setShowTemplatesModal}
        />
      )}
      {showColorsModal && (
        <ColorSubmissionModal
          showModal={showColorsModal}
          data={colorsData}
          setData={setColorsData}
          modalInputValue={colorsModalInputValue}
          setModalInputValue={setColorsModalInputValue}
          setShowModal={setShowColorsModal}
        />
      )}
      {showPluginModal && (
        <PluginSubmissionModal
          showModal={showPluginModal}
          data={pluginData}
          setData={setPluginData}
          modalInputValue={pluginModalInputValue}
          setModalInputValue={setPluginModalInputValue}
          setShowModal={setShowPluginModal}
        />
      )}
      <div className="grid grid-cols-2 gap-3">
        <div className="relative pt-3">
          <PanelFields
            label="عنوان پروژه:"
            onChange={(e) =>
              setProjectFields((last) => ({ ...last, title: e.target.value }))
            }
            value={projectFields.title}
            name="title"
          />
          <p className="absolute top-0 right-[5.5rem] text-[#4866CF]">*</p>
        </div>
        <div className="relative pt-3">
          <SubmitOrderDropdown
            dropDownTitle="اولویت پروژه:"
            dropdownItems={["کم", "زیاد"]}
            onChange={(e) =>
              setProjectFields((last) => ({
                ...last,
                priority: e.target.value,
              }))
            }
            value={projectFields.priority}
            name="priority"
          />
          <p className="absolute top-0 right-[5.5rem] text-[#4866CF]">*</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="relative pt-3">
          <SubmitOrderDropdown
            dropDownTitle="پلن انتخابی:"
            dropdownItems={planTitlesAndDescs}
            value={projectFields.plan}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setProjectFields((last) => ({ ...last, plan: e.target.value }))
            }
          />
          <p className="absolute top-0 right-[5.5rem] text-[#4866CF]">*</p>
        </div>
        <div className="relative pt-3">
          <SubmitOrderDropdown
            dropDownTitle="نوع پروژه:"
            dropdownItems={siteTypeTitles}
            value={projectFields.type}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setProjectFields((last) => ({ ...last, type: e.target.value }))
            }
          />
          <p className="absolute top-0 right-[5rem] text-[#4866CF]">*</p>
        </div>
      </div>
      <div className="relative pt-3">
        <PanelFields
          label="بودجه مورد نظر: (برحسب تومان)"
          onChange={handleBudegtChange}
          value={projectFields.budget}
          name="budget"
        />
        <p className="absolute top-0 right-[14rem] text-[#4866CF]">*</p>
      </div>
      <SubmitOrderModalfield
        modalFieldTitle="سایت مشابه مورد نظر شماست:"
        setShowModal={setShowSimilarModal}
        data={similarSiteData}
        setData={setSimilarSiteData}
      />
      <div className="relative pt-3">
        <SubmitOrderDescription
          value={projectFields.Description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setProjectFields((last) => ({
              ...last,
              Description: e.target.value,
            }))
          }
        />
        <p className="absolute top-0 right-[7rem] text-[#4866CF]">*</p>
      </div>
      <SubmitTemplateModalfield
        modalFieldTitle="قالب های مورد نیاز:"
        setShowModal={setShowTemplatesModal}
        data={templatesData}
        setData={setTemplatesData}
      />
      <SubmitPluginModalfield
        modalFieldTitle="پلاگ این های مورد نیاز:"
        setShowModal={setShowPluginModal}
        data={pluginData}
        setData={setPluginData}
      />
      <SubmitColorModalfield
        modalFieldTitle="رنگ سازمانی:"
        setShowModal={setShowColorsModal}
        data={colorsData}
        setData={setColorsData}
      />
      <div className="flex justify-end">
        {/* <FileUpload File={File} handleChange={handleFileChange} /> */}
        <div className="flex gap-5">
          <Link
            href={`/panel/user/submit-order/consultation`}
            className="bg-[#4866CE] text-white rounded-lg p-1 whitespace-nowrap flex justify-center items-center"
          >
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
