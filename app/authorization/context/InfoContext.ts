import { createContext } from "react";

interface InfoContextTypes {
  savedInfo: {
    name: string;
    surname: string;
    mobile: string;
    type: string;
    password: string;
  };
  setSavedInfo: React.Dispatch<
    React.SetStateAction<{
      name: string;
      surname: string;
      mobile: string;
      type: string;
      password: string;
    }>
  >;
}
export const InfoContext = createContext<InfoContextTypes>({
  savedInfo: {
    name: "",
    surname: "",
    mobile: "",
    type: "",
    password: "",
  },
  setSavedInfo: () => {},
});
