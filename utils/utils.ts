import { BrandDetailType } from "@/app/panel/admin/brands/brand-detail/page";
import { BrandType } from "@/app/panel/admin/brands/page";
import { PlanType } from "@/app/panel/admin/plan-management/page";
import { PlanAttrType } from "@/app/panel/admin/plan-management/plan-detail/page";
import app from "@/services/service";
import axios from "axios";
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
export const sendOTPCodeForRegistration = async (
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
      await sendOTPCodeMain(mobile);
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
