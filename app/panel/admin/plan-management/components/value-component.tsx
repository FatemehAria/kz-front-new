"use client";
import { createNewPlanValue, getPlanValues } from "@/utils/utils";
import { useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PlanContext } from "../context/PlanContext";
import { ValueIdContext } from "../context/ValueIdContext";
import { FaCheck } from "react-icons/fa6";
type ValueComponentProps = {
  addAtrrAndValue: {
    addAttr: {
      add: boolean;
      attrTitle: string;
      attrDesc: string;
    };
    addValue: {
      add: boolean;
      valueTitle: string;
      valueDesc: string;
    };
  };
  setEditAttrAndValue: React.Dispatch<
    React.SetStateAction<{
      editAttr: {
        showEditField: boolean;
        editTitle: string;
        editDesc: string;
      };
      editValue: {
        showEditField: boolean;
        editTitle: string;
        editDesc: string;
      };
    }>
  >;
  setAddAttrAndValue: React.Dispatch<
    React.SetStateAction<{
      addAttr: {
        add: boolean;
        attrTitle: string;
        attrDesc: string;
      };
      addValue: {
        add: boolean;
        valueTitle: string;
        valueDesc: string;
      };
    }>
  >;
  planValues: ValueType[];
};
export type ValueType = {
  id: number;
  title: string;
};
function ValueComponent({
  addAtrrAndValue,
  setEditAttrAndValue,
  setAddAttrAndValue,
  planValues,
}: ValueComponentProps) {
  const { token } = useSelector((state: any) => state.userData);
  const params = useSearchParams();
  const planId = params.get("id");
  const { setValueId, valueId } = useContext(ValueIdContext);
  const { attrId } = useContext(PlanContext);
  const [planValue, setPlanValue] = useState("");
  const handleValueSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createNewPlanValue(
      Number(attrId),
      Number(planId),
      token,
      planValue,
      planValue
    );
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlanValue(e.target.value);
  };

  return (
    <form onSubmit={(e) => handleValueSubmission(e)}>
      <input
        value={
          planValue
          //   : item.title
        }
        onChange={(e) => changeHandler(e)}
        className={`${
          valueId === attrId
            ? "bg-white"
            : "bg-[#EAEFF6] caret-transparent cursor-default text-center"
        } outline-none`}
      />
      <button>
        <FaCheck className="text-green-600 text-lg" />
      </button>
    </form>
  );
}

export default ValueComponent;
