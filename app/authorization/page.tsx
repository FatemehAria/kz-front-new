"use client";
import Login from "./login";
import Info from "./info";
import React, { useContext, useEffect, useState } from "react";
import RegisterUser from "./register-user";
import { useDispatch, useSelector } from "react-redux";
import UserLoginViaOTP from "./user-login-via-otp";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
  updateStatus,
} from "@/redux/features/user/userSlice";
import { AuthContext } from "./context/AuthContext";
import AdditionalInfoOnRegister from "./additional-info-onregister";

const Auth = () => {
  const { successMessage, errorMessage, status, token } = useSelector(
    (state: any) => state.userData
  );
  const { authSteps, setAuthSteps } = useContext(AuthContext);
  const [loginApproach, setLoginApproach] = useState(0);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const dispatch = useDispatch();
  const renderSteps = () => {
    switch (authSteps) {
      case 1:
        return (
          <Login
            setLoginApproach={setLoginApproach}
            loginApproach={loginApproach}
            isLoggingIn={isLoggingIn}
            setIsLoggingIn={setIsLoggingIn}
          />
        );
      case 2:
        return <UserLoginViaOTP />;
      case 3:
        return <Info setSteps={setAuthSteps} />;
      case 5:
        return <RegisterUser />;
      case 6:
        return <AdditionalInfoOnRegister setSteps={setAuthSteps} />;
      default:
        return;
    }
  };

  useEffect(() => {
    dispatch(updateStatus());
  }, []);

  console.log("success message", successMessage);
  console.log("error message", errorMessage);
  console.log("status", status);
  // const router = useRouter();
  // if (token) {
  //   router.replace("/");
  // }
  // console.log("userRole in aurh",userType);
  // console.log("token in aurh",token);
  // console.log("showmoadl in aurh",showModal);
  return <div>{<div dir="rtl">{renderSteps()}</div>}</div>;
};
export default Auth;
