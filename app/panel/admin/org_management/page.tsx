"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import NotFound from "../components/NotFound";
import {
  deleteOrgan,
  getOrganizations,
  restoreOrganization,
} from "@/utils/utils";
import { useSelector } from "react-redux";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import Image from "next/image";
import vieweye from "@/public/ViewUsers/vieweye.svg";
import { RxCross1 } from "react-icons/rx";

function OrgManagement() {
  const { token } = useSelector((state: any) => state.userData);
  const [organizations, setOrganizations] = useState([]);
  const [organIsDeleted, setOrganIsDeleted] = useState(false);
  const [organizationsStatus, setOrganizationsStatus] = useState({
    loading: false,
    error: "",
  });

  useEffect(() => {
    getOrganizations(token, setOrganizations, setOrganizationsStatus);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-5">
      <div className="flex gap-5">
        <Link
          href={`/panel/admin/org_management/brands`}
          className="text-white bg-[#4866CF] p-2 rounded-[5px]"
        >
          برندها
        </Link>
        <Link
          href={`/panel/admin/org_management/departments`}
          className="text-white bg-[#4866CF] p-2 rounded-[5px]"
        >
          دپارتمان ها
        </Link>
      </div>
      <div className="bg-white shadow mx-auto rounded-2xl w-full p-[3%] text-center space-y-3">
        <div className="grid grid-cols-5">
          <div>ردیف</div>
          <div>نام سازمان</div>
          <div>شماره تلفن سازمان</div>
          <div>آدرس سازمان</div>
          <div>عملیات</div>
        </div>

        <div>
          {organizationsStatus.loading ? (
            <SkeletonTheme>
              <Skeleton count={1} className="p-2" baseColor="#EAEFF6" />
            </SkeletonTheme>
          ) : organizationsStatus.error ? (
            <NotFound text={`${organizationsStatus.error}`} />
          ) : (
            <div>
              {organizations?.map(
                (
                  item: {
                    name: string;
                    phone: number;
                    address: string;
                    id: number;
                  },
                  index
                ) => (
                  <div
                    className="grid grid-cols-5 bg-[#EAEFF6] caret-transparent cursor-default text-center gap-x-5 py-1 rounded-[4px]"
                    key={item.id}
                  >
                    <p>{index + 1}</p>
                    <p>{item.name}</p>
                    <p>{item.phone}</p>
                    <p>{item.address}</p>
                    <div className="flex flex-row items-center justify-center gap-3">
                      <Link
                        href={`/panel/admin/org_management/org-detail?id=${item.id}`}
                        className="flex justify-center"
                      >
                        <Image
                          src={vieweye}
                          alt="مشاهده"
                          width={20}
                          height={20}
                        />
                      </Link>
                      <span
                        onClick={() =>
                          deleteOrgan(item.id, token, setOrganIsDeleted)
                        }
                        className="flex justify-center cursor-pointer"
                      >
                        <RxCross1 className="text-red-600 text-lg" />
                      </span>
                      <span
                        onClick={() =>
                          restoreOrganization(item.id, token, setOrganIsDeleted)
                        }
                      >
                        <MdOutlineSettingsBackupRestore className="text-yellow-600 text-lg cursor-pointer" />
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrgManagement;
