import Image from "next/image";
import PanelnavPointer from "./panelnav-pointer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteDataFromCookie,
  deleteToken,
} from "@/redux/features/user/userSlice";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import notification from "../../public/Panel/notif.svg";
import malegender from "../../public/Panel/malegender.svg";
import exit from "../../public/Panel/exit.svg";
type NavProps = {
  userProfile: any;
};

const PanelNav = ({ userProfile }: NavProps) => {
  const [showDropdownItems, setShowDropDownItems] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  // console.log(userProfile.avatar.path);
  return (
    <div
      className="flex flex-col items-end relative justify-center"
      dir="rtl"
      onMouseLeave={() => setShowDropDownItems(false)}
    >
      <div className="flex justify-end items-center font-YekanBakh font-bold w-full p-3 px-9 border-b-2 border-r-2 overflow-hidden rounded-lt-lg ">
        <div className="flex flex-row gap-3 items-center py-1">
          <Link href="/panel/notifications">
            <div className="rounded-full bg-[#EAEFF6] flex justify-center items-center p-2">
              <Image src={notification} alt="notification-bell" />
            </div>
          </Link>
          <div className="flex flex-row justify-between items-center gap-6">
            <div className="flex justify-center items-center gap-4">
              {/* <div className="w-[65px] h-[65px] bg-[#EAEFF6] flex justify-center items-center rounded-full p-1"> */}
              {userProfile.avatar?.path ? (
                <Image
                  alt="profile"
                  src={userProfile.avatar?.path}
                  width={75}
                  height={75}
                  className="rounded-full"
                />
              ) : (
                // <Skeleton width={100} baseColor="#4866CF" /> || (
                <Image src={malegender} alt="default-pic" />
                // )
              )}
              {/* </div> */}
              {/* <img src={userProfile.avatar?.path} alt="avatar" /> */}
              <div
                className="rounded-full bg-[#EAEFF6] flex justify-center items-center p-2 cursor-pointer"
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
