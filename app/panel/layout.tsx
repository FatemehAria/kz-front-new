"use client";
import PanelNav from "@/components/panel/panel-nav";
import PanelSidebar from "@/components/panel/panel-sidebar";
import { useContext, useEffect, useState } from "react";
import { mainAdminSidebarOptions, userSidebarOptions } from "@/lib/data";
import { useDispatch, useSelector } from "react-redux";
import PanelNavSmall from "@/components/panel/panel-nav-small";
import PanelSidebarSmall from "@/components/panel/panel-sidebar-small";
import {
  deleteDataFromStorage,
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import Image from "next/image";
import nextarrow from "@/public/forwardarrow.svg";
import prevarrow from "@/public/backarrow.svg";
import DepartmentContextWrapper from "./admin/context/department-context/DepartmentContextWrapper";
import PermissionContextWrapper from "./admin/context/permission-context/PermissionContextWrapper";
import UserContextWrapper from "./admin/context/user-context/UserContextWrapper";
import {
  getAllBrands,
  getAllDepartments,
  getAllPermissions,
  getAllPlans,
  getAllPositions,
  getAllRole,
  getAllSiteTypes,
  getAllUsers,
  getUserNotification,
} from "@/utils/utils";
import { OrderSubmissionContext } from "./context/order-submission-contexts/OrderSubmissionContext";
import OrderSubmissionContextWrapper from "./context/order-submission-contexts/OrderSubmissionContextWrapper";
import { DepartmentContext } from "./admin/context/department-context/DepartmentContext";
import { RoleContext } from "./admin/context/role-context/RoleContext";
import { PermissionContext } from "./admin/context/permission-context/PermissionContext";
import { PositionContext } from "./admin/context/position-context/PositionContext";
import { UserContext } from "./admin/context/user-context/UserContext";
import AttrIdContextWrapper from "./admin/plan-management/context/AttrIdContextWrapper";
import { useRouter } from "next/navigation";
import { BrandType } from "./admin/org_management/brands/page";

const PanelLayout = ({ children }: { children: React.ReactNode }) => {
  const { token, userProfile, status, numberOfAnnouncements, role, userId } =
    useSelector((store: any) => store.userData);
  const router = useRouter();
  const [userNotifications, setUserNotifications] = useState([]);
  // const [role, setRole] = useState("");
  const { setAllPlans, setSiteTypes } = useContext(OrderSubmissionContext);
  const { setRoles, setDataLoading } = useContext(RoleContext);
  const { setPermissions, setPermissionStatus } = useContext(PermissionContext);
  const { setPositions } = useContext(PositionContext);
  const { setDepartments } = useContext(DepartmentContext);
  const { setAllUsersData, setUsersStatus } = useContext(UserContext);
  const [brands, setBrands] = useState<BrandType[]>([]);
  const [showAnnouncementDropdown, setShowAnnouncementDropdown] =
    useState(false);
  const dispatch = useDispatch();
  // console.log(userNotifications);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = userSidebarOptions.slice(startIndex, endIndex);

  const handleNextClick = () => {
    setCurrentPage((prevPage) =>
      prevPage + 1 < Math.ceil(userSidebarOptions.length / itemsPerPage)
        ? prevPage + 1
        : prevPage
    );
  };

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : prevPage));
  };

  useEffect(() => {
    dispatch(getTokenFromLocal());
    dispatch<any>(fetchUserProfile());
    dispatch(getIdFromLocal());
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      Promise.all([
        getAllPlans(token, setAllPlans),
        getUserNotification(token, Number(userId), setUserNotifications),
        getAllSiteTypes(token, setSiteTypes),
        // getAllDepartments(token, setDepartments),
        // getAllUsers(token, setAllUsersData, setUsersStatus),
        // getAllPositions(token, setPositions),
        // getAllPermissions(token, setPermissions, setPermissionStatus),
        // getAllRole(token, setRoles, setDataLoading),
        getAllDepartments(token, setDepartments),
        // getAllBrands(setBrands),
      ]);
    }
  }, [
    token,
    setAllPlans,
    setSiteTypes,
    setDepartments,
    userId,
    setUserNotifications
    // setPermissions,
    // setUsersStatus,
    // setPositions,
    // setRoles,
    // setAllUsersData,
    // setPermissionStatus,
  ]);
  // useEffect(() => {
  //   if (!token) {
  //     dispatch(deleteDataFromStorage());
  //     router.push("/");
  //   }
  // }, [token]);
  return (
    <OrderSubmissionContextWrapper>
      <UserContextWrapper>
        <DepartmentContextWrapper>
          <PermissionContextWrapper>
            <AttrIdContextWrapper>
              <div
                className="font-YekanBakh flex w-full flex-row relative min-h-screen"
                style={{ boxShadow: "0px 0px 90px 2px rgba(0, 0, 0, 0.25)" }}
                dir="rtl"
              >
                {/* {token && ( */}
                  <>
                    <div className="hidden lg:block">
                      <PanelSidebar
                        sideOptions={
                          role === "Admin"
                            ? mainAdminSidebarOptions
                            : userSidebarOptions
                        }
                        status={status}
                      />
                    </div>
                    <div className="w-full lg:overflow-hidden">
                      <div>
                        <PanelNav
                          userProfile={userProfile}
                          status={status}
                          userType={role}
                          numberOfAnnouncements={userNotifications}
                          setShowAnnouncementDropdown={
                            setShowAnnouncementDropdown
                          }
                          showAnnouncementDropdown={showAnnouncementDropdown}
                        />
                      </div>
                      <div
                        className="bg-[#EAEFF6] h-full md:p-[5%] py-[5%]"
                        onMouseEnter={() => setShowAnnouncementDropdown(false)}
                      >
                        {children}
                      </div>
                      <div className="md:hidden flex flex-row bg-[#4866CF] transition-all rounded-md w-full">
                        <Image
                          src={prevarrow}
                          alt=""
                          onClick={() => handlePrevClick()}
                          className={`${currentPage === 0 ? "hidden" : "flex"}`}
                        />
                        <PanelSidebarSmall sideOptions={displayedItems} />
                        <Image
                          src={nextarrow}
                          alt=""
                          onClick={() => handleNextClick()}
                          className={`${
                            currentPage + 1 ===
                            Math.ceil(userSidebarOptions.length / itemsPerPage)
                              ? "hidden"
                              : "flex"
                          }`}
                        />
                      </div>
                    </div>
                  </>
                {/* )} */}
              </div>
            </AttrIdContextWrapper>
          </PermissionContextWrapper>
        </DepartmentContextWrapper>
      </UserContextWrapper>
    </OrderSubmissionContextWrapper>
  );
};
export default PanelLayout;
