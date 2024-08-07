"use client";
import React, { useContext, useEffect, useState } from "react";
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
import {
  createProject,
  createProjectColor,
  createProjectPlugin,
  createProjectSimilars,
  createProjectTemplate,
  uploadProjectFile,
} from "@/utils/utils";
import { UserContext } from "../../admin/context/user-context/UserContext";
import ColorSubmissionModal from "./components/color-submission-modal";
import SubmitColorModalfield from "./components/submit-colors-modalfield";
import SubmitPluginModalfield from "./components/submit-plugin-modalfield";
import PluginSubmissionModal from "./components/plugin-submission-modal";
import TemplateSubmissionModal from "./components/template-sumission-modal";
import SubmitTemplateModalfield from "./components/submit-template-modalfield";

function SubmitOrder() {
  const { token, userProfile } = useSelector((state: any) => state.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIdFromLocal());
    dispatch(getTokenFromLocal());
  }, []);

  const [File, setFile] = useState<any>(null);
  const [templatesData, setTemplatesData] = useState<
    { template_name: string }[]
  >([]);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);
  const [templateModalInputValue, setTemplateModalInputValue] = useState({
    template_name: "",
  });
  const [pluginData, setPluginData] = useState<
    {
      plugin_name: string;
    }[]
  >([
    {
      plugin_name: "",
    },
  ]);
  const [pluginModalInputValue, setPluginModalInputValue] = useState({
    plugin_name: "",
  });
  const [showPluginModal, setShowPluginModal] = useState(false);
  const [colorsData, setColorsData] = useState<
    {
      title: string;
      color: string;
    }[]
  >([
    {
      title: "",
      color: "",
    },
  ]);

  const [colorsModalInputValue, setColorsModalInputValue] = useState({
    title: "",
    color: "",
  });
  const [showColorsModal, setShowColorsModal] = useState(false);
  const [similarSiteData, setSimilarSiteData] = useState<
    { title: string; url: string }[]
  >([{ title: "", url: "" }]);
  const [similarSiteModalInputValue, setSimilarSiteModalInputValue] = useState({
    title: "",
    url: "",
  });
  const [showSimilarModal, setShowSimilarModal] = useState(false);
  const [projectFields, setProjectFields] = useState({
    title: "",
    type: "1",
    plan: "",
    budget: "",
    Similar_Site: similarSiteData,
    Description: "",
    Templates: templatesData,
    Colors: colorsData,
  });
  const price = 3000;
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
    Promise.all([
      await createProjectColor(
        token,
        colorsModalInputValue.title,
        colorsModalInputValue.color,
        null
      ),
      // await createProjectSimilars(
      //   token,
      //   similarSiteModalInputValue.title,
      //   similarSiteModalInputValue.url,
      //   null
      // ),
      // await createProjectPlugin(token, pluginModalInputValue.plugin_name, null),
      // await createProjectTemplate(
      //   token,
      //   templateModalInputValue.template_name,
      //   null
      // ),
      // await createProject(
      //   token,
      //   projectFields.title,
      //   projectFields.Description,
      //   Number(projectFields.type),
      //   Number(projectFields.budget.replaceAll(",", "")),
      //   price,
      //   Number(projectFields.plan),
      //   userProfile.id,
      //   JSON.stringify(similarSiteData),
      //   JSON.stringify(templatesData),
      //   JSON.stringify(colorsData)
      // ),
    ]);
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
