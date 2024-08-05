import { BrandDetailType } from "@/app/panel/admin/brands/brand-detail/page";
import { BrandType } from "@/app/panel/admin/brands/page";
import { DepartmentType } from "@/app/panel/admin/org_management/departments/page";
import { ValueType } from "@/app/panel/admin/plan-management/components/value-component";
import { PlanType } from "@/app/panel/admin/plan-management/page";
import { PlanAttrType } from "@/app/panel/admin/plan-management/plan-detail/page";
import { PermissionType } from "@/app/panel/admin/view-users/permission-management/page";
import { PositionType } from "@/app/panel/admin/view-users/position-management/page";
import { RoleType } from "@/app/panel/admin/view-users/role-management/page";
import app from "@/services/service";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { Bounce, toast } from "react-toastify";

// Logout
export const logout = async () => {
  try {
    const { data } = await app.post("/v1/user/logout", {});
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
// send otp code
export const sendOTPCodeForRegistrationForHoghooghi = async (
  name: string,
  surname: string,
  type: string,
  mobile: string,
  org_name: string,
  org_registration_number: string,
  org_address: string,
  org_phone: string
) => {
  try {
    console.log(
      org_address,
      org_name,
      org_phone,
      org_registration_number,
      type
    );
    const data = await app.post("/registerotp", {
      name,
      surname,
      type,
      mobile,
      org_name,
      org_registration_number,
      org_address,
      org_phone,
    });
    // sendOTPCodeMain(mobile);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
export const sendOTPCodeForRegistrationForHaghighi = async (
  name: string,
  surname: string,
  type: string,
  mobile: string
) => {
  try {
    const data = await app.post("/registerotp", {
      name,
      surname,
      type,
      mobile,
    });
    // sendOTPCodeMain(mobile);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
// Register with Info
export const registerInfo = async (
  name: string,
  surname: string,
  password: string,
  mobile: string,
  type: string,
  shenase_melli: string | null,
  shomare_sabt: string | null,
  setSteps: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const { data } = await app.post("/user/register", {
      name,
      surname,
      password,
      mobile,
      type,
      shenase_melli: shenase_melli || "",
      shomare_sabt: shomare_sabt || "",
    });
    window.localStorage.setItem("type", JSON.stringify(type));
    console.log(data);
    if (type === "haghighi" || type === "حقیقی") {
      await sendOTPCodeForRegistrationForHaghighi(name, surname, type, mobile);
      // await sendOTPCodeMain(mobile);
      setSteps(2);
    } else {
      setSteps(6);
    }
  } catch (error: any) {
    console.log(error);
    if (error.response.data.message === "user-exists")
      throw new Error("کاربر با این مشخصات قبلا ثبت شده است.");
    else {
      console.log(error);
      return toast.error("خطا در ثبت اطلاعات", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        rtl: true,
      });
    }
  }
};
// send otp code for login and general
export const sendOTPCodeMain = async (mobile: string) => {
  try {
    const { data } = await app.post("/loginotp", {
      mobile,
    });
    console.log(data);
  } catch (error: any) {
    console.log(error);
  }
};
// save info to local storage
export const saveToLocalStorage = (key: string, value: string) => {
  window.localStorage.setItem(`${key}`, value);
};
// getting all the users
export const getAllUsers = async (
  token: string,
  setAllUsers: React.Dispatch<any>,
  setDataStatus: React.Dispatch<
    React.SetStateAction<{
      loading: boolean;
    }>
  >
) => {
  try {
    setDataStatus((last) => ({ ...last, loading: true }));
    const { data } = await app.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    window.localStorage.setItem("users", JSON.stringify(data.data));
    setAllUsers(data.data);
  } catch (error) {
    console.log(error);
  } finally {
    setDataStatus((last) => ({ ...last, loading: false }));
  }
};
// deleting user by admin
export const deleteUser = async (
  userId: number,
  token: string,
  setAllUsers: React.Dispatch<any>,
  AllUsersData: never[]
) => {
  try {
    const { data } = await app.delete(`/user/delete/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    toast.success("کاربر با موفقیت حذف شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    setAllUsers(
      AllUsersData.filter((item: { id: number }) => item.id !== userId)
    );
    // getAllUsers(token, setAllUsers, setDataStatus);
  } catch (error) {
    console.log(error);
    toast.error("خطا در حذف کاربر", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
  }
};
// get all positions
export const getAllPositions = async (
  token: string,
  setPositions: React.Dispatch<React.SetStateAction<PositionType[]>>
) => {
  try {
    const { data } = await app("/positions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPositions(data.data);
    console.log(data);
    window.localStorage.setItem("positions", JSON.stringify(data.data));
  } catch (error) {
    console.log(error);
  }
};
// update position by admin
export const updatePosition = async (
  token: string,
  positionId: number | null,
  title_en: string,
  title_fa: string,
  dept_id: number,
  user_id: number
) => {
  try {
    const { data } = await app.post(
      `/position/update/${positionId}`,
      {
        title_en,
        title_fa,
        dept_id,
        user_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("موقعیت با موفقیت به روزرسانی شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error("خطا در به روزرسانی موقعیت", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
  }
};
// delete position by admin
export const deletePosition = async (
  positionId: number,
  token: string,
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const { data } = await app.get(`/position/delete/${positionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    toast.success("موقعیت با موفقیت حذف شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    setIsDeleted(true);
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error("خطا در حذف موقعیت", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
  }
};
// restore position by admin
export const restorePosition = async (
  positionId: number | null,
  token: string,
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const { data } = await app.get(`/position/restore/${positionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("موقعیت با موفقیت بازگردانی شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    setIsDeleted(false);
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error("خطا در بازگردانی موقعیت", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
  }
};
// get position detail
export const getPositionDetail = async (
  token: string,
  positionId: string | null,
  setPositionDetail: React.Dispatch<
    React.SetStateAction<{
      title_en: string;
      title_fa: string;
    }>
  >
) => {
  try {
    const { data } = await app.get(
      `/position/show/${positionId ? positionId : ""}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    setPositionDetail(data.data);
  } catch (error) {
    console.log(error);
  }
};
// create position by admin
export const createNewPosition = async (
  token: string,
  title_en: string,
  title_fa: string,
  dept_id: number,
  user_id: number
) => {
  try {
    const { data } = await app.post(
      "/position/store",
      {
        title_en,
        title_fa,
        dept_id,
        user_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("موقعیت با موفقیت ایجاد شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(data);
  } catch (error) {
    toast.error("خطا در ایجاد موقعیت", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(error);
  }
};
// get all roles
export const getAllRole = async (
  token: string,
  setRoles: React.Dispatch<React.SetStateAction<RoleType[]>>
) => {
  try {
    const { data } = await app("/roles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setRoles(data.data);
    window.localStorage.setItem("roles", JSON.stringify(data.data));
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
// update role by admin
export const updateRole = async (
  token: string,
  roleId: number | null,
  name_en: string,
  name_fa: string
) => {
  try {
    const { data } = await app.post(
      `/role/update/${roleId}`,
      {
        name_en,
        name_fa,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("نقش با موفقیت به روزرسانی شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error("خطا در به روزرسانی نقش", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
  }
};
// delete role by admin
export const deleteRole = async (
  roleId: number,
  token: string,
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const { data } = await app.get(`/role/delete/${roleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    toast.success("نقش با موفقیت حذف شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    setIsDeleted(true);
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error("خطا در حذف نقش", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
  }
};
// restore role by admin
export const restoreRole = async (
  roleId: number | null,
  token: string,
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const { data } = await app.get(`/role/restore/${roleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("نقش با موفقیت بازگردانی شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    setIsDeleted(false);
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error("خطا در بازگردانی نقش", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
  }
};
// get role detail
export const getRoleDetail = async (
  token: string,
  roleId: string | null,
  setRoleDetail: React.Dispatch<
    React.SetStateAction<{
      name_en: string;
      name_fa: string;
    }>
  >
) => {
  try {
    const { data } = await app.get(`/role/show/${roleId ? roleId : ""}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    setRoleDetail(data.data);
  } catch (error) {
    console.log(error);
  }
};
// create role by admin
export const createNewRole = async (
  token: string,
  name_en: string,
  name_fa: string
) => {
  try {
    const { data } = await app.post(
      "/role/store",
      {
        name_en,
        name_fa,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("نقش با موفقیت ایجاد شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(data);
  } catch (error) {
    toast.error("خطا در ایجاد نقش", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(error);
  }
};
// get all permissions
export const getAllPermissions = async (
  token: string,
  setPermissions: React.Dispatch<React.SetStateAction<PermissionType[]>>
) => {
  try {
    const { data } = await app("/permissions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPermissions(data.data);
    window.localStorage.setItem("permissions", JSON.stringify(data.data));
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
// get permission detail
export const getPermissionDetail = async (
  token: string,
  permissionId: string | null,
  setPermissionDetail: React.Dispatch<
    React.SetStateAction<{
      name_en: string;
      name_fa: string;
    }>
  >
) => {
  try {
    const { data } = await app.get(
      `/permission/show/${permissionId ? permissionId : ""}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    setPermissionDetail(data.data);
  } catch (error) {
    console.log(error);
  }
};
// create brand by admin
export const createNewPermission = async (
  token: string,
  name_en: string,
  name_fa: string
) => {
  try {
    const { data } = await app.post(
      "/permission/store",
      {
        name_en,
        name_fa,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("دسترسی با موفقیت ایجاد شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(data);
  } catch (error) {
    toast.error("خطا در ایجاد دسترسی", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(error);
  }
};
// update permission by admin
export const updatePermission = async (
  token: string,
  permissionId: number | null,
  name_en: string,
  name_fa: string
) => {
  try {
    const { data } = await app.post(
      `/permission/update/${permissionId}`,
      {
        name_en,
        name_fa,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("دسترسی با موفقیت به روزرسانی شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error("خطا در به روزرسانی دسترسی", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
  }
};
// delete permission by admin
export const deletePermission = async (
  permissionId: number,
  token: string,
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const { data } = await app.get(`/permission/delete/${permissionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    toast.success("دسترسی با موفقیت حذف شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    setIsDeleted(true);
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error("خطا در حذف دسترسی", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
  }
};
// restore permission by admin
export const restorePermission = async (
  permissionId: number | null,
  token: string,
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const { data } = await app.get(`/permission/restore/${permissionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("دسترسی با موفقیت بازگردانی شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    setIsDeleted(false);
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error("خطا در بازگردانی دسترسی", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
  }
};
// get all brands
export const getAllBrands = async (
  setBrands: React.Dispatch<React.SetStateAction<BrandType[]>>
) => {
  try {
    const { data } = await app("/brands");
    setBrands(data.data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
// get brand details
export const getBrandDetail = async (
  brandId: string | null,
  setBrandDetail: React.Dispatch<React.SetStateAction<BrandDetailType>>
) => {
  try {
    const { data } = await app.get(`/brand/show/${brandId ? brandId : ""}`);
    console.log(data);
    setBrandDetail(data.data);
  } catch (error) {
    console.log(error);
  }
};
// delete brand by admin
export const deleteBrand = async (
  brandId: number,
  token: string,
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const { data } = await app.get(`/brand/delete/${brandId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    toast.success("برند با موفقیت حذف شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    setIsDeleted(true);
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error("خطا در حذف برند", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
  }
};
// restore brand by admin
export const restoreBrand = async (
  brandId: number | null,
  token: string,
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const { data } = await app.get(`/brand/restore/${brandId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("برند با موفقیت بازگردانی شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    setIsDeleted(false);
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error("خطا در بازگردانی برند", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
  }
};
// create brand by admin
export const createNewBrand = async (
  token: string,
  title: string,
  description: string
) => {
  try {
    const { data } = await app.post(
      "/brand/store",
      {
        title,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("برند با موفقیت ایجاد شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(data);
  } catch (error) {
    toast.error("خطا در ایجاد برند", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(error);
  }
};
// update brand by admin
export const updateBrand = async (
  token: string,
  brandId: number | null,
  title: string | null,
  description: string | null
) => {
  try {
    const { data } = await app.post(
      `/brand/update/${brandId}`,
      {
        title: title || "",
        description: description || "",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("برند با موفقیت به روزرسانی شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error("خطا در به روزرسانی برند", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
  }
};
// get all consultations
export const getAllConsultations = async (
  token: string,
  setAllConsults: React.Dispatch<React.SetStateAction<never[]>>
) => {
  try {
    const { data } = await app("/consults", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    setAllConsults(data.data);
  } catch (error) {
    console.log(error);
  }
};
// get all projects
export const getAllProjects = async (
  token: string,
  setProjectStatus: React.Dispatch<
    React.SetStateAction<{
      error: string;
      loading: boolean;
    }>
  >
) => {
  try {
    setProjectStatus((last) => ({ ...last, loading: true }));
    const { data } = await app("/projects", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
  } catch (error: any) {
    console.log(error.response.data.message);
    setProjectStatus((last) => ({ ...last, error: "خطا در ردیافت اطلاعات" }));
  } finally {
    setProjectStatus((last) => ({ ...last, loading: false }));
  }
};
// submit project by user
export const submitProject = async (
  token: string,
  title: string,
  description: string,
  budget_cost: string,
  price: string,
  discount_code: string,
  discount_percentage: string,
  final_price: string,
  status: string,
  priority: string,
  register_user_id: string,
  plan_id: string,
  consultation_id: string,
  lookslike: string,
  org_color: string,
  plugin: string,
  template: string
) => {
  try {
    const { data } = await app.post(
      "/project/store",
      {
        title,
        description,
        budget_cost,
        price,
        discount_code: discount_code || "",
        discount_percentage,
        final_price,
        status,
        priority,
        register_user_id,
        plan_id,
        consultation_id,
        lookslike: lookslike || "",
        org_color: org_color || "",
        plugin: plugin || "",
        template: template || "",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
// file upload in project
export const uploadProjectFile = async (
  token: string,
  projectId: string,
  File: File
) => {
  const formData = new FormData();
  formData.append("File", File);
  try {
    const { data } = await app.post(
      `/project/file/upload/${projectId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("آپلود فایل موفق بود.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(data);
  } catch (error) {
    toast.error("خطا در آپلود فایل، لطفا مجدد آپلود کنید.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(error);
  }
};
// create new plan by admin
export const createNewplan = async (
  token: string,
  title: string,
  description: string
) => {
  try {
    const { data } = await app.post(
      "/plan/store",
      {
        title,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("پلن با موفقیت ایجاد شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(data);
  } catch (error) {
    toast.error("خطا در ایجاد پلن", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(error);
  }
};
// get all plans by admin
export const getAllPlans = async (
  token: string,
  setPlans: React.Dispatch<React.SetStateAction<PlanType[]>>
) => {
  try {
    const { data } = await app("/plans", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPlans(data.data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
// update a plan by admin
export const updatePlan = async (
  token: string,
  planId: number | null,
  title: string | null,
  description: string | null
) => {
  try {
    const { data } = await app.post(
      `/plan/update/${planId}`,
      {
        title: title || "",
        description: description || "",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("پلن با موفقیت به روزرسانی شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error("خطا در به روزرسانی پلن", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
  }
};
// delete plan by admin
export const deletePlan = async (
  planId: number,
  token: string,
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const { data } = await app.get(`/plan/delete/${planId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    toast.success("پلن با موفقیت حذف شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    setIsDeleted(true);
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error("خطا در حذف پلن", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
  }
};
// restore plan by admin
export const restorePlan = async (
  planId: number | null,
  token: string,
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const { data } = await app.get(`/plan/restore/${planId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("پلن با موفقیت بازگردانی شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    setIsDeleted(false);
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error("خطا در بازگردانی پلن", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
  }
};
// get plan detail
export const getPlanDetail = async (
  planId: string | null,
  setPlanDetail: React.Dispatch<React.SetStateAction<BrandDetailType>>
) => {
  try {
    const { data } = await app.get(`/plan/show/${planId ? planId : ""}`);
    console.log(data);
    setPlanDetail(data.data);
  } catch (error) {
    console.log(error);
  }
};
// get plan attrs
export const getPlanAttrs = async (
  token: string,
  setPlanAttrs: React.Dispatch<React.SetStateAction<PlanAttrType[]>>
) => {
  try {
    const { data } = await app.get("/attrs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    setPlanAttrs(data.data);
  } catch (error) {
    console.log(error);
  }
};
// create new plan attribute by admin
export const createNewPlanAttr = async (
  planId: number,
  token: string,
  title: string,
  description: string
) => {
  try {
    const { data } = await app.post(
      "/attr/store",
      {
        plan_id: planId,
        title,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("ویژگی برای پلن مدنظر با موفقیت ایجاد شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(data);
  } catch (error) {
    toast.error("خطا در ایجاد ویژگی", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(error);
  }
};
// delete plan attr by admin
export const deletePlanAttr = async (
  attrId: number,
  token: string,
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const { data } = await app.get(`/attr/delete/${attrId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    toast.success("ویژگی موردنظر با موفقیت حذف شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    setIsDeleted(true);
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error("خطا در حذف ویژگی", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
  }
};
// restore plan attr by admin
export const restorePlanAttr = async (
  attrId: number | null,
  token: string,
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const { data } = await app.get(`/attr/restore/${attrId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("ویژگی مدنظر با موفقیت بازگردانی شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    setIsDeleted(false);
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error("خطا در بازگردانی ویژگی", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
  }
};
// update plan attr by admin
export const updatePlanAttr = async (
  attrId: number,
  token: string,
  planId: number | null,
  title: string | null,
  description: string | null
) => {
  try {
    const { data } = await app.post(
      `/attr/update/${attrId}`,
      {
        plan_id: planId,
        title: title || "",
        description: description || "",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("ویژگی با موفقیت به روزرسانی شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error("خطا در به روزرسانی ویژگی", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
  }
};
// create new plan value by admin
export const createNewPlanValue = async (
  attrId: number,
  planId: number,
  token: string,
  title: string,
  description: string
) => {
  try {
    console.log(attrId, planId, title, description);
    const { data } = await app.post(
      "/value/store",
      {
        attr_id: attrId,
        plan_id: planId,
        title,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("مقدار مدنظر با موفقیت ایجاد شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(data);
  } catch (error) {
    toast.error("خطا در ایجاد مقدار", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(error);
  }
};
// get all values of the plan
export const getPlanValues = async (
  token: string,
  setPlanValues: React.Dispatch<React.SetStateAction<ValueType[]>>
) => {
  try {
    const { data } = await app("/values", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    setPlanValues(data.data);
  } catch (error) {
    console.log(error);
  }
};
// create new site type by admin
export const CreateNewSiteType = async (
  token: string,
  title: string,
  description: string
) => {
  try {
    const { data } = await app.post(
      "/type/store",
      {
        title,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("طراحی جدید با موفقیت ایجاد شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(data);
  } catch (error: any) {
    toast.error("خطا در ایجاد طراحی", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(error.response.data.message);
  }
};
// get all site types
export const getAllSiteTypes = async (
  token: string,
  setSiteTypes: React.Dispatch<React.SetStateAction<never[]>>
) => {
  try {
    const { data } = await app("/types");
    setSiteTypes(data.data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
// update site type by admin
export const updateSiteType = async (
  token: string,
  siteTypeId: number | null,
  title: string | null,
  description: string | null
) => {
  try {
    const { data } = await app.post(
      `/type/update/${siteTypeId}`,
      {
        title: title || "",
        description: description || "",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("طراحی با موفقیت به روزرسانی شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error("خطا در به روزرسانی طراحی", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
  }
};
// delete siet type by admin
export const deleteSiteType = async (
  brandId: number,
  token: string,
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const { data } = await app.get(`/type/delete/${brandId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    toast.success("طراحی با موفقیت حذف شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    setIsDeleted(true);
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error("خطا در حذف طراحی", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
  }
};
// restore site type by admin
export const restoreSiteType = async (
  siteType: number | null,
  token: string,
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const { data } = await app.get(`/brand/restore/${siteType}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("طراحی با موفقیت بازگردانی شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    setIsDeleted(false);
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error("خطا در بازگردانی طراحی", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
  }
};
// get newsletters
export const getAllNewsletters = async (
  token: string,
  setNewsLetters: Dispatch<SetStateAction<never[]>>
) => {
  try {
    const { data } = await app("/newsletters", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    setNewsLetters(data.data);
  } catch (error) {
    console.log(error);
  }
};
// update newsletter by admin
export const updateNewsLetter = async (
  token: string,
  newsLetterId: number,
  user_id: number | null,
  dept_id: number | null,
  title: string | null,
  description: string | null
) => {
  try {
    const { data } = await app.post(
      `/newsletter/update/${newsLetterId}`,
      {
        title: title || "",
        description: description || "",
        user_id,
        dept_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("خبرنامه با موفقیت به روزرسانی شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error("خطا در به روزرسانی خبرنامه", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
  }
};
// create new newsletter by admin
export const createNewsLetter = async (
  token: string,
  user_id: number | null,
  dept_id: number | null,
  title: string | null,
  description: string | null
) => {
  try {
    const { data } = await app.post(
      "/newsletter/store",
      {
        title,
        description,
        user_id,
        dept_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("خبرنامه با موفقیت ایجاد شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(data);
  } catch (error) {
    toast.error("خطا در ایجاد خبرنامه", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(error);
  }
};
// delete newsletter by admin
export const deleteNewsLetter = async (
  token: string,
  newsletterId: number,
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const { data } = await app.get(`/newsletter/delete/${newsletterId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    toast.success("خبرنامه موردنظر با موفقیت حذف شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    setIsDeleted(true);
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error("خطا در حذف خبرنامه", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
  }
};
// restore newsletter by admin
export const restoreNewsletter = async (
  token: string,
  newsletterId: number,
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const { data } = await app.get(`/attr/restore/${newsletterId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("خبرنامه مدنظر با موفقیت بازگردانی شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    setIsDeleted(false);
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error("خطا در بازگردانی خبرنامه", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
  }
};
// get newsletter detail
export const getNewsLetterDetail = async (
  token: string,
  newsletterId: string | null,
  setNewsLetterDetail: React.Dispatch<React.SetStateAction<BrandDetailType>>
) => {
  try {
    const { data } = await app.get(`/newsletter/show/${newsletterId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    setNewsLetterDetail(data.data);
  } catch (error) {
    console.log(error);
  }
};
// get departments
export const getAllDepartments = async (
  token: string,
  setDepartments: Dispatch<SetStateAction<DepartmentType[]>>
) => {
  try {
    const { data } = await app("/departments", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    setDepartments(data.data);
  } catch (error) {
    console.log(error);
  }
};
// update department by admin
export const updateDepartment = async (
  token: string,
  departmentId: number,
  name_en: string,
  name_fa: string
) => {
  try {
    const { data } = await app.post(
      `/department/update/${departmentId}`,
      {
        name_en,
        name_fa,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("دپارتمان با موفقیت به روزرسانی شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error("خطا در به روزرسانی دپارتمان", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
  }
};
// delete department by admin
export const deleteDepartment = async (
  departmentId: number,
  token: string,
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const { data } = await app.get(`/department/delete/${departmentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    toast.success("دپارتمان با موفقیت حذف شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    setIsDeleted(true);
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error("خطا در حذف دپارتمان", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
  }
};
// restore department by admin
export const restoreDepartment = async (
  departmentId: number | null,
  token: string,
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const { data } = await app.get(`/department/restore/${departmentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("دپارتمان با موفقیت بازگردانی شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    setIsDeleted(false);
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error("خطا در بازگردانی دپارتمان", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
  }
};
// get department detail
export const getDepartmentDetail = async (
  token: string,
  departmentId: string | null,
  setDepartmentDetail: React.Dispatch<React.SetStateAction<BrandDetailType>>
) => {
  try {
    const { data } = await app.get(`/department/show/${departmentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    setDepartmentDetail(data.data);
  } catch (error) {
    console.log(error);
  }
};
// create new department by admin
export const createNewDepartment = async (
  token: string,
  name_en: string,
  name_fa: string
) => {
  try {
    const { data } = await app.post(
      "/department/store",
      {
        name_en,
        name_fa,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("دپارتمان با موفقیت ایجاد شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(data);
  } catch (error) {
    toast.error("خطا در ایجاد دپارتمان", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    console.log(error);
  }
};
