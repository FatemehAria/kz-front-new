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
import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

const initialState: RTKUserState = {
  status: "idle",
  userProfile: {},
  userInfoOnLogin: {},
  FirstName: "",
  LastName: "",
  token: "",
  errorMessage: "",
  successMessage: "",
  changePhoneNumber: false,
  localToken: "" || undefined,
  localUserId: "" || null,
  PhoneNumber: "" || null,
  email: "",
  PhoneNumberInput: true,
  showModal: false,
  autoFocus: true,
  isLoggedIn: false,
  welcomeMessage: "",
  userId: "",
  userType: "Admin",
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
        token: data.User?.token,
        userInfoOnLogin: data.User,
        FirstName: data.User?.FirstName,
        LastName: data.User?.LastName,
        isLoggedIn: data.isLogin,
        welcomeMessage: data.welcome,
        userId: data.User?._id,
        userType: data.User?.UserType,
        type: data.User?.type,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
// vorod ba mobile
const fetchUserInOTPLogin = createAsyncThunk(
  "userData/fetchUserInOTPLogin",
  async (payload: fetchUserInOTPLoginPayload, { rejectWithValue }) => {
    const { mobile } = payload;
    try {
      const { data } = await axios.post("/v1/loginotp", {
        mobile,
      });
      console.log(data);
      return {
        token: data.User?.token,
        userInfoOnLogin: data.User,
        FirstName: data.User?.FirstName,
        LastName: data.User?.LastName,
        isLoggedIn: data.isLogin,
        welcomeMessage: data.welcome,
        userId: data.User?._id,
        userType: data.User?.UserType,
        type: data.User?.type,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
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
      const { data } = await axios.post("/v1/verifyotp", {
        otp_code,
        mobile,
      });
      console.log(data);
      return {
        token: data.User?.token,
        userInfoOnLogin: data.User,
        FirstName: data.User?.FirstName,
        LastName: data.User?.LastName,
        isLoggedIn: data.isLogin,
        welcomeMessage: data.welcome,
        userId: data.User?._id,
        userType: data.User?.UserType,
        type: data.User?.type,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
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
      org_registration,
      org_address,
      org_phone,
    } = payload;
    try {
      const { data } = await axios.post("/v1/registerotp", {
        name,
        surname,
        type,
        mobile,
        org_name,
        org_registration,
        org_address,
        org_phone,
      });
      console.log(data);
      return {
        token: data.User?.token,
        userInfoOnLogin: data.User,
        FirstName: data.User?.FirstName,
        LastName: data.User?.LastName,
        isLoggedIn: data.isLogin,
        welcomeMessage: data.welcome,
        userId: data.User?._id,
        userType: data.User?.UserType,
        type: data.User?.type,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const fetchUserProfile = createAsyncThunk<
  // This is the return type of the payload creator
  {
    data: any; // You can specify a concrete type for the response data
    FirstName: string;
    LastName: string;
    email: string;
    type: string;
    userType: string;
    userId: string;
    numberOfAnnouncements: number;
  }, // Return type
  void, // First argument type (it can be anything you want)
  { state: RootState } // Types for thunkAPI
>("userData/fetchUserProfile", async (_, { getState, rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/v1/user/show`, {
      headers: {
        authorization: `Bearer ${getState().userData.localToken}`,
      },
    });
    console.log(data);
    return {
      data: data.data,
      FirstName: data.data.FirstName,
      LastName: data.data.LastName,
      email: data.data.email,
      type: data.data.type,
      userType: data.data.UserType,
      userId: data.data._id,
      numberOfAnnouncements: data.data.Announcement.length,
    };
  } catch (error) {
    return rejectWithValue(error);
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
      state.localToken = getCookie("token");
    },
    getIdFromLocal: (state) => {
      state.localUserId = sessionStorage.getItem("userId");
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
      state.showModal = true;
      state.status = "success";
      state.token = action.payload.token;
      setCookie("token", state.token, {
        path: "/",
        maxAge: 60 * 60,
        secure: true,
      });
      state.userInfoOnLogin = action.payload.userInfoOnLogin;
      state.FirstName = action.payload.FirstName;
      state.LastName = action.payload.LastName;
      state.welcomeMessage = action.payload.welcomeMessage;
      state.userType = action.payload.userType;
      state.type = action.payload.type;
      state.userId = action.payload.userId;
      sessionStorage.setItem("userId", state.userId);
      if (!state.userInfoOnLogin) {
        state.successMessage = "لطفا اطلاعات خود را تکمیل کنید.";
      } else {
        state.successMessage = `${state.FirstName} ${state.LastName} عزیز با موفقیت وارد پنل کاربری خود شدید.`;
      }
      state.errorMessage = "";
    });
    builder.addCase(fetchUserInOTPLogin.rejected, (state) => {
      state.showModal = true;
      state.status = "failed";
      state.errorMessage = ` کد یکبار مصرف مورد تایید نمی باشد
      دوباره اقدام فرمایید.`;
    });

    builder.addCase(fetchUserProfile.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.status = "success";
      state.userProfile = action.payload.data;
      state.FirstName = action.payload.FirstName;
      state.LastName = action.payload.LastName;
      state.type = action.payload.type;
      state.errorMessage = "";
      state.numberOfAnnouncements = action.payload.numberOfAnnouncements;
      state.userType = action.payload.userType;
      state.userId = action.payload.userId;
      sessionStorage.setItem("userId", state.userId);
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
      state.userInfoOnLogin = action.payload.userInfoOnLogin;
      state.FirstName = action.payload.FirstName;
      state.LastName = action.payload.LastName;
      state.userType = action.payload.userType;
      state.userId = action.payload.userId;
      sessionStorage.setItem("userId", state.userId);
      state.successMessage = `${state.FirstName} ${state.LastName} عزیز با موفقیت وارد پنل کاربری خود شدید.`;
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
        state.userInfoOnLogin = action.payload.userInfoOnLogin;
        state.FirstName = action.payload.FirstName;
        state.LastName = action.payload.LastName;
        state.userType = action.payload.userType;
        state.userId = action.payload.userId;
        sessionStorage.setItem("userId", state.userId);
        state.successMessage = `${state.FirstName} ${state.LastName} عزیز با موفقیت وارد پنل کاربری خود شدید.`;
        state.errorMessage = "";
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
    });
    builder.addCase(fetchUserInLoginWithPassword.fulfilled, (state, action) => {
      state.showModal = true;
      state.status = "success";
      state.token = action.payload.token;
      setCookie("token", state.token, {
        path: "/",
        maxAge: 60 * 60,
        secure: true,
      });
      state.userInfoOnLogin = action.payload.userInfoOnLogin;
      state.FirstName = action.payload.FirstName;
      state.LastName = action.payload.LastName;
      state.userType = action.payload.userType;
      state.userId = action.payload.userId;
      sessionStorage.setItem("userId", state.userId);
      state.successMessage = `${state.FirstName} ${state.LastName} عزیز با موفقیت وارد پنل کاربری خود شدید.`;
      state.errorMessage = "";
    });
    builder.addCase(fetchUserInLoginWithPassword.rejected, (state, action) => {
      state.status = "failed";
      state.errorMessage = "خطا";
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
