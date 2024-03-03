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
  birthDate: "",
  email: "",
  PhoneNumberInput: true,
  showModal: false,
  autoFocus: true,
  isLoggedIn: false,
  welcomeMessage: "",
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
        "https://keykavoos.liara.run/User/getProfile",
        {
          headers: {
            authorization: `Bearer ${getState().userRole.localToken}`,
          },
        }
      );
      console.log(data);
      return {
        data,
        FirstName: data.FirstName,
        LastName: data.LastName,
        birthDate: data.Date_of_birth,
        email: data.email,
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
    deleteToken: (state) => {
      state.token = "";
      deleteCookie("token");
    },
    changePhoneNumber: (state) => {
      state.changePhoneNumber = true;
      localStorage.removeItem("PhoneNumber");
    },
    loadScript: (state) => {
      state.loadscript = true;
    },
    getTokenFromLocal: (state) => {
      state.localToken = getCookie("token");
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
} = userSlice.actions;
export { fetchUserProfile, fetchUserInOTPValidation };
