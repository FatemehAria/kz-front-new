import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

const initialState = {
  status: "idle",
  userProfile: {},
  userInfoOnLogin: {},
  FirstName: "",
  LastName: "",
  token: "",
  errorMessage: "",
  successMessage: "",
  changePhoneNumber: false,
  loadscript: false,
  localToken: "",
  localUserId:"",
  PhoneNumber: "",
  email: "",
  PhoneNumberInput: true,
  showModal: false,
  autoFocus: true,
  isLoggedIn: false,
  welcomeMessage: "",
  userId: "",
};

const fetchUserInOTPValidation = createAsyncThunk(
  "userData/fetchUserInOTPValidation",
  async (payload, { rejectWithValue }) => {
    const { PhoneNumber, OTP } = payload;
    try {
      const { data } = await axios.post(
        "https://keykavoos.liara.run/Client/OTP",
        {
          PhoneNumber,
          OTP,
        }
      );
      console.log(data);
      return {
        token: data.User?.token,
        userInfoOnLogin: data.User,
        FirstName: data.User?.FirstName,
        LastName: data.User?.LastName,
        isLoggedIn: data.isLogin,
        welcomeMessage: data.welcome,
        userId: data.User?._id,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

const fetchUserProfile = createAsyncThunk(
  "userRole/fetchUserProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://keykavoos.liara.run/Client/User/${getState().userData.localUserId}`,
        {
          headers: {
            authorization: `Bearer ${getState().userData.localToken}`,
          },
        }
      );
      console.log(data);
      return {
        data: data.data,
        FirstName: data.data.FirstName,
        LastName: data.data.LastName,
        email: data.data.email,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    updateStatus: (state) => {
      state.status = "idle";
    },
    closeModal: (state, action) => {
      state.showModal = action.payload;
    },
    handleAutoFocus: (state, action) => {
      state.autoFocus = action.payload;
    },
    deleteDataFromCookie: (state) => {
      state.token = "";
      state.userId = "";
      deleteCookie("token");
      deleteCookie("userId");
    },
    changePhoneNumber: (state) => {
      state.changePhoneNumber = true;
      localStorage.removeItem("PhoneNumber");
    },
    readPhoneNumberFromLocalStroage: (state) => {
      state.PhoneNumber = localStorage.getItem("PhoneNumber");
    },
    loadScript: (state) => {
      state.loadscript = true;
    },
    getTokenFromLocal: (state) => {
      state.localToken = getCookie("token");
    },
    getIdFromLocal: (state) => {
      state.localUserId = getCookie("userId");
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
    builder.addCase(fetchUserInOTPValidation.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserInOTPValidation.fulfilled, (state, action) => {
      state.showModal = true;
      state.status = "success";
      state.token = action.payload.token;
      setCookie("token", state.token, {
        path: "/",
        maxAge: 24 * 60 * 60,
        secure: true,
      });
      state.userInfoOnLogin = action.payload.userInfoOnLogin;
      state.FirstName = action.payload.FirstName;
      state.LastName = action.payload.LastName;
      state.welcomeMessage = action.payload.welcomeMessage;
      state.userId = action.payload.userId;
      setCookie("userId", state.userId, {
        path: "/",
        secure: true,
      });
      if (!state.userInfoOnLogin) {
        state.successMessage = "لطفا اطلاعات خود را تکمیل کنید.";
      } else {
        state.successMessage = `${state.FirstName} ${state.LastName} عزیز با موفقیت وارد پنل کاربری خود شدید.`;
      }
      state.errorMessage = "";
    });
    builder.addCase(fetchUserInOTPValidation.rejected, (state) => {
      state.showModal = true;
      state.status = "failed";
      state.errorMessage = `      کد یکبار مصرف مورد تایید نمی باشد
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
      state.error = "";
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
export const {
  updateStatus,
  deleteToken,
  changePhoneNumber,
  loadScript,
  getTokenFromLocal,
  changeUserInfo,
  updateUserProfile,
  updateInputDisability,
  closeModal,
  handleAutoFocus,
  readPhoneNumberFromLocalStroage,
  getIdFromLocal,
  deleteDataFromCookie
} = userSlice.actions;
export { fetchUserProfile, fetchUserInOTPValidation };
