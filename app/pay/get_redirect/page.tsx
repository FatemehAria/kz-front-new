"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function WebService() {
  const params = useSearchParams();
  const [transId, setTransId] = useState<string | null>("");
  const [idGet, setIdGet] = useState<string | null>("");
  const { localToken } = useSelector((state: any) => state.userData);
  const [payMessage, setPayMessage] = useState("");
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
      setPayMessage("عملیات موفق بود.");
      console.log(data);
    } catch (error) {
      setPayMessage("خطا در اجرای عملیات.");
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
    <div className="flex justify-center items-center">
      <div className="bg-[#EAEFF6] w-[300px] h-[200px] text-center">{payMessage}</div>
    </div>
  );
}

export default WebService;
