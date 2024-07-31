"use client";
import React, { useContext } from "react";
import Logo from "../authorization/components/logo";
import { useFormik } from "formik";
import { LoginSchema } from "@/schemas/userpanel-profile-schema";
import Modal from "@/components/modal";
import { AuthContext } from "./context/AuthContext";
import { useCaptcha } from "@/hooks/useCaptcha";
import styles from "./styles/login.module.css";
import OtpLoginMain from "./components/OtpLoginMain";
import { useStoreNumInLocal } from "@/hooks/useStoreNumInLocal";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../contact-us/components/form/form-inputs";
import {
  fetchUserInLoginWithPassword,
  fetchUserInOTPLogin,
  openModal,
} from "@/redux/features/user/userSlice";
import { useRouter } from "next/navigation";
// import ReCAPTCHA from 'react-google-recaptcha'

type LoginProps = {
  setLoginApproach: React.Dispatch<React.SetStateAction<number>>;
  loginApproach: number;
};

const Login = ({ setLoginApproach, loginApproach }: LoginProps) => {
  const { setAuthSteps, authSteps } = useContext(AuthContext);
  const { showModal } = useSelector((state: any) => state.userData);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmission = async () => {
    // login ba phone
    if (result && loginApproach === 0) {
      dispatch(openModal(true));
      await dispatch<any>(fetchUserInOTPLogin({ mobile: values.PhoneNumber }));
      // login ba pass
    } else if (result && loginApproach === 1) {
      await dispatch<any>(
        fetchUserInLoginWithPassword({
          mobile: values.PhoneNumber,
          password: values.Password,
        })
      );
      // redirect be profile
      router.push("/panel/user/dashboard");
    }
  };

  const { values, errors, handleSubmit, handleChange, isValid } = useFormik({
    initialValues: {
      PhoneNumber: "",
      Password: "",
    },
    onSubmit: handleSubmission,
    validationSchema: LoginSchema,
    validateOnMount: true,
  });

  const { result, setAnswer, answer, mathProblem, wrongAnswerMessage } =
    useCaptcha(values.PhoneNumber);
  useStoreNumInLocal(values.PhoneNumber);

  return (
    <React.Fragment>
      <div
        className="mx-auto grid grid-cols-1 font-YekanBakh rounded-3xl overflow-hidden shadow-2xl shadow-[13px_0_61px_-24px_rgba(0, 0, 0, 0.15)]"
        dir="rtl"
      >
        <div className="py-[5%] w-full relative px-[5%]">
          <Modal
            showModal={showModal}
            data={values.PhoneNumber}
            text={
              values.PhoneNumber
                ? "شماره تماس زیر مورد تایید است؟"
                : "شماره همراه خود را وارد کنید"
            }
            buttonText={values.PhoneNumber ? "تغییر شماره همراه" : "تایید"}
            setSteps={setAuthSteps}
            executeFunction2={() => handleSubmission()}
            isLoggedIn={true}
          />

          <Logo />
          <div className="flex flex-row justify-between items-center mb-8">
            <span
              onClick={() => setLoginApproach(0)}
              className={loginApproach === 0 ? styles.approach : "border-none"}
            >
              ورود با کد تایید
            </span>
            <span
              onClick={() => setLoginApproach(1)}
              className={loginApproach === 1 ? styles.approach : "border-none"}
            >
              ورود با رمز عبور
            </span>
          </div>

          {loginApproach === 0 ? (
            <OtpLoginMain
              PhoneNumber={values.PhoneNumber}
              onChangeHandler={handleChange}
              phoneNumberError={errors.PhoneNumber}
              isValid={isValid}
              onSubmitHandler={handleSubmit}
              answer={answer}
              mathProblem={mathProblem}
              setAnswer={setAnswer}
              wrongAnswerMessage={wrongAnswerMessage}
              result={result}
            />
          ) : (
            <OtpLoginMain
              PhoneNumber={values.PhoneNumber}
              onChangeHandler={handleChange}
              phoneNumberError={errors.PhoneNumber}
              isValid={isValid}
              onSubmitHandler={handleSubmit}
              answer={answer}
              mathProblem={mathProblem}
              setAnswer={setAnswer}
              wrongAnswerMessage={wrongAnswerMessage}
              result={result}
            >
              <FormInput
                onChange={handleChange}
                value={values.Password}
                label="رمز عبور"
                type="text"
                name="Password"
                error={errors.Password}
                autoFocus={true}
              />
            </OtpLoginMain>
          )}

          {/* <ReCAPTCHA sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`} onChange={(value) => console.log(value)} /> */}
        </div>
      </div>
    </React.Fragment>
  );
};
export default Login;
