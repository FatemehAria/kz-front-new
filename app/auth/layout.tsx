import CaptchaProvider from "@/google-captcha/CaptchaProvider";
import ToastProvider from "@/toastify/ToastProvider";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[500px] mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <CaptchaProvider>
        <ToastProvider>{children}</ToastProvider>
      </CaptchaProvider>
    </div>
  );
};
export default AuthLayout;
