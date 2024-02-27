import Image from "next/image";
import PanelnavPointer from "./panelnav-pointer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteToken } from "@/redux/features/user/userSlice";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";

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
      className="flex flex-col items-end relative"
      dir="rtl"
      onMouseLeave={() => setShowDropDownItems(false)}
    >
      <div className="flex justify-between items-center font-YekanBakh font-bold w-full px-9 border-b-2 border-r-2 overflow-hidden rounded-l-lg mb-4">
        <div>
          {userRole === "student" && (
            <button
              disabled={userRole !== "student"}
              className="text-[#4866CF] relative -top-4"
            >
              <PanelnavPointer />
              <span>پنل دانش پژوه</span>
            </button>
          )}
          {userRole === "User" && (
            <button
              disabled={userRole !== "User"}
              className="text-[#4866CF] relative -top-4"
            >
              <PanelnavPointer />
              <span>پنل عادی</span>
            </button>
          )}
          {userRole === "Employer" && (
            <button
              disabled={userRole !== "Employer"}
              className="text-[#4866CF] relative -top-4"
            >
              <PanelnavPointer />
              <span>پنل کارفرما</span>
            </button>
          )}
          {(userRole === "GeneralAdmin" || userRole === "Admin") && <div></div>}
          <div></div>
        </div>
        {/*PROFILE PHOTO */}
        <div className="flex flex-row gap-3 items-center py-1">
          <Link href="/panel/notifications">
            <Image
              src="/userpanel/notification.svg"
              width={35}
              height={35}
              alt="notification-bell"
            />
          </Link>
          <div className="flex flex-row justify-between items-center gap-6">
            <div className="flex justify-center items-center gap-4">
              <Image
                alt="profile"
                src={
                  userGender === "زن"
                    ? "/femaleicon.svg"
                    : userGender === "مرد"
                    ? "/maleicon.svg"
                    : "/nogendericon.svg"
                }
                width={45}
                height={45}
              />
              {/* USER INFO */}
              <div className="flex flex-col justify-center">
                <span className="flex justify-center items-center gap-2 whitespace-nowrap">
                  {!userFirstName && !userLastName && <Skeleton width={100} />}
                  {userFirstName &&
                    userLastName &&
                    `${userFirstName} ${userLastName}`}

                  <span onClick={() => setShowDropDownItems(true)}>
                    <Image
                      src="/userpanel/dropdownarrow.svg"
                      alt="right-arrow"
                      width={15}
                      height={15}
                      className="cursor-pointer"
                    />
                  </span>
                </span>
                <span className="text-sm">{userRole}</span>
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
