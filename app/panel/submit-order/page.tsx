"use client";
import React, { useState } from "react";
import PanelFields from "../components/panel-fileds";
import SubmitOrderDropdown from "./components/submit-order-dropdown";
import SubmitOrderModalfield from "./components/submit-order-modalfield";
import SubmitOrderDescription from "./components/submit-order-description";
import FileUpload from "./components/file-upload";

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
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="py-[3%] w-[90%] shadow mx-auto bg-white rounded-2xl px-[3%] grid grid-cols-1 gap-5">
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
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <SubmitOrderDropdown
          dropDownTitle="پلن انتخابی:"
          dropdownItems={["وردپرس ", "برنامه نویسی اختصاصی "]}
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
      <SubmitOrderModalfield modalFieldTitle="سایت مشابه مورد نظر شماست:" />
      <SubmitOrderDescription />
      <SubmitOrderModalfield modalFieldTitle="قالب و افزونه های مورد نیاز:" />
      <SubmitOrderModalfield modalFieldTitle="رنگ سازمانی:" />
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
