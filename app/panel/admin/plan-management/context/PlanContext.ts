import { createContext } from "react";

export type PlanContextType = {
    attrId:string | number;
    setAttrId: React.Dispatch<React.SetStateAction<string>>
}
export const PlanContext = createContext<PlanContextType>({
  attrId: "",
  setAttrId: () => {},
});
