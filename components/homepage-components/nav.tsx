"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import Skeleton from "react-loading-skeleton";
import NavMobile from "./nav-mobile";

const Nav = () => {
  const [active, setActive] = useState(false);
  const [showOne, setShowOne] = useState(false);
  const [showTwo, setShowTwo] = useState(false);
  const [showThree, setShowThree] = useState(false);
  const [showFour, setShowFour] = useState(false);
  const [activeColorChange, setActiveColorChange] = useState(false);

  const dispatch = useDispatch();
  const { localToken, userProfile } = useSelector(
    (state: any) => state.userData
  );

  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     window.scrollY > 60
  //       ? setActiveColorChange(true)
  //       : setActiveColorChange(false);
  //   });
  // });
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     dispatch(getTokenFromLocal());
  //     dispatch<any>(fetchUserProfile());
  //   }
  // }, []);

  return (
    <div
      className={`w-full mx-auto top-0 z-[999] font-YekanBakh transition-all mb-3 lg:${
        activeColorChange && "shadow-md bg-slate-50"
      }`}
      onMouseLeave={() => (
        setShowOne(false),
        setShowTwo(false),
        setShowThree(false),
        setShowFour(false)
      )}
    >
      <div className="flex justify-between items-center h-[5rem] md:h-[5rem] mx-auto shadow-md px-[10%]">
        {/* Mobile */}
        <NavMobile
          active={active}
          setActive={setActive}
          setShowOne={setShowOne}
          setShowTwo={setShowTwo}
          setShowThree={setShowThree}
          setShowFour={setShowFour}
          localToken={localToken}
          userProfile={userProfile}
          showOne={showOne}
          showTwo={showTwo}
          showThree={showThree}
          showFour={showFour}
        />
        {/* Large Screen */}
        <Link
          href={
            !localToken
              ? "/auth"
              : userProfile.UserType === "Admin" ||
                userProfile.UserType === "GeneralAdmin"
              ? "/panel/main-admin/profile"
              : userProfile.UserType === "User"
              ? "/panel"
              : userProfile.UserType === "Employer"
              ? "/panel/employer-panel"
              : ""
          }
        >
          <button className="hidden lg:inline-block font-semibold bg-[#4866CF] text-white rounded-[4px] py-1 px-5 text-base">
            {!localToken && "ثبت نام / ورود"}
            {!userProfile?.FirstName &&
              !userProfile?.LastName &&
              localToken && <Skeleton width={100} baseColor="#4866CF" />}
            {userProfile?.FirstName &&
              userProfile?.LastName &&
              localToken &&
              `${userProfile.FirstName} ${userProfile.LastName}`}
          </button>
        </Link>
        <div className="lg:flex gap-6 hidden">
          <ul className="hidden lg:flex justify-center items-center gap-8 z-10">
            {/* weblog */}
            <li
              className="flex flex-col justify-center items-end"
              onMouseEnter={() => (
                setShowFour(true),
                setShowOne(false),
                setShowTwo(false),
                setShowThree(false)
              )}
            >
              <div className="flex gap-2 cursor-pointer">
                <span>
                  <Image
                    src="/navarrow.svg"
                    alt="arrow"
                    width={22}
                    height={22}
                  />
                </span>
                <span className={`font-semibold`}>وبلاگ</span>
              </div>

              {showFour && (
                <React.Fragment>
                  <ul
                    className="list-none absolute lg:top-[65px] bg-white rounded-2xl border-b-8 border-b-[#4866CF] px-2 mt-2 text-right flex flex-col gap-4 z-10 "
                    onMouseLeave={() => setShowFour(false)}
                  >
                    <Link href="/weblog/back-end ">
                      <li className="text-sm pt-1 font-semibold">بک اند</li>
                    </Link>
                    <Link href="/weblog/front-end">
                      <li className="text-sm font-semibold">فرانت اند</li>
                    </Link>
                    <Link href="/weblog/accounting">
                      <li className="text-sm font-semibold">حسابداری</li>
                    </Link>
                    <Link href="/weblog/digital-marketing">
                      <li className="text-sm rounded-b-lg pb-2 font-semibold">
                        دیجیتال مارکتینگ
                      </li>
                    </Link>
                  </ul>
                </React.Fragment>
              )}
            </li>
            {/* about */}
            <li
              className="flex flex-col"
              onMouseEnter={() => (
                setShowThree(true),
                setShowOne(false),
                setShowTwo(false),
                setShowFour(false)
              )}
            >
              <div className="flex gap-2 cursor-pointer ml-4">
                <span>
                  <Image
                    src="/navarrow.svg"
                    alt="arrow"
                    width={22}
                    height={22}
                  />
                </span>
                <span className="font-semibold">درباره ما</span>
              </div>
              {showThree && (
                <React.Fragment>
                  <ul
                    className="list-none absolute lg:top-[65px]  rounded-2xl border-b-8 bg-white border-b-[#4866CF] w-[120px] px-2 text-right flex flex-col gap-5 z-10 "
                    onMouseLeave={() => setShowThree(false)}
                  >
                    <Link href="/certificates">
                      <li className="text-sm pt-2 font-semibold">مجوزها</li>
                    </Link>
                    <Link href="/in-hand">
                      <li className="text-sm font-semibold">تاریخچه</li>
                    </Link>
                    <Link href="/in-hand">
                      <li className="text-sm font-semibold">مأموریت</li>
                    </Link>
                    <Link href="/in-hand">
                      <li className="text-sm  font-semibold">تقدیرنامه</li>
                    </Link>
                    <Link href="/contact-us">
                      <li className="text-sm font-semibold">تماس با ما</li>
                    </Link>
                    <Link href="/in-hand">
                      <li className="text-sm pb-2 font-semibold">
                        نمودار سازمانی
                      </li>
                    </Link>
                  </ul>
                </React.Fragment>
              )}
            </li>
            {/* services */}
            <li
              className="flex flex-col"
              onMouseEnter={() => (
                setShowTwo(true),
                setShowOne(false),
                setShowThree(false),
                setShowFour(false)
              )}
            >
              <div className="flex gap-2 cursor-pointer">
                <span>
                  <Image
                    src="/navarrow.svg"
                    alt="arrow"
                    width={22}
                    height={22}
                  />
                </span>
                <span
                  onMouseEnter={() => setShowTwo(true)}
                  className="font-semibold"
                >
                  خدمات ما
                </span>
              </div>

              {showTwo && (
                <React.Fragment>
                  <ul
                    className="list-none absolute rounded-2xl border-b-8 bg-white border-b-[#4866CF] w-[120px] px-2 text-right lg:top-[65px] flex flex-col gap-5 z-10"
                    onMouseEnter={() => setShowTwo(true)}
                  >
                    <Link href="/courses">
                      <li className="text-sm pt-1 font-semibold">آموزش</li>
                    </Link>
                    <Link href="/in-hand">
                      <li className="text-sm  font-semibold">مشاوره</li>
                    </Link>
                    <Link href="/in-hand">
                      <li className="text-sm  font-semibold">خدمات وب</li>
                    </Link>
                    <Link href="/in-hand">
                      <li className="text-sm  font-semibold">خدمات مالی</li>
                    </Link>
                    <Link href="/in-hand">
                      <li className="text-sm pb-2 font-semibold">
                        منابع انسانی
                      </li>
                    </Link>
                  </ul>
                </React.Fragment>
              )}
            </li>
            {/* chance */}
            <li
              className="flex flex-col justify-center items-end"
              onMouseEnter={() => (
                setShowOne(true),
                setShowFour(false),
                setShowThree(false),
                setShowTwo(false)
              )}
            >
              <div className="flex gap-2 cursor-pointer">
                <span>
                  <Image
                    src="/navarrow.svg"
                    alt="arrow"
                    width={22}
                    height={22}
                  />
                </span>
                <span
                  onMouseEnter={() => setShowOne(true)}
                  className="font-semibold"
                >
                  فرصت های شغلی
                </span>
              </div>

              {showOne && (
                <React.Fragment>
                  <ul
                    className="list-none absolute lg:top-[65px] bg-white rounded-2xl border-b-8 border-b-[#4866CF] px-2 mt-1 text-right flex flex-col gap-5 z-10"
                    onMouseEnter={() => setShowOne(true)}
                  >
                    <Link href="/in-hand">
                      <li className="text-sm pt-1 font-semibold">بک اند</li>
                    </Link>
                    <Link href="/in-hand">
                      <li className="text-sm font-semibold">فرانت اند</li>
                    </Link>
                    <Link href="/in-hand">
                      <li className="text-sm font-semibold">حسابداری</li>
                    </Link>
                    <Link href="/in-hand">
                      <li className="text-sm font-semibold">
                        طراحی رابط کاربری
                      </li>
                    </Link>
                    <Link href="/in-hand">
                      <li className="text-sm pb-2 font-semibold">
                        دیجیتال مارکتینگ
                      </li>
                    </Link>
                  </ul>
                </React.Fragment>
              )}
            </li>
          </ul>
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="kz-logo"
              width={130}
              height={44.74}
              quality={100}
            />
          </Link>
        </div>

        <Link href="/" className="lg:hidden">
          <Image
            src="/logo.svg"
            alt="kz-logo"
            width={130}
            height={44.74}
            quality={100}
          />
        </Link>
      </div>
    </div>
  );
};

export default Nav;
