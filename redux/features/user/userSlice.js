import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

const initialState = {
  status: "idle",
  userRole: {},
  userProfile: {},
  FirstName: "",
  LastName: "",
  token: "",
  error: "",
  changePhoneNumber: false,
  loadscript: false,
  localToken: "",
  birthDate: "",
  email: "",
};

const fetchUserRole = createAsyncThunk(
  "userRole/fetchUserRole",
  async (payload, { rejectWithValue }) => {
    const { PhoneNumber, Password } = payload;
    try {
      const { data } = await axios.post(
        "https://keykavoos.liara.run/User/Login",
        {
          PhoneNumber,
          Password,
        }
      );
      // console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const fetchUserInOTPValidation = createAsyncThunk(
  "userRole/fetchUserInOTPValidation",
  async (payload, { rejectWithValue }) => {
    const { PhoneNumber, OTP } = payload;
    try {
      const { data } = await axios.post(
        "https://keykavoos.liara.run/User/SendOTP",
        {
          PhoneNumber,
          OTP,
        }
      );
      // console.log(data);
      return { data, token: data.token };
    } catch (error) {
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
  name: "userRole",
  initialState,
  reducers: {
    updateStatus: (state) => {
      state.status = "idle";
    },
    deleteToken: (state) => {
      state.token = "";
      localStorage.clear();
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserRole.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserRole.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.userRole = { ...action.payload.data };
      state.error = "";
    });
    builder.addCase(fetchUserRole.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
    builder.addCase(fetchUserInOTPValidation.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserInOTPValidation.fulfilled, (state, action) => {
      state.status = "success";
      state.token = action.payload.token;
      state.userRole = action.payload.data;
      setCookie("token", state.token, {
        path: "/",
        maxAge: 24 * 60 * 60,
        secure: true,
      });
      state.error = "";
    });
    builder.addCase(fetchUserInOTPValidation.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });

    builder.addCase(fetchUserProfile.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.status = "succeeded";
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
} = userSlice.actions;
export { fetchUserRole, fetchUserProfile, fetchUserInOTPValidation };
