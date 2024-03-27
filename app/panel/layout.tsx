"use client";
import PanelNav from "@/components/panel/panel-nav";
import PanelSidebar from "@/components/panel/panel-sidebar";
import { useEffect, useState } from "react";
import { mainAdminSidebarOptions, userSidebarOptions } from "@/lib/data";
import { useDispatch, useSelector } from "react-redux";
import PanelNavSmall from "@/components/panel/panel-nav-small";
import PanelSidebarSmall from "@/components/panel/panel-sidebar-small";
import {
  deleteDataFromCookie,
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import nextarrow from "../../public/forwardarrow.svg";
import prevarrow from "../../public/backarrow.svg";
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
    dispatch(getIdFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);

  useEffect(() => {
    if (!localToken && localUserId) {
      dispatch(deleteDataFromCookie());
      router.push("/");
    }
  }, [localToken, localUserId]);

  return (
    <div
      className="font-YekanBakh flex w-full flex-row relative min-h-screen"
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
            <div>
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
            <div className="md:hidden flex flex-row bg-[#4866CF] h-20 transition-all rounded-md w-full">
              <Image src={prevarrow} alt="" onClick={() => handlePrevClick()} />
              <PanelSidebarSmall sideOptions={displayedItems} />
              <Image src={nextarrow} alt="" onClick={() => handleNextClick()} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default PanelLayout;
