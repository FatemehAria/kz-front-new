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
    if (type === "haghighi") {
      setSteps(5);
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
  setDataStatus: React.Dispatch<
    React.SetStateAction<{
      loading: boolean;
    }>
  >,
  AllUsersData: []
) => {
  try {
    const { data } = await app.delete(`/user/delete/${userId}`);
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
export const getNewOTP = async (PhoneNumber: string) => {
  try {
    const { data } = await axios.post(
      "https://keykavoos.liara.run/Client/SendOTP",
      {
        PhoneNumber,
      }
    );
    // console.log(data);
  } catch (error: any) {
    // console.log(error);
  }
};

export const getOTPViaCall = async (PhoneNumber: string) => {
  try {
    const { data } = await axios.post(
      "https://keykavoos.liara.run/Client/SendCallOTP",
      {
        PhoneNumber,
      }
    );
    toast.success("در حال برقراری تماس...", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      rtl: true,
    });
    // console.log(data);
  } catch (error) {
    toast.error("خطا در برقراری تماس.", {
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
    // console.log(error);
  }
};
