"use client";
import React, { useContext, useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { FaCheck, FaPlus } from "react-icons/fa6";
import { AiOutlineEdit } from "react-icons/ai";
import {
  deletePlanAttr,
  getPlanAttrs,
  getPlanDetail,
  getPlanValues,
  restorePlanAttr,
  showPlanAttrInfo,
  updatePlanAttr,
} from "@/utils/utils";
import { PlanAttrType } from "../plan-detail/page";
import ValueComponent, { ValueType } from "./value-component";
import { createActionCreatorInvariantMiddleware } from "@reduxjs/toolkit";
import { AttrIdContext } from "../context/AttrIdContext";

type AttrEditionProps = {
  token: string;
  planId: string | null;
  editAttrAndValue: {
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
};

function AttrEdition({
  token,
  planId,
  editAttrAndValue,
  setEditAttrAndValue,
  addAtrrAndValue,
  setAddAttrAndValue,
}: AttrEditionProps) {
  const [attrIsDeleted, setAttrIsDeleted] = useState(false);
  const [planAttrs, setPlanAttrs] = useState<PlanAttrType[]>([]);
  const [planValues, setPlanValues] = useState<ValueType[]>([]);
  const [planValue, setPlanValue] = useState("");
  const { setAttrId, attrId } = useContext(AttrIdContext);
  useEffect(() => {
    getPlanAttrs(token, setPlanAttrs);
  }, [addAtrrAndValue.addAttr]);

  useEffect(() => {
    getPlanValues(token, setPlanValues);
  }, [addAtrrAndValue.addValue]);

  const handleAddingValue = (id: number) => {
    setAttrId(String(id));
    setAddAttrAndValue((last) => ({
      ...last,
      addValue: { ...last.addValue, add: true },
    }));
  };

  return (
    <div className="bg-white shadow mx-auto rounded-2xl w-full p-[3%] text-center">
      <div className={`grid grid-cols-4`}>
        <div>نام ویژگی</div>
        <div>توضیحات ویژگی</div>
        <div>مقدار ویژگی</div>
        <div>عملیات</div>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {planAttrs.map((item) => (
          <div
            className={`${
              attrIsDeleted && item.deleted_at ? "bg-red-300" : "bg-[#EAEFF6]"
            } grid grid-cols-4 gap-x-5 text-center py-1 rounded-[4px] cursor-pointer`}
            key={item.id}
          >
            <input
              value={item?.title}
              readOnly={true}
              className="bg-[#EAEFF6] caret-transparent cursor-default text-center"
            />
            <input
              value={item?.description}
              readOnly={true}
              className="bg-[#EAEFF6] caret-transparent cursor-default text-center"
            />
            <p>
              {item.values?.length > 0
                ? item.values
                    .filter(
                      (val: { attr_id: number }) => val.attr_id === item.id
                    )
                    .map((item: { title: string }) => item.title)[0]
                : "-"}
            </p>
            <div className="flex flex-row items-center justify-center gap-3">
              <span
                onClick={() =>
                  deletePlanAttr(item?.id, token, setAttrIsDeleted)
                }
                className="flex justify-center"
              >
                <RxCross1 className="text-red-600 text-lg" />
              </span>
              <span
                onClick={() =>
                  restorePlanAttr(item.id, token, setAttrIsDeleted)
                }
              >
                <MdOutlineSettingsBackupRestore className="text-yellow-600 text-lg" />
              </span>
              <span onClick={() => handleAddingValue(item?.id)}>
                <FaPlus />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AttrEdition;
