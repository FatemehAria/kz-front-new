import ToastProvider from "@/toastify/ToastProvider";
import AuthContextWrapper from "./context/AuthContextWrapper";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="sm:max-w-lg w-full">
        <AuthContextWrapper>
          <ToastProvider>{children}</ToastProvider>
        </AuthContextWrapper>
      </div>
    </div>
  );
};
export default AuthLayout;
