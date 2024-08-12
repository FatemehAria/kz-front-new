import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteDataFromStorage,
  logoutUser,
  openModal,
} from "@/redux/features/user/userSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import notification from "../../public/Panel/notif.svg";
import maleicon from "../../public/maleicon.svg";
import exit from "../../public/Panel/exit.svg";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { signOut, useSession } from "next-auth/react";
type NavProps = {
  userProfile: any;
  status: string;
  userType: string;
  numberOfAnnouncements: number;
  setShowAnnouncementDropdown: Dispatch<SetStateAction<boolean>>;
  showAnnouncementDropdown: boolean;
};

const PanelNav = ({
  userProfile,
  status,
  userType,
  numberOfAnnouncements,
  setShowAnnouncementDropdown,
  showAnnouncementDropdown,
}: NavProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div
      className="flex flex-col items-end relative justify-center"
      dir="rtl"
      onMouseLeave={() => setShowAnnouncementDropdown(false)}
    >
      <div className="flex justify-end items-center font-YekanBakh font-bold w-full p-3 px-9 border-b-2 border-r-[0.3px] overflow-hidden rounded-lt-lg ">
        <div className="flex flex-row gap-3 items-center py-1">
          <Link
            href={`${
              userType === "Admin"
                ? "/panel/admin/support"
                : "/panel/user/support"
            }`}
            onMouseEnter={() => setShowAnnouncementDropdown(true)}
          >
            <div className="rounded-full bg-[#EAEFF6] flex justify-center items-center p-2 relative">
              <Image src={notification} alt="notification-bell" width={42} />
              <p className="bg-[#4866CF] font-faNum text-white p-2 rounded-full flex items-center justify-center w-[20px] h-[20px] absolute top-0 right-0">
                <span>{numberOfAnnouncements}</span>
              </p>
            </div>
            {showAnnouncementDropdown && (
              <div
                className="absolute -bottom-[1.43rem] bg-white w-[200px] rounded-[4px]"
                onMouseLeave={() => setShowAnnouncementDropdown(false)}
              >
                {numberOfAnnouncements === 0 && "اعلانی وجود ندارد."}
              </div>
            )}
          </Link>
          <div className="flex flex-row justify-between items-center gap-6">
            <div className="flex justify-center items-center gap-4">
              {status !== "success" ? (
                <SkeletonTheme borderRadius="100%">
                  <Skeleton width={60} height={60} baseColor="#EAEFF6" />
                </SkeletonTheme>
              ) : userProfile.pic_path ? (
                <div className="bg-[#EAEFF6] p-2 rounded-full">
                  <img
                    alt="profile"
                    src={`http://localhost:8000/storage/${userProfile.pic_path}`}
                    className="rounded-full w-[45px] h-[45px]"
                  />
                </div>
              ) : (
                <Image src={maleicon} alt="default-pic" />
              )}
              <div
                className="rounded-full bg-[#EAEFF6] flex justify-center items-center p-3 cursor-pointer"
                onClick={() => (dispatch(logoutUser()), router.replace("/"))}
              >
                <Image src={exit} alt="exit" width={35} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PanelNav;
