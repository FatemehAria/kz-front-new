"use client";
import React, { useEffect, useState } from "react";
import PhonenumberEntry from "./components/phonenumber-entry";
import { useDispatch, useSelector } from "react-redux";
import EnterOTP from "./components/enter-otp";
import { useSession } from "next-auth/react";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";

function Page() {
  const [steps, setSteps] = useState(1);
  const [googleName, setGoogleName] = useState<string | null>("");
  const { localUserId } = useSelector((state: any) => state.userData);
  const dispatch = useDispatch();
  const { status } = useSession();
  const renderSteps = () => {
    switch (steps) {
      case 1:
        return <PhonenumberEntry setSteps={setSteps} />;
      case 2:
        return <EnterOTP setSteps={setSteps} steps={steps} />;
      default:
        return;
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch(getTokenFromLocal());
      dispatch(getIdFromLocal());
      dispatch<any>(fetchUserProfile());
      const name = sessionStorage.getItem("name");
      setGoogleName(name);
    }
  }, []);
  return (
    <div className="w-[30%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      {(status === "authenticated" || googleName) &&
        !localUserId &&
        renderSteps()}
    </div>
  );
}

export default Page;
