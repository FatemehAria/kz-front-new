import React from "react";
import PanelFields from "../components/panel-fileds";
import SubmitOrderDropdown from "./components/submit-order-dropdown";
import SubmitOrderModalfield from "./components/submit-order-modalfield";
import SubmitOrderDescription from "./components/submit-order-description";

function SubmitOrder() {
  return (
    <div className="py-[3%] w-[90%] shadow mx-auto bg-white rounded-2xl px-[3%]">
      <PanelFields label="عنوان پروژه:" />
      <SubmitOrderDropdown dropDownTitle="نوع پروژه:" />
      <SubmitOrderDropdown dropDownTitle="پلن انتخابی:" />
      <PanelFields label="بودجه مورد نظر:" />
      <SubmitOrderModalfield modalFieldTitle="سایت مشابه مورد نظر شماست:" />
      <SubmitOrderDescription />
    </div>
  );
}

export default SubmitOrder;
