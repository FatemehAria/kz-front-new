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
} from "@/redux/features/user/userSlice";
import { AuthContext } from "./context/AuthContext";
import AdditionalInfoOnRegister from "./additional-info-onregister";

const Auth = () => {
  const { authSteps, setAuthSteps } = useContext(AuthContext);
  const [loginApproach, setLoginApproach] = useState(0);
  const { token } = useSelector((state: any) => state.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTokenFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);

  const renderSteps = () => {
    switch (authSteps) {
      case 1:
        return (
          <Login
            setLoginApproach={setLoginApproach}
            loginApproach={loginApproach}
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

  const router = useRouter();
  if (token) {
    router.replace("/");
  }

  return <div>{!token && <div dir="rtl">{renderSteps()}</div>}</div>;
};
export default Auth;
