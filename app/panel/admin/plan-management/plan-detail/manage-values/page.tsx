"use client";
import React, { useContext, useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { FaCheck, FaPlus } from "react-icons/fa6";
import { AiOutlineEdit } from "react-icons/ai";
import {
  deletePlanAttr,
  getPlanAttrs,
  getPlanValues,
  restorePlanAttr,
  updatePlanAttr,
} from "@/utils/utils";
import { createActionCreatorInvariantMiddleware } from "@reduxjs/toolkit";
import { PlanAttrType } from "../page";
import { PlanContext } from "../../context/PlanContext";
import { ValueType } from "../../components/value-component";
import { ValueIdContext } from "../../context/ValueIdContext";

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
function ManageValues({
  token,
  planId,
  editAttrAndValue,
  setEditAttrAndValue,
  addAtrrAndValue,
  setAddAttrAndValue,
}: ManageValuesProps) {
  const [attrIsDeleted, setAttrIsDeleted] = useState(false);
  const [planAttrs, setPlanAttrs] = useState<PlanAttrType[]>([]);
  const { setAttrId, attrId } = useContext(PlanContext);
  const [planValues, setPlanValues] = useState<ValueType[]>([]);
  const { setValueId, valueId } = useContext(ValueIdContext);
  const handlePlanEdit = async (id: number) => {
    const selectedPlan = planAttrs.find((item: PlanAttrType) => item.id === id);
    if (selectedPlan) {
      setPlanAttrs((last) =>
        last.map((item: PlanAttrType) =>
          item.id === id
            ? {
                ...item,
                title:
                  editAttrAndValue.editAttr.editTitle !== ""
                    ? editAttrAndValue.editAttr.editTitle
                    : item.title,
                description:
                  editAttrAndValue.editAttr.editDesc !== ""
                    ? editAttrAndValue.editAttr.editDesc
                    : item.description,
              }
            : item
        )
      );
    }
    await updatePlanAttr(
      id,
      token,
      Number(planId),
      editAttrAndValue.editAttr.editTitle,
      editAttrAndValue.editAttr.editDesc
    );
  };
  useEffect(() => {
    getPlanAttrs(token, setPlanAttrs);
  }, [addAtrrAndValue.addAttr]);

  useEffect(() => {
    getPlanValues(token, setPlanValues);
  }, [addAtrrAndValue.addValue]);

  const handleAddingValue = (id: number) => {
    setAttrId(String(id));
    setValueId(String(id));
    console.log(attrId === valueId);
    if (attrId === valueId) {
      setAddAttrAndValue((last) => ({
        ...last,
        addValue: { ...last.addValue, add: true },
      }));
    }
  };

  return (
    <div className="bg-white shadow mx-auto rounded-2xl w-full p-[3%] text-center">
      <div
        className={`grid  ${
          valueId === attrId ? "grid-cols-4" : "grid-cols-3"
        }`}
      >
        <div>نام ویژگی</div>
        <div>توضیحات ویژگی</div>
        {attrId === valueId ? <div>مقدار ویژگی</div> : ""}
        <div>عملیات</div>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {planAttrs.map((item) => (
          <div
            className={`${
              attrIsDeleted && item.deleted_at ? "bg-red-300" : "bg-[#EAEFF6]"
            } grid ${
              valueId === attrId ? "grid-cols-4" : "grid-cols-3"
            } gap-x-5 text-center py-1 rounded-[4px] cursor-pointer`}
            key={item.id}
          >
            <input
              value={
                editAttrAndValue.editAttr.showEditField
                  ? editAttrAndValue.editAttr.editTitle
                  : item.title
              }
              onChange={(e) =>
                setEditAttrAndValue((last) => ({
                  ...last,
                  editAttr: {
                    ...last.editAttr,
                    editTitle: e.target.value,
                  },
                }))
              }
              className={`${
                editAttrAndValue.editAttr.showEditField
                  ? "bg-white"
                  : "bg-[#EAEFF6] caret-transparent cursor-default text-center"
              } outline-none`}
            />
            <input
              value={
                editAttrAndValue.editAttr.showEditField
                  ? editAttrAndValue.editAttr.editDesc
                  : item.description
              }
              onChange={(e) =>
                setEditAttrAndValue((last) => ({
                  ...last,
                  editAttr: {
                    ...last.editAttr,
                    editDesc: e.target.value,
                  },
                }))
              }
              className={`${
                editAttrAndValue.editAttr.showEditField
                  ? "bg-white"
                  : "bg-[#EAEFF6] caret-transparent cursor-default text-center"
              } outline-none`}
            />

            {attrId === valueId ? (
              <ValueComponent
                addAtrrAndValue={addAtrrAndValue}
                setEditAttrAndValue={setEditAttrAndValue}
                setAddAttrAndValue={setAddAttrAndValue}
                planValues={planValues}
              />
            ) : (
              ""
            )}

            <div className="flex flex-row items-center justify-center gap-3">
              <span
                onClick={() => deletePlanAttr(item.id, token, setAttrIsDeleted)}
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
              {/* <span
                onClick={() =>
                  setEditAttrAndValue((last) => ({
                    ...last,
                    editAttr: {
                      ...last.editAttr,
                      showEditField: !last.editAttr.showEditField,
                    },
                  }))
                }
                className="flex justify-center items-center"
              >
                {editAttrAndValue.editAttr.showEditField ? (
                  <FaCheck
                    onClick={() => handlePlanEdit(item.id)}
                    className="text-green-600 text-lg"
                  />
                ) : (
                  <AiOutlineEdit className="text-green-600 text-lg" />
                )}
              </span> */}
              <span onClick={() => handleAddingValue(item.id)}>
                <FaPlus />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageValues;
