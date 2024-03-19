"use client";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function UserLayout({ children }: { children: React.ReactNode }) {
  const { userType } = useSelector((store: any) => store.userData);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTokenFromLocal());
    dispatch(getIdFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);

  return <div dir="rtl">{userType === "User" && children}</div>;
}

export default UserLayout;
