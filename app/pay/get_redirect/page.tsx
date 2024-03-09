"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function WebService() {
  const params = useSearchParams();
  const [transId, setTransId] = useState<string | null>("");
  const [idGet, setIdGet] = useState<string | null>("");

  // trans_id=20994917&id_get=20988845
  const getPayRedirect = async (transId: string | null, idGet: string | null) => {
    try {
      console.log("transId" + transId);
      console.log("idGet" + idGet);
      const { data } = await axios.post(
        "https://keykavoos.liara.run/pay/get_redirect",
        {
          transId,
          idGet,
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // getRedirect();
    const trans_id = params.get("trans_id")
    setTransId(trans_id);
    const id_get = params.get("id_get")
    setIdGet(id_get);
    console.log(transId);
    console.log(idGet);
    getPayRedirect(transId, idGet);
  }, [transId, idGet]);
  return <div>WebService</div>;
}

export default WebService;
