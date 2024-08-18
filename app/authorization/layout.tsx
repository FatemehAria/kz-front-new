import ToastProvider from "@/toastify/ToastProvider";
import AuthContextWrapper from "./context/AuthContextWrapper";
import InfoContextWrapper from "./context/InfoContextWrapper";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="sm:max-w-lg w-full">
        <InfoContextWrapper>
          <AuthContextWrapper>
            <ToastProvider>{children}</ToastProvider>
          </AuthContextWrapper>
        </InfoContextWrapper>
      </div>
    </div>
  );
};
export default AuthLayout;
