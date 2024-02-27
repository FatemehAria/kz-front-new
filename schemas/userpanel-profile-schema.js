import * as yup from "yup";
const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,24}$/;
const PhoneNumberRegex = /^(09)\d{9}$/;

export const UserPanelPersonalSchema = yup.object().shape({
  FirstName: yup.string().min(3).required("لطفا نام خود را وارد کنید."),
  LastName: yup.string().min(3).required("لطفا نام خانوادگی خود را وارد کنید."),
  Date_of_birth: yup.string(),
  email: yup.string().email("ایمیل نادرست است.").required(" "),
});

export const UserPanelMoreInfoSchema = yup.object().shape({
  gender: yup.string().required(" "),
  LinkedIn: yup.string(),
  Instagram: yup.string(),
  website: yup.string(),
});

export const LoginSchema = yup.object().shape({
  PhoneNumber: yup.string().required("").max(11).matches(PhoneNumberRegex, " "),
});
