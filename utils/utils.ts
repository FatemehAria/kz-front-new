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
export const RegisterInfo = async (
  name: string,
  surname: string,
  password: string,
  mobile: string,
  type: string,
  shenase_melli: string | null,
  shomare_sabt: string | null
) => {
  try {
    const { data } = await app.post("/user/register", {
      name,
      surname,
      password,
      mobile,
      type,
      shenase_melli,
      shomare_sabt
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

// export const login = async (
//   PhoneNumber: string,
//   setAuthSteps: React.Dispatch<React.SetStateAction<number>>
// ) => {
//   try {
//     // const { data } = await axios.post(
//     //   "https://keykavoos.liara.run/Client/SignUp",
//     //   {
//     //     PhoneNumber,
//     //   }
//     // );
//     toast.success("کد ارسال شد.", {
//       position: "top-center",
//       autoClose: 3000,
//       hideProgressBar: true,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//       transition: Bounce,
//       rtl: true,
//     });
//     setAuthSteps(2);
//   } catch (error: any) {
//     toast.error("خطا در ارسال کد.", {
//       position: "top-right",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//       transition: Bounce,
//       rtl: true,
//     });
//   }
// };

export const login2 = async (PhoneNumber: string) => {
  try {
    const { data } = await axios.post(
      "https://keykavoos.liara.run/Client/SignUp",
      {
        PhoneNumber,
      }
    );
    toast.success("کد ارسال شد.", {
      position: "top-center",
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
  } catch (error: any) {
    toast.error("خطا در ارسال کد.", {
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
