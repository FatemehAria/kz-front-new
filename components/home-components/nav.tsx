"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import NavMobile from "./nav-mobile";
import { useSession } from "next-auth/react";

const Nav = () => {
  const { data, status } = useSession();
  const [active, setActive] = useState(false);
  const [showOne, setShowOne] = useState(false);
  const [showTwo, setShowTwo] = useState(false);
  const [showThree, setShowThree] = useState(false);
  const [showFour, setShowFour] = useState(false);
  const [activeColorChange, setActiveColorChange] = useState(false);
  const dispatch = useDispatch();
  const {
    localToken,
    FirstName,
    LastName,
    userProfile,
    userType,
    localUserId,
  } = useSelector((state: any) => state.userData);
  console.log("next-auth status", status);
  console.log("next-auth data", data);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60
        ? setActiveColorChange(true)
        : setActiveColorChange(false);
    });
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch(getTokenFromLocal());
      dispatch(getIdFromLocal());
      dispatch<any>(fetchUserProfile());
    }
  }, []);

  return (
    <div
      className={`w-full mx-auto top-0 z-[999] font-YekanBakh transition-all sticky mb-3 lg:${
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
            status === "authenticated" && !localToken && !localUserId
              ? "/social-authorization"
              : localToken && localUserId && userType === "User"
              ? "/panel/user/dashboard"
              : localToken && localUserId && userType === "Admin"
              ? "/panel/admin/view-users"
              : !localUserId && status === "unauthenticated" && !localToken
              ? "/authorization"
              : localToken && !localUserId
              ? "/authorization"
              : "/"
          }
        >
          {status === "loading" ? (
            <SkeletonTheme width={140}>
              <Skeleton count={1} className="p-2" baseColor="#4866CF" />
            </SkeletonTheme>
          ) : (
            <button className="hidden lg:inline-block font-semibold bg-[#4866CF] text-white rounded-[4px] py-1 px-5 text-base">
              {!localUserId && status === "unauthenticated" && "ثبت نام / ورود"}
              {!localToken &&
                status === "unauthenticated" &&
                localUserId &&
                "ثبت نام / ورود"}
              {userProfile.FirstName &&
                userProfile.LastName &&
                localToken &&
                localUserId &&
                `${userProfile.FirstName} ${userProfile.LastName}`}
              {status === "authenticated" && !localUserId && data.user?.name}
              {!FirstName && !LastName && localToken && localUserId && (
                <Skeleton width={100} baseColor="#4866CF" />
              )}
            </button>
          )}
        </Link>
        <div className="lg:flex gap-6 hidden">
          <ul className="hidden lg:flex justify-center items-center gap-8 z-10">
            <li className="bg-[#C9D6E9] text-[#4866CF] p-2 rounded-[4px]">
              <button>دانلود کاتالوگ</button>
            </li>
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
                    <Link href="/in-hand">
                      <li className="text-sm pt-1 font-semibold">طراحی سایت</li>
                    </Link>
                    {/* <Link href="/moshavere">
                      <li className="text-sm  font-semibold">طراحی گرافیک</li>
                    </Link>
                    <Link href="/pay/get_redirect/?trans_id=1234567&id_get=12345678">
                      <li className="text-sm  font-semibold">خدمات وب</li>
                    </Link> */}
                    <Link href="/in-hand">
                      <li className="text-sm  font-semibold">طراحی گرافیک</li>
                    </Link>
                    <Link href="/in-hand">
                      <li className="text-sm pb-2 font-semibold">کد نویسی</li>
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
