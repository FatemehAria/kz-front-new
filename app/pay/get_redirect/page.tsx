"use client";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function WebService() {
  const dispatch = useDispatch();
  const { localToken } = useSelector((state: any) => state.userData);
  useEffect(() => {
    dispatch(getTokenFromLocal());
    dispatch(getIdFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);
  const params = useSearchParams();
  const [transId, setTransId] = useState<string | null>("");
  const [idGet, setIdGet] = useState<string | null>("");
  const [payMessage, setPayMessage] = useState("");
  const [error, setError] = useState(false);
  const getPayRedirect = async (
    transId: string | null,
    idGet: string | null
  ) => {
    try {
      const { data } = await axios.post(
        "https://keykavoos.liara.run/pay/get_redirect",
        {
          transId,
          idGet,
        },
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        }
      );
      setPayMessage("عملیات موفق بود");
      setError(true);
      console.log(data);
    } catch (error) {
      setPayMessage("خطا در اجرای عملیات");
      setError(false);
      console.log(error);
    }
  };
  useEffect(() => {
    const trans_id = params.get("trans_id");
    setTransId(trans_id);
    const id_get = params.get("id_get");
    setIdGet(id_get);
    getPayRedirect(transId, idGet);
  }, [transId, idGet]);
  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[500px] h-[200px] flex items-center justify-center flex-col rounded-2xl gap-3 ${
        error ? "bg-emerald-500" : "bg-red-700"
      }`}
    >
      <div
        dir="rtl"
        className="flex justify-center items-center text-white text-2xl"
      >
        {payMessage}
      </div>
      <Link
        href="/"
        className={`flex justify-center items-center text-white p-2 rounded-lg ${
          error ? "bg-indigo-500" : "bg-teal-600"
        }`}
      >
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}

export default WebService;
