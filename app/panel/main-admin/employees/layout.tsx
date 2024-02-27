import MainadminEmployeesSidebar from "./components/mainadmin-employees-sidebar";
import { MainadminEmployeesSidebarInfo } from "@/lib/data";

const EmployeesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row">
      {children}
    </div>
  );
};
export default EmployeesLayout;
