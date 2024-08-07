"use client";
import PanelNav from "@/components/panel/panel-nav";
import PanelSidebar from "@/components/panel/panel-sidebar";
import { useContext, useEffect, useState } from "react";
import { mainAdminSidebarOptions, userSidebarOptions } from "@/lib/data";
import { useDispatch, useSelector } from "react-redux";
import PanelNavSmall from "@/components/panel/panel-nav-small";
import PanelSidebarSmall from "@/components/panel/panel-sidebar-small";
import {
  fetchUserProfile,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import nextarrow from "@/public/forwardarrow.svg";
import prevarrow from "@/public/backarrow.svg";
import PlanContextWrapper from "./admin/plan-management/context/PlanContextWrapper";
import ValueIdContextWrapper from "./admin/plan-management/context/ValueIdContextWrapper";
import DepartmentContextWrapper from "./admin/context/department-context/DepartmentContextWrapper";
import PermissionContextWrapper from "./admin/context/permission-context/PermissionContextWrapper";
import UserContextWrapper from "./admin/context/user-context/UserContextWrapper";
import { getAllPlans, getAllSiteTypes } from "@/utils/utils";
import { OrderSubmissionContext } from "./context/order-submission-contexts/OrderSubmissionContext";
import OrderSubmissionContextWrapper from "./context/order-submission-contexts/OrderSubmissionContextWrapper";

const PanelLayout = ({ children }: { children: React.ReactNode }) => {
  const { token, userProfile, status, numberOfAnnouncements, role } =
    useSelector((store: any) => store.userData);
  const { setAllPlans, setSiteTypes } = useContext(OrderSubmissionContext);
  const [showAnnouncementDropdown, setShowAnnouncementDropdown] =
    useState(false);
  const dispatch = useDispatch();

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
  }, []);

  useEffect(() => {
    getAllPlans(token, setAllPlans);
    getAllSiteTypes(token, setSiteTypes);
  }, []);

  // useEffect(() => {
  //   if (!token) {
  //     dispatch(deleteDataFromCookie());
  //     router.push("/");
  //   }
  // }, [token]);
  
  return (
    <OrderSubmissionContextWrapper>
      <UserContextWrapper>
        <DepartmentContextWrapper>
          <PermissionContextWrapper>
            <ValueIdContextWrapper>
              <PlanContextWrapper>
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
                          numberOfAnnouncements={numberOfAnnouncements}
                          setShowAnnouncementDropdown={
                            setShowAnnouncementDropdown
                          }
                          showAnnouncementDropdown={showAnnouncementDropdown}
                        />
                      </div>
                      <div
                        className="bg-[#EAEFF6] h-full p-[5%]"
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
              </PlanContextWrapper>
            </ValueIdContextWrapper>
          </PermissionContextWrapper>
        </DepartmentContextWrapper>
      </UserContextWrapper>
    </OrderSubmissionContextWrapper>
  );
};
export default PanelLayout;
