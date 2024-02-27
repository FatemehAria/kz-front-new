"use client";
import Footer from "@/components/homepage-components/footer";
import Nav from "@/components/homepage-components/nav";
import UserCheck from "./user-login-via-otp";
import Login from "./login";
import Info from "./info";
import Reauthenticate from "./reauthenticate";
import { useState } from "react";
import RegisterUser from "./register-user";
import LoginOTPValidation from "./login-otp-validation";
import { useSelector } from "react-redux";
import UserLoginViaOTP from "./user-login-via-otp";

const Auth = () => {
  const [steps, setSteps] = useState(1);
  const { localToken } = useSelector((state: any) => state.userRole);

  const renderSteps = () => {
    switch (steps) {
      case 1:
        return <Login setSteps={setSteps} />;
      case 2:
        return <UserLoginViaOTP setSteps={setSteps} steps={steps} />;
      case 3:
        return <Info setSteps={setSteps} />;
      case 4:
        return <Reauthenticate setSteps={setSteps} />;
      case 5:
        return <RegisterUser setSteps={setSteps} />;
      case 6:
        return <LoginOTPValidation setSteps={setSteps} />;
      default:
        return;
    }
  };
  return (
    <>
      {!localToken && (
        <div className="" dir="rtl">
          {renderSteps()}
        </div>
      )}
    </>
  );
};
export default Auth;
