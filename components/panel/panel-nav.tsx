import Image from "next/image";
import PanelnavPointer from "./panelnav-pointer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteToken } from "@/redux/features/user/userSlice";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import notification from "../../public/Panel/notif.svg";
import malegender from "../../public/Panel/malegender.svg";
import exit from "../../public/Panel/exit.svg";
type NavProps = {
  userRole: string;
  userFirstName: string;
  userLastName: string;
  userGender: string;
};

const PanelNav = ({
  userRole,
  userFirstName,
  userLastName,
  userGender,
}: NavProps) => {
  const [showDropdownItems, setShowDropDownItems] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

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
              <Image alt="profile" src={malegender} />
              <div
                className="rounded-full bg-[#EAEFF6] flex justify-center items-center p-2"
                onClick={() => dispatch(deleteToken())}
              >
                <Image src={exit} alt="exit" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {userRole === "User" && showDropdownItems && (
        <div className="bg-white border-b-indigo-500 border-b-8 rounded-lg absolute z-[999] w-[110px] top-[75%] left-[4%] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <ul className="flex flex-col gap-3 py-2 pr-2">
            <li className="cursor-pointer">
              <Link href="/panel/profile">تنظیمات</Link>
            </li>
            <li className="cursor-pointer">رتبه بندی</li>
            <li className="cursor-pointer">کیف پول</li>
            <li
              className="cursor-pointer"
              onClick={() => (dispatch(deleteToken()), router.replace("/"))}
            >
              خروج
            </li>
          </ul>
        </div>
      )}
      {(userRole === "Admin" || userRole === "GeneralAdmin") &&
        showDropdownItems && (
          <div className="bg-white border-b-indigo-500 border-b-8 rounded-lg absolute z-[999] w-[110px] top-[75%] left-[4%] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <ul className="flex flex-col gap-3 py-2 pr-2">
              <li
                className="cursor-pointer"
                onClick={() => (dispatch(deleteToken()), router.replace("/"))}
              >
                خروج
              </li>
            </ul>
          </div>
        )}
      {userRole === "Employer" && showDropdownItems && (
        <div className="bg-white border-b-indigo-500 border-b-8 rounded-lg absolute z-[999] w-[110px] top-[75%] left-[4%] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <ul className="flex flex-col gap-3 py-2 pr-2">
            <li
              className="cursor-pointer"
              onClick={() => (dispatch(deleteToken()), router.replace("/"))}
            >
              خروج
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
export default PanelNav;
