"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useSelector } from "react-redux";
import NotFound from "../../admin/components/NotFound";
import { getAllProjects, getOrders } from "@/utils/utils";
import vieweye from "@/public/ViewUsers/vieweye.svg";
import Image from "next/image";

function OrderManagement() {
  const [projects, setAllProjects] = useState<any>([]);
  const [orderStatus, setOrderStatus] = useState({
    error: "",
    loading: false,
  });
  const { token } = useSelector((state: any) => state.userData);
  const orders = projects
    .filter(
      (item: { status: string; rejected_projects: [] }) =>
        item.status === "verified" && item.rejected_projects.length === 0
    )
    .map((item: any) => item);

  useEffect(() => {
    // getOrders(token, setOrders, setOrderStatus);
    getAllProjects(token, setAllProjects, setOrderStatus);
  }, []);

  return (
    <div className="bg-white shadow mx-auto rounded-2xl py-[3%] px-[3%]">
      <div className="grid grid-cols-4 text-center mb-5">
        <p>ردیف</p>
        <p>عنوان پروژه</p>
        <p>وضعیت پیشرفت پروژه</p>
        <p>عملیات</p>
      </div>
      {orderStatus.loading ? (
        <SkeletonTheme>
          <Skeleton count={1} className="p-3" baseColor="#EAEFF6" />
        </SkeletonTheme>
      ) : orderStatus.error ? (
        <NotFound text={orderStatus.error} />
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {orders.map((item: any, index: number) => (
            <div
              key={item.id}
              className="grid grid-cols-4 text-center py-1 bg-[#EAEFF6] rounded-[4px]"
              // check
            >
              <p>{index + 1}</p>
              <p>{item.title}</p>
              <p>{"order status"}</p>
              <div className="flex flex-row gap-3 justify-center items-center">
                <Link
                  href={`/panel/user/project-management/project-detail?id=${item.id}`}
                >
                  <Image src={vieweye} alt="مشاهده" width={20} height={20} />
                </Link>
                <Link href={`/panel/user/order-management/order-payment`}>پرداخت</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderManagement;