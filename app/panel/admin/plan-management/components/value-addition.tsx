import { createNewPlanValue, getPlanValues } from "@/utils/utils";
import { useSearchParams } from "next/navigation";
import React, { useContext, useState } from "react";
import { AttrIdContext } from "../context/AttrIdContext";
import { ValueType } from "./value-component";

type ValueAdditionProps = {
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
function ValueAddition({
  addAtrrAndValue,
  editAttrAndValue,
  planId,
  setAddAttrAndValue,
  setEditAttrAndValue,
  token,
}: ValueAdditionProps) {
  const { attrId } = useContext(AttrIdContext);
  const [value, setValue] = useState<ValueType>([]);
  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Promise.all([
      await createNewPlanValue(
        Number(attrId),
        Number(planId),
        token,
        addAtrrAndValue.addValue.valueTitle,
        addAtrrAndValue.addValue.valueDesc
      ),
    ]);
  };
  return (
    <form
      className="bg-white shadow mx-auto rounded-2xl w-full p-[3%]"
      onSubmit={(e) => handleSubmission(e)}
    >
      <label htmlFor="">عنوان مقدار</label>
      <input
        type="text"
        value={addAtrrAndValue.addValue.valueTitle}
        onChange={(e) =>
          setAddAttrAndValue((last) => ({
            ...last,
            addValue: { ...last.addValue, valueTitle: e.target.value },
          }))
        }
        className="bg-[#D0DBEC] border-[#D0DBEC] mx-auto outline-none rounded-md px-2 py-2 text-lg w-full border-[0.3px]"
      />

      <label htmlFor="">توضیحات مقدار</label>
      <input
        type="text"
        value={addAtrrAndValue.addValue.valueDesc}
        onChange={(e) =>
          setAddAttrAndValue((last) => ({
            ...last,
            addValue: { ...last.addValue, valueDesc: e.target.value },
          }))
        }
        className="bg-[#D0DBEC] border-[#D0DBEC]mx-auto outline-none rounded-md px-2 py-2 text-lg w-full border-[0.3px]"
      />

      <div className="flex justify-end my-5">
        <button className="p-2 w-[80px] bg-[#4866CF] rounded-[4px] text-white">
          تایید
        </button>
      </div>
    </form>
  );
}

export default ValueAddition;
