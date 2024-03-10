import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteDataFromCookie,
  deleteToken,
} from "@/redux/features/user/userSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import notification from "../../public/Panel/notif.svg";
import malegender from "../../public/Panel/malegender.svg";
import exit from "../../public/Panel/exit.svg";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
type NavProps = {
  userProfile: any;
  status: string;
};

const PanelNav = ({ userProfile, status }: NavProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className="flex flex-col items-end relative justify-center" dir="rtl">
      <div className="flex justify-end items-center font-YekanBakh font-bold w-full p-3 px-9 border-b-2 border-r-2 overflow-hidden rounded-lt-lg ">
        <div className="flex flex-row gap-3 items-center py-1">
          <Link href="/panel/notifications">
            <div className="rounded-full bg-[#EAEFF6] flex justify-center items-center p-2">
              <Image src={notification} alt="notification-bell" />
            </div>
          </Link>
          <div className="flex flex-row justify-between items-center gap-6">
            <div className="flex justify-center items-center gap-4">
              {status !== "success" ? (
                <SkeletonTheme borderRadius="100%">
                  <Skeleton width={60} height={60} baseColor="#EAEFF6" />
                </SkeletonTheme>
              ) : userProfile.avatar?.path ? (
                <div className="bg-[#EAEFF6] p-2 rounded-full">
                  <Image
                    alt="profile"
                    src={userProfile.avatar?.path}
                    width={75}
                    height={75}
                    className="rounded-full"
                  />
                </div>
              ) : (
                <Image src={malegender} alt="default-pic" />
              )}
              <div
                className="rounded-full bg-[#EAEFF6] flex justify-center items-center p-3 cursor-pointer"
                onClick={() => (
                  dispatch(deleteDataFromCookie()), router.replace("/")
                )}
              >
                <Image src={exit} alt="exit" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PanelNav;
