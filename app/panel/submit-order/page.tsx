"use client";
import React, { FormEvent, useEffect, useState } from "react";
import PanelFields from "../components/panel-fileds";
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

function SubmitOrder() {
  const { localToken, localUserId } = useSelector(
    (state: any) => state.userData
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIdFromLocal());
    dispatch(getTokenFromLocal());
  }, []);
  const parseJSON = (jsonString: any) => {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      return {};
    }
  };
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
    Similar_Site: parseJSON(similarSiteData),
    Description: "",
    Templates: parseJSON(templatesData),
    Colors: parseJSON(colorsData),
  });
  // console.log("similarSiteData:", similarSiteData);
  // console.log("templatesData", templatesData);
  // console.log("colorsData", colorsData);

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
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await SubmitProject(
      projectFields.title,
      projectFields.type,
      projectFields.plan,
      projectFields.budget,
      JSON.stringify(projectFields.Similar_Site),
      projectFields.Description,
      JSON.stringify(projectFields.Templates),
      JSON.stringify(projectFields.Colors)
    );
  };
  return (
    <form
      onSubmit={(e) => handleSubmission(e)}
      className="py-[3%] w-[90%] shadow mx-auto bg-white rounded-2xl px-[3%] grid grid-cols-1 gap-5 relative"
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
          label="بودجه مورد نظر:"
          onChange={(e) =>
            setProjectFields((last) => ({ ...last, budget: e.target.value }))
          }
          value={projectFields.budget}
          name="budget"
        />
      </div>
      <SubmitOrderModalfield
        modalFieldTitle="سایت مشابه مورد نظر شماست:"
        setShowModal={setShowSimilarModal}
        data={similarSiteData}
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
      />
      <SubmitOrderModalfield
        modalFieldTitle="رنگ سازمانی:"
        setShowModal={setShowColorsModal}
        data={colorsData}
      />
      <div className="flex justify-between">
        <FileUpload />
        <button className="bg-[#4866CE] text-white rounded-lg p-1">
          درخواست مشاوره رایگان
        </button>
      </div>
    </form>
  );
}

export default SubmitOrder;
