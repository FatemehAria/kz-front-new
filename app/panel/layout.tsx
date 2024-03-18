"use client";
import PanelNav from "@/components/panel/panel-nav";
import PanelSidebar from "@/components/panel/panel-sidebar";
import { useEffect, useState } from "react";
import { mainAdminSidebarOptions, userSidebarOptions } from "@/lib/data";
import { useDispatch, useSelector } from "react-redux";
import PanelNavSmall from "@/components/panel/panel-nav-small";
import PanelSidebarSmall from "@/components/panel/panel-sidebar-small";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import { useRouter } from "next/navigation";

const PanelLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    localToken,
    localUserId,
    userProfile,
    userType,
    status,
    numberOfAnnouncements,
  } = useSelector((store: any) => store.userData);
  const [showAnnouncementDropdown, setShowAnnouncementDropdown] =
    useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
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
    dispatch(getIdFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);

  return (
    <div
      className="font-YekanBakh flex w-full flex-row relative"
      style={{ boxShadow: "0px 0px 90px 2px rgba(0, 0, 0, 0.25)" }}
      dir="rtl"
    >
      {localToken && localUserId && (
        <>
          <div className="hidden lg:block">
            <PanelSidebar
              sideOptions={
                userType === "User"
                  ? userSidebarOptions
                  : mainAdminSidebarOptions
              }
              status={status}
            />
          </div>
          <div className="w-full lg:overflow-hidden">
            <div className="hidden md:block">
              <PanelNav
                userProfile={userProfile}
                status={status}
                userType={userType}
                numberOfAnnouncements={numberOfAnnouncements}
                setShowAnnouncementDropdown={setShowAnnouncementDropdown}
                showAnnouncementDropdown={showAnnouncementDropdown}
              />
            </div>
            <div
              className="bg-[#EAEFF6] h-full p-[5%]"
              onMouseEnter={() => setShowAnnouncementDropdown(false)}
            >
              {children}
            </div>
            <div>
              {userType === "User" && (
                <PanelSidebarSmall sideOptions={userSidebarOptions} />
              )}
              {userType === "Admin" && (
                <PanelSidebarSmall sideOptions={mainAdminSidebarOptions} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default PanelLayout;
