import app from "@/services/service";
import {
  fetchUserInLoginWithPasswordPayload,
  fetchUserInOTPLoginPayload,
  RootState,
  RTKUserState,
  sendOTPCodeAfterRegistrationPayload,
  verifyUserByOTPInLoginAndRegistrationPayload,
} from "@/types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

const initialState: RTKUserState = {
  status: "idle",
  userProfile: {},
  FirstName: "",
  LastName: "",
  token: "",
  errorMessage: "",
  successMessage: "",
  changePhoneNumber: false,
  PhoneNumber: "" || null,
  email: "",
  PhoneNumberInput: true,
  showModal: false,
  autoFocus: true,
  isLoggedIn: false,
  welcomeMessage: "",
  userId: "",
  userType: "",
  type: "Genuine",
  numberOfAnnouncements: 0,
};

// vorod ba mobile & password
const fetchUserInLoginWithPassword = createAsyncThunk(
  "userData/fetchUserInLoginWithPassword",
  async (payload: fetchUserInLoginWithPasswordPayload, { rejectWithValue }) => {
    const { mobile, password } = payload;
    try {
      const { data } = await app.post("/user/login", {
        mobile,
        password,
      });
      console.log(data);
      return {
        token: data.data?.token,
        FirstName: data.data?.user.name,
        userId: data.data?.user.id,
        userType: data.data?.user.roles,
        type: data.data?.user.type,
        isLoggedIn: true,
        showModal: true,
        status: "success",
      };
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
// vorod ba mobile
const fetchUserInOTPLogin = createAsyncThunk(
  "userData/fetchUserInOTPLogin",
  async (payload: fetchUserInOTPLoginPayload, { rejectWithValue }) => {
    const { mobile } = payload;
    try {
      const { data } = await app.post("/loginotp", {
        mobile,
      });
      console.log(data);
      return {
        token: data.data?.token,
        FirstName: data.data?.user.name,
        // isLoggedIn: data.isLogin,
        userId: data.data?.user.id,
        // userType: data.User?.UserType,
        type: data.data?.user.type,
      };
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
// tayide otp bad az login ba mobile va sabtenam
const verifyUserByOTPInLoginAndRegistration = createAsyncThunk(
  "userData/verifyUserByOTPInLoginAndRegistration",
  async (
    payload: verifyUserByOTPInLoginAndRegistrationPayload,
    { rejectWithValue }
  ) => {
    const { mobile, otp_code } = payload;
    try {
      const { data } = await app.post("/verifyotp", {
        otp_code,
        mobile,
      });
      console.log(data);
      return {
        token: data.data?.token,
        userProfile: data.data?.user,
        FirstName: data.data?.user.name,
        userId: data.data?.user.id,
        // userType: data.data?.user.type,
        type: data.data?.user.type,
      };
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
// ersal otp bad az sabtenam
const sendOTPCodeAfterRegistration = createAsyncThunk(
  "userData/sendOTPCodeAfterRegistration",
  async (payload: sendOTPCodeAfterRegistrationPayload, { rejectWithValue }) => {
    const {
      name,
      surname,
      type,
      mobile,
      org_name,
      org_registration_number,
      org_address,
      org_phone,
    } = payload;
    try {
      console.log(payload);
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
      return {
        token: data.data.User?.token,
        userProfile: data.data.user,
        FirstName: data.data.User?.FirstName,
        userId: data.data?.user?.id,
        type: data.data.User?.type,
      };
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const fetchUserProfile = createAsyncThunk<
  // This is the return type of the payload creator
  {
    data: any; // You can specify a concrete type for the response data
    FirstName: string;
    // LastName: string;
    email: string;
    type: string;
    userType:
      | string
      | {
          created_at: string;
          deleted_at: string;
          updated_at: string;
          id: number;
          name_en: string;
          name_fa: string;
          pivot: { user_id: number; role_id: number };
        }[];
    userId: string;
    // numberOfAnnouncements: number;
  }, // Return type
  void, // First argument type (it can be anything you want)
  { state: RootState } // Types for thunkAPI
>("userData/fetchUserProfile", async (_, { getState, rejectWithValue }) => {
  try {
    console.log(getState().userData.token);
    const { data } = await app.get(`/user/show`, {
      headers: {
        authorization: `Bearer ${getState().userData.token}`,
      },
    });
    console.log(data);
    return {
      data: data.data,
      FirstName: data.data.name,
      email: data.data.email,
      type: data.data.type,
      // roles:[]
      userType: data.data.roles,
      userId: data.data.id,
      // numberOfAnnouncements: data.data.Announcement.length,
    };
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    updateStatus: (state) => {
      state.status = "idle";
    },
    openModal: (state, action) => {
      state.showModal = action.payload;
    },
    handleAutoFocus: (state, action) => {
      state.autoFocus = action.payload;
    },
    deleteDataFromCookie: (state) => {
      state.token = "";
      state.userId = "";
      deleteCookie("token");
      sessionStorage.removeItem("userId");
    },
    changePhoneNumber: (state) => {
      state.changePhoneNumber = true;
      localStorage.removeItem("PhoneNumber");
    },
    readPhoneNumberFromLocalStroage: (state) => {
      state.PhoneNumber = localStorage.getItem("PhoneNumber");
    },
    getTokenFromLocal: (state) => {
      state.token = getCookie("token");
    },
    getIdFromLocal: (state) => {
      state.userId = sessionStorage.getItem("userId") || "";
    },
    changeUserInfo: (state, action) => {
      state.FirstName = action.payload;
    },
    updateUserProfile: (state, action) => {
      state.userProfile = { ...state.userProfile, ...action.payload };
    },
    updateInputDisability: (state, action) => {
      state.PhoneNumberInput = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetchUserInOTPLogin
    builder.addCase(fetchUserInOTPLogin.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserInOTPLogin.fulfilled, (state, action) => {
      // state.showModal = true;
      state.status = "success";
      state.token = action.payload.token;
      setCookie("token", state.token, {
        path: "/",
        maxAge: 60 * 60,
        secure: true,
      });
      state.FirstName = action.payload.FirstName;
      // state.userType = action.payload.userType;
      state.type = action.payload.type;
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
      sessionStorage.setItem("userId", state.userId);
      // if (!state.userProfile) {
      //   state.successMessage = "لطفا اطلاعات خود را تکمیل کنید.";
      // } else {
      //   state.successMessage = `${state.FirstName} ${state.LastName} عزیز با موفقیت وارد پنل کاربری خود شدید.`;
      // }
      state.errorMessage = "";
    });
    builder.addCase(fetchUserInOTPLogin.rejected, (state) => {
      state.showModal = true;
      state.status = "failed";
      state.errorMessage = ` کد یکبار مصرف مورد تایید نمی باشد
      دوباره اقدام فرمایید.`;
    });
    // token
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.status = "success";
      state.userProfile = action.payload.data;
      state.FirstName = action.payload.FirstName;
      // state.LastName = action.payload.LastName;
      state.type = action.payload.type;
      state.errorMessage = "";
      // state.numberOfAnnouncements = action.payload.numberOfAnnouncements;
      state.userType = action.payload.userType;
      state.userId = action.payload.userId;
      sessionStorage.setItem("userId", state.userId);
      state.userType = action.payload.userType;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.status = "failed";
      state.errorMessage = "خطا";
    });
    // sendOTPCodeAfterRegistration
    builder.addCase(sendOTPCodeAfterRegistration.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(sendOTPCodeAfterRegistration.fulfilled, (state, action) => {
      state.showModal = true;
      state.status = "success";
      state.token = action.payload.token;
      setCookie("token", state.token, {
        path: "/",
        maxAge: 60 * 60,
        secure: true,
      });
      state.userProfile = action.payload.userProfile;
      state.FirstName = action.payload.FirstName;
      state.userId = action.payload.userId;
      state.userType = "User";
      sessionStorage.setItem("userId", state.userId);
      state.successMessage = `${state.FirstName} عزیز با موفقیت وارد پنل کاربری خود شدید.`;
      state.errorMessage = "";
    });
    builder.addCase(sendOTPCodeAfterRegistration.rejected, (state, action) => {
      state.status = "failed";
      state.errorMessage = "خطا";
    });
    // verifyUserByOTPInLoginAndRegistration
    builder.addCase(verifyUserByOTPInLoginAndRegistration.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      verifyUserByOTPInLoginAndRegistration.fulfilled,
      (state, action) => {
        state.showModal = true;
        state.status = "success";
        state.token = action.payload.token;
        setCookie("token", state.token, {
          path: "/",
          maxAge: 60 * 60,
          secure: true,
        });
        state.FirstName = action.payload.FirstName;
        state.type = action.payload.type;
        state.userType = "User";
        state.userId = action.payload.userId;
        sessionStorage.setItem("userId", state.userId);
        state.successMessage = `${state.FirstName} عزیز با موفقیت وارد پنل کاربری خود شدید.`;
        state.errorMessage = "";
        state.isLoggedIn = true;
      }
    );
    builder.addCase(
      verifyUserByOTPInLoginAndRegistration.rejected,
      (state, action) => {
        state.status = "failed";
        state.errorMessage = "خطا";
      }
    );
    // fetchUserInLoginWithPassword
    builder.addCase(fetchUserInLoginWithPassword.pending, (state) => {
      state.status = "loading";
      state.showModal = false;
    });
    builder.addCase(fetchUserInLoginWithPassword.fulfilled, (state, action) => {
      state.showModal = action.payload.showModal;
      state.status = action.payload.status;
      state.token = action.payload.token;
      setCookie("token", state.token, {
        path: "/",
        maxAge: 60 * 60,
        secure: true,
      });
      state.FirstName = action.payload.FirstName;
      state.userType = action.payload.userType;
      state.userId = action.payload.userId;
      state.isLoggedIn = action.payload.isLoggedIn;
      sessionStorage.setItem("userId", state.userId);
      state.successMessage = `${state.FirstName} عزیز با موفقیت وارد پنل کاربری خود شدید.`;
      state.errorMessage = "";
      state.type = action.payload.type;
    });
    builder.addCase(fetchUserInLoginWithPassword.rejected, (state, action) => {
      state.status = "failed";
      state.errorMessage = "خطا";
      state.showModal = false;
    });
  },
});

export default userSlice.reducer;
export const {
  updateStatus,
  changePhoneNumber,
  getTokenFromLocal,
  changeUserInfo,
  updateUserProfile,
  updateInputDisability,
  openModal,
  handleAutoFocus,
  readPhoneNumberFromLocalStroage,
  getIdFromLocal,
  deleteDataFromCookie,
} = userSlice.actions;
export {
  fetchUserProfile,
  fetchUserInLoginWithPassword,
  verifyUserByOTPInLoginAndRegistration,
  sendOTPCodeAfterRegistration,
  fetchUserInOTPLogin,
};
