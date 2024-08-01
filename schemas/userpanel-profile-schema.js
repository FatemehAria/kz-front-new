import * as yup from "yup";

const PasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const PhoneNumberRegex = /^(09)\d{9}$/;

export const HoghoghiAdditionalInfoSchema = yup.object().shape({});

export const UserRegistrationPersonalSchema = yup.object().shape({
  FirstName: yup.string("").min(3, "نام حداقل سه حرفی باشد.").required("لطفا نام خود را وارد کنید."),
  LastName: yup
    .string("")
    .min(3, "نام خانوادگی حداقل سه حرفی باشد.")
    .required("لطفا نام خانوادگی خود را وارد کنید."),
  Password: yup
    .string("")
    .matches(
      PasswordRegex,
      "رمز عبور باید حداقل 8 کاراکتر شامل یک حرف بزرگ، یک حرف کوچک باشد."
    )
    .required("رمز عبور را وارد کنید."),
  type: yup.string("").required(""),
  shenase_melli: yup.string().min(10,"کدملی صحیح نمی باشد.").max(10,"کدملی صحیح نمی باشد.").when("type", {
    is: (val) => val === "حقوقی",
    then: (schema) => schema.required("شناسه ملی خود را وارد کنید."),
  }),
  shomare_sabt: yup.string().when("type", {
    is: (val) => val === "حقوقی",
    then: (schema) => schema.required("شماره ثبت را وارد کنید."),
  }),
});

export const LoginSchema = yup.object().shape({
  PhoneNumber: yup.string().required("").max(11).matches(PhoneNumberRegex, " "),
});
