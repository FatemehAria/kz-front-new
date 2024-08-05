import { createContext } from "react";

interface ValueIdContextType {
  valueId: string;
  setValueId: React.Dispatch<React.SetStateAction<string>>;
}
export const ValueIdContext = createContext<ValueIdContextType>({
  valueId: "",
  setValueId: () => {},
});
