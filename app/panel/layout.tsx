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
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import { redirect, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import Loading from "../loading";

const PanelLayout = ({ children }: { children: React.ReactNode }) => {
  const { userProfile, localToken } = useSelector(
    (store: any) => store.userRole
  );
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

  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const token = getCookie("token");
  //   if (token) {
  //     dispatch(getTokenFromLocal());
  //     dispatch<any>(fetchUserProfile());
  //     setLoading(false);
  //   } else {
  //     setLoading(true);
  //     router.replace("/");
  //   }
  // }, []);

  // if (loading) {
  //   return Loading();
  // }

  return (
    <div
      className="w-[100%] lg:w-[90%] border overflow-auto mx-auto rounded-3xl lg:flex lg:my-[1%] font-YekanBakh"
      style={{ boxShadow: "0px 0px 90px 2px rgba(0, 0, 0, 0.25)" }}
      dir="rtl"
    >
      {/* {localToken && ( */}
        <>
          {userProfile.UserType === "Student" && (
            <div className="hidden lg:block">
              <PanelSidebar sideOptions={studentSidebarOptions} />
            </div>
          )}
          {/* {userProfile.UserType === "User" && ( */}
            <div className="hidden lg:block">
              <PanelSidebar sideOptions={userSidebarOptions} />
            </div>
          {/* )} */}
          {userProfile.UserType === "Employer" && (
            <div className="hidden lg:block">
              <PanelSidebar sideOptions={employerSidebarOptions} />
            </div>
          )}
          {userProfile.UserType === "GeneralAdmin" && (
            <div className="hidden lg:block">
              <PanelSidebar sideOptions={mainAdminSidebarOptions} />
            </div>
          )}
          {userProfile.UserType === "Admin" && (
            <div className="hidden lg:block">
              <PanelSidebar sideOptions={AdminSidebarOptions} />
            </div>
          )}
          <div className="w-full lg:overflow-auto">
            <div className="hidden lg:block">
              <PanelNav
                userRole={userProfile.UserType}
                userFirstName={userProfile.FirstName}
                userLastName={userProfile.LastName}
                userGender={userProfile.gender}
              />
            </div>
            <div className="lg:hidden">
              <PanelNavSmall userRole={userProfile.UserType} />
            </div>
            {children}
            <div className="lg:hidden mt-[30%] flex flex-row border-t border-b border-black py-[3%]">
              <button onClick={() => handlePrevClick()}>
                <img src="/sidebar/rightarrow.svg" alt="arrow" />
              </button>
              <PanelSidebarSmall sideOptions={displayedItems} />
              <button onClick={() => handleNextClick()}>
                <img src="/sidebar/leftarrow.svg" alt="arrow" />
              </button>
            </div>
          </div>
        </>
      {/* )} */}
    </div>
  );
};
export default PanelLayout;
