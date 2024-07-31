import * as yup from "yup";
const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,24}$/;
const PhoneNumberRegex = /^(09)\d{9}$/;

export const HomeFormSubmissionSchema = yup.object().shape({
  FullName: yup.string().min(6).required("لطفا نام کامل خود را وارد کنید."),
  PhoneNumber: yup.string().required("").max(11).matches(PhoneNumberRegex, " "),
  Description: yup.string().required("").min(3),
  email: yup
    .string()
    .email("ایمیل نادرست است.")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .required(" "),
});

export const UserPanelPersonalSchema = yup.object().shape({
  FirstName: yup
    .string()
    .min(3)
    .required("لطفا نام خود را وارد کنید.")
    .required(" "),
  LastName: yup
    .string()
    .min(3)
    .required("لطفا نام خانوادگی خود را وارد کنید.")
    .required(" "),
  Password: yup.string().required("").matches(PasswordRegex, " "),
  type: yup.string().required(""),
  shenase_melli: yup.string().required(""),
  shomare_sabt: yup.string().required("")
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
