"use client";
import React, { FormEvent, useEffect, useState } from "react";
import PanelFields from "../components/panel-fileds";
import SubmitOrderDropdown from "./components/submit-order-dropdown";
import SubmitOrderModalfield from "./components/submit-order-modalfield";
import SubmitOrderDescription from "./components/submit-order-description";
import FileUpload from "./components/file-upload";
import OrdersubmissionModal from "./components/odersubmission-modal";

function SubmitOrder() {
  const [projectFields, setProjectFields] = useState({
    title: "",
    type: "",
    plan: "",
    budget: "",
    Similar_Site: "",
    Description: "",
    Templates: "",
    Colors: "",
  });
  const [similarSiteData, setSimilarSiteData] = useState<string[]>([]);
  const [modalInputValue, setModalInputValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const parseJSON = (jsonString: any) => {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      return {};
    }
  };
  return (
    <div className="py-[3%] w-[90%] shadow mx-auto bg-white rounded-2xl px-[3%] grid grid-cols-1 gap-5 relative">
      <OrdersubmissionModal
        showModal={showModal}
        setShowModal={setShowModal}
        data={similarSiteData}
        setData={setSimilarSiteData}
        modalInputValue={modalInputValue}
        setModalInputValue={setModalInputValue}
      />
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
        setShowModal={setShowModal}
      />
      <SubmitOrderDescription
        value={projectFields.Description}
        onChange={(e) =>
          setProjectFields((last) => ({ ...last, Description: e.target.value }))
        }
      />
      <SubmitOrderModalfield
        modalFieldTitle="قالب و افزونه های مورد نیاز:"
        setShowModal={setShowModal}
      />
      <SubmitOrderModalfield
        modalFieldTitle="رنگ سازمانی:"
        setShowModal={setShowModal}
      />
      <div className="flex justify-between">
        <FileUpload />
        <button className="bg-[#4866CE] text-white rounded-lg p-1">
          درخواست مشاوره رایگان
        </button>
      </div>
    </div>
  );
}

export default SubmitOrder;
