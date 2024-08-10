import app from "@/services/service";
import {
  fetchUserInLoginWithPasswordPayload,
  fetchUserInOTPLoginPayload,
  RootState,
  RTKUserState,
  sendOTPCodeAfterRegistrationPayload,
  userRoleType,
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
  // to avoid conflict in auth and main page
  errorOnProfileHandler: false,
  changePhoneNumber: false,
  PhoneNumber: "" || null,
  email: "",
  PhoneNumberInput: true,
  showModal: false,
  autoFocus: true,
  isLoggedIn: false,
  welcomeMessage: "",
  userId: "",
  userType: [],
  type: "Genuine",
  role: "",
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
      // console.log(data.data?.user.roles);
      console.log("loginwithpass", data);
      console.log("loginwithpass", data.data?.token);
      return {
        token: data.data?.token,
        FirstName: data.data?.user.name,
        LastName: data.data.user?.surname,
        userId: data.data?.user.id,
        userType: [...data.data?.user.roles],
        type: data.data?.user.type,
        isLoggedIn: true,
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
      console.log("verifyotp",data);
      return {
        token: data.data?.token,
        userProfile: data.data?.user,
        FirstName: data.data?.user.name,
        LastName: data.data?.user.surname,
        userId: data.data?.user.id,
        userType: [...data.data?.user.roles],
        type: data.data?.user.type,
        isLoggedIn: true,
      };
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// daryafte etelaat karbar:checked
const fetchUserProfile = createAsyncThunk<
  {
    data: any;
    FirstName: string;
    LastName: string;
    email: string;
    type: string;
    userType: {
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
  },
  void,
  { state: RootState }
>("userData/fetchUserProfile", async (_, { getState, rejectWithValue }) => {
  try {
    // console.log(getState().userData.token);
    const { data } = await app.get(`/user/show`, {
      headers: {
        authorization: `Bearer ${getState().userData.token}`,
      },
    });
    console.log("userprofile",data);
    return {
      data: data.data,
      FirstName: data.data.name,
      email: data.data.email,
      type: data.data.type,
      userType: [...data.data.roles],
      userId: data.data.id,
      LastName: data.data.surname,
      // numberOfAnnouncements: data.data.Announcement.length,
    };
  } catch (error: any) {
    console.log(error.response.data.message);
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
    deleteDataFromCookie: (state) => {
      state.token = "";
      state.userId = "";
      deleteCookie("token");
      sessionStorage.removeItem("userId");
      localStorage.clear();
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
    // fetchUserProfile
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
      state.userType = action.payload.userType;
      state.userId = action.payload.userId;
      sessionStorage.setItem("userId", state.userId);
      state.userType = action.payload.userType;
      state.role = state.userType?.find(
        (item: userRoleType) => item.name_en.toLowerCase() === "admin"
      )
        ? "Admin"
        : "User";
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.status = "failed";
      state.errorOnProfileHandler = true;
      state.errorMessage = "خطا در دریافت اطلاعات کاربری";
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
          maxAge: 24 * 60 * 60,
          secure: true,
        });
        state.FirstName = action.payload.FirstName;
        state.LastName = action.payload.LastName;
        state.type = action.payload.type;
        state.userType = action.payload.userType;
        state.role = state.userType?.find(
          (item: userRoleType) => item.name_en.toLowerCase() === "admin"
        )
          ? "Admin"
          : "User";
        state.userId = action.payload.userId;
        sessionStorage.setItem("userId", state.userId);
        state.successMessage = `${
          state.FirstName + state.LastName
        } عزیز با موفقیت وارد پنل کاربری خود شدید.`;
        state.errorMessage = "";
        state.isLoggedIn = action.payload.isLoggedIn;
      }
    );
    builder.addCase(
      verifyUserByOTPInLoginAndRegistration.rejected,
      (state, action) => {
        state.status = "failed";
        state.errorMessage = "کد وارد شده صحیح نمی باشد.";
        state.showModal = true;
        state.isLoggedIn = false;
      }
    );
    // fetchUserInLoginWithPassword
    builder.addCase(fetchUserInLoginWithPassword.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserInLoginWithPassword.fulfilled, (state, action) => {
      state.showModal = false;
      state.status = "success";
      state.token = action.payload.token;
      setCookie("token", state.token, {
        path: "/",
        maxAge: 24 * 60 * 60,
        secure: true,
      });
      state.FirstName = action.payload.FirstName;
      state.LastName = action.payload.LastName;
      state.userType = action.payload.userType;
      state.userId = action.payload.userId;
      state.isLoggedIn = action.payload.isLoggedIn;
      sessionStorage.setItem("userId", state.userId);
      state.successMessage = `${
        state?.FirstName + " " + state?.LastName
      } عزیز با موفقیت وارد پنل کاربری خود شدید.`;
      state.errorMessage = "";
      state.type = action.payload.type;
      state.role = state.userType?.find(
        (item: userRoleType) => item.name_en.toLowerCase() === "admin"
      )
        ? "Admin"
        : "User";
    });
    builder.addCase(fetchUserInLoginWithPassword.rejected, (state, action) => {
      state.status = "failed";
      state.errorMessage = "رمز عبور اشتباه است.";
      state.showModal = true;
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
  readPhoneNumberFromLocalStroage,
  getIdFromLocal,
  deleteDataFromCookie,
} = userSlice.actions;
export {
  fetchUserProfile,
  fetchUserInLoginWithPassword,
  verifyUserByOTPInLoginAndRegistration,
};
