"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import { useRouter } from "next/navigation";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { userType } = useSelector((store: any) => store.userData);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTokenFromLocal());
    dispatch(getIdFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);

  return <div dir="rtl">{userType === "Admin" && children}</div>;
};
export default AdminLayout;
