"use client";
import PanelNav from "@/components/panel/panel-nav";
import PanelSidebar from "@/components/panel/panel-sidebar";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  AdminSidebarOptions,
  mainAdminSidebarOptions,
  studentSidebarOptions,
  userSidebarOptions,
} from "@/lib/data";
import { employerSidebarOptions } from "@/lib/data";
import { useDispatch, useSelector } from "react-redux";
import PanelNavSmall from "@/components/panel/panel-nav-small";
import PanelSidebarSmall from "@/components/panel/panel-sidebar-small";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import { redirect, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import Loading from "../loading";

const PanelLayout = ({ children }: { children: React.ReactNode }) => {
  const { localToken, userId, userProfile, userType } = useSelector(
    (store: any) => store.userData
  );
  // console.log(userType);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = userSidebarOptions.slice(startIndex, endIndex);
  const router = useRouter();
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
  console.log(userId);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const token = getCookie("token");
    // if (token) {
    dispatch(getTokenFromLocal());
    dispatch(getIdFromLocal());
    dispatch<any>(fetchUserProfile());
    // setLoading(false);
    // } else {
    //   setLoading(true);
    //   router.replace("/");
    // }
  }, []);

  // if (loading) {
  //   return Loading();
  // }

  return (
    // w-[100%] lg:w-[90%] border overflow-auto mx-auto rounded-3xl lg:my-[2%]
    <div
      className="font-YekanBakh flex w-full h-full flex-row"
      style={{ boxShadow: "0px 0px 90px 2px rgba(0, 0, 0, 0.25)" }}
      dir="rtl"
    >
      {/* {localToken && ( */}
      <>
        <div className="hidden lg:block">
          <PanelSidebar sideOptions={userSidebarOptions} />
          {/* <PanelSidebar sideOptions={mainAdminSidebarOptions} /> */}
        </div>
        <div className="w-full lg:overflow-hidden">
          <div className="hidden md:block">
            <PanelNav userProfile={userProfile} />
          </div>
          <div className="bg-[#EAEFF6] h-full p-[5%]">{children}</div>
          <div>
            <PanelSidebarSmall sideOptions={userSidebarOptions}/>
          </div>
        </div>
      </>
      {/* )} */}
    </div>
  );
};
export default PanelLayout;
