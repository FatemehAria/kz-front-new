import axios from "axios";

export const login = async (PhoneNumber) => {
  try {
    const { data } = await axios.post(
      "https://keykavoos.liara.run/User/Signup1",
      {
        PhoneNumber,
      }
    );
    console.log(data);
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const validateOTP = async (OTP, PhoneNumber) => {
  try {
    const { data } = await axios.post(
      "https://keykavoos.liara.run/User/Signup2",
      {
        OTP,
        PhoneNumber,
      }
    );
    console.log(data);
  } catch (error) {
    console.log(error.response.data.message);
  }
};
