"use client";
import Login from "./login";
import Info from "./info";
import React, { useState } from "react";
import RegisterUser from "./register-user";
import { useSelector } from "react-redux";
import UserLoginViaOTP from "./user-login-via-otp";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Auth = () => {
  const [steps, setSteps] = useState(1);
  const { localToken, userId } = useSelector((state: any) => state.userData);
  const renderSteps = () => {
    switch (steps) {
      case 1:
        return <Login setSteps={setSteps} />;
      case 2:
        return <UserLoginViaOTP setSteps={setSteps} steps={steps} />;
      case 3:
        return <Info setSteps={setSteps} />;
      case 5:
        return <RegisterUser setSteps={setSteps} />;
      default:
        return;
    }
  };
  const { status } = useSession();
  const router = useRouter();
  if (status === "authenticated") {
    router.replace("/");
  }
  console.log(status);
  return (
    <div>
      {(!localToken || !userId) && <div dir="rtl">{renderSteps()}</div>}
    </div>
  );
};
export default Auth;
