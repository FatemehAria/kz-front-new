"use client";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import { useRouter } from "next/navigation";
import {
  getAllDepartments,
  getAllPermissions,
  getAllPositions,
  getAllRole,
  getAllUsers,
} from "@/utils/utils";
import { RoleContext } from "./context/role-context/RoleContext";
import { PermissionContext } from "./context/permission-context/PermissionContext";
import { PositionContext } from "./context/position-context/PositionContext";
import { DepartmentContext } from "./context/department-context/DepartmentContext";
import { UserContext } from "./context/user-context/UserContext";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { role, token } = useSelector((store: any) => store.userData);
  const { setRoles } = useContext(RoleContext);
  const { setPermissions } = useContext(PermissionContext);
  const {  setPositions } = useContext(PositionContext);
  const { setDepartments  } = useContext(DepartmentContext);
  const { setAllUsersData , setUsersStatus } = useContext(UserContext);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all([
      getAllUsers(token, setAllUsersData, setUsersStatus),
      getAllPositions(token, setPositions),
      getAllPermissions(token, setPermissions),
      getAllRole(token, setRoles),
      getAllDepartments(token, setDepartments),
    ]);
  }, []);

  // useEffect(() => {
  //   dispatch(getTokenFromLocal());
  //   dispatch(getIdFromLocal());
  //   dispatch<any>(fetchUserProfile());
  // }, []);

  // return <div dir="rtl">{userType === "Admin" && children}</div>;
  return <div dir="rtl">{children}</div>;
};
export default AdminLayout;
