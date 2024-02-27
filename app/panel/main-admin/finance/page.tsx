"use client";
import React, { useEffect, useState } from "react";
import TableSelect from "./components/table-select";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import ChartNav from "./chart/components/chart-nav";
import Costs from "./costs";
import Income from "./Income";
import axios from "axios";
import {
  fetchUserProfile,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import FinancialReports from "./financial-reports/page";
import MainadminEmployeesSidebar from "../employees/components/mainadmin-employees-sidebar";
import { MainadminFinanceSidebarInfo } from "@/lib/data";
import { Bounce, toast } from "react-toastify";

const Finance = () => {
  const { userProfile, localToken } = useSelector(
    (state: any) => state.userRole
  );
  const [step, setStep] = useState(1);
  const [genralAdminSteps, setGeneralAdminSteps] = useState(0);
  const [costId, setCostId] = useState(0);
  const [incomeId, setIncomeId] = useState(0);
  const dispatch = useDispatch();
  const [costsByGeneral, setCostsByGeneral] = useState([]);
  const [incomeByGeneral, setIncomeByGeneral] = useState([]);

  const renderAdminSteps = () => {
    switch (step) {
      case 1:
        return <Costs />;
      case 2:
        return <Income />;
      default:
        return;
    }
  };

  const renderGeneralAdminSteps = () => {
    switch (genralAdminSteps) {
      case 0:
        return (
          <FinancialReports
            costsByGeneral={costsByGeneral}
            incomeByGeneral={incomeByGeneral}
            deleteSingleCostByGeneral={deleteSingleCostByGeneral}
            confirmSingleCostByGeneral={confirmSingleCostByGeneral}
            costId={costId}
            getCostsByGeneral={getCostsByGeneral}
            deleteSingleIncomeByGeneral={deleteSingleIncomeByGeneral}
            confirmSingleIncomeByGeneral={confirmSingleIncomeByGeneral}
          />
        );
      case 1:
        return <Costs />;
      case 2:
        return <Income />;
      default:
        return;
    }
  };

  const getIncomeByGeneral = async () => {
    try {
      const { data } = await axios(
        "https://keykavoos.liara.run/AdminGeneral/Confirmation_Revenues",
        {
          headers: {
            authorization: `Bearer ${localToken}`,
          },
        }
      );
      console.log(data);
      // console.log(data.id)
      setIncomeId(data.id);
      return data;
    } catch (error: any) {
      console.log(error.response?.data.message);
    }
  };

  const getCostsByGeneral = async () => {
    try {
      const { data } = await axios(
        "https://keykavoos.liara.run/AdminGeneral/Confirmation_Costs",
        {
          headers: {
            authorization: `Bearer ${localToken}`,
          },
        }
      );
      console.log(data);
      // console.log(data.id)
      setCostId(data.id);
      return data;
    } catch (error: any) {
      console.log(error.response?.data.message);
    }
  };

  const getIncomeAndRevenue = async () => {
    const [costs, income] = await Promise.all([
      getCostsByGeneral(),
      getIncomeByGeneral(),
    ]);
    setCostsByGeneral(costs);
    setIncomeByGeneral(income);
  };

  useEffect(() => {
    dispatch(getTokenFromLocal());
    // console.log(localToken);
    if (userProfile.UserType === "GeneralAdmin") {
      getIncomeAndRevenue();
    }
  }, []);

  const confirmSingleIncomeByGeneral = async (id: number) => {
    try {
      const { data } = await axios.post(
        `https://keykavoos.liara.run/AdminGeneral/isConfirmation_Costs/${incomeId}`,
        { isConfirmation: true },
        {
          headers: {
            authorization: `Bearer ${localToken}`,
          },
        }
      );
      toast.success("تایید شد.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        rtl: true,
      });
      console.log(data);
    } catch (error: any) {
      toast.error("عملیات ناموفق بود.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        rtl: true,
      });
      console.log(error.response?.data.message);
    }
  };
  const confirmSingleCostByGeneral = async (id: number) => {
    try {
      const { data } = await axios.post(
        `https://keykavoos.liara.run/AdminGeneral/isConfirmation_Costs/${costId}`,
        { isConfirmation: true },
        {
          headers: {
            authorization: `Bearer ${localToken}`,
          },
        }
      );
      toast.success("تایید شد.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        rtl: true,
      });
      console.log(data);
    } catch (error: any) {
      toast.error("عملیات ناموفق بود.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        rtl: true,
      });
      console.log(error.response?.data.message);
    }
  };

  const deleteSingleIncomeByGeneral = async (id: number) => {
    try {
      const { data } = await axios.delete(
        `https://keykavoos.liara.run/AdminGeneral/Delete_Costs/${incomeId}`,
        {
          headers: {
            authorization: `Bearer ${localToken}`,
          },
        }
      );
      toast.success("عملیات موفق بود.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        rtl: true,
      });
      console.log(data);
    } catch (error: any) {
      toast.error("عملیات ناموفق بود.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        rtl: true,
      });
      console.log(error.response?.data.message);
    }
  };
  const deleteSingleCostByGeneral = async (id: number) => {
    try {
      const { data } = await axios.delete(
        `https://keykavoos.liara.run/AdminGeneral/Delete_Costs/${costId}`,
        {
          headers: {
            authorization: `Bearer ${localToken}`,
          },
        }
      );
      toast.success("عملیات موفق بود.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        rtl: true,
      });
      console.log(data);
    } catch (error: any) {
      toast.error("عملیات ناموفق بود.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        rtl: true,
      });
      console.log(error.response?.data.message);
    }
  };
  return (
    <div className="w-full">
      {userProfile.UserType === "GeneralAdmin" && (
        <div className="flex flex-row">
          <MainadminEmployeesSidebar
            sidebarOptions={MainadminFinanceSidebarInfo}
            setStep={setGeneralAdminSteps}
          />
          <div className="w-full px-[3%]">{renderGeneralAdminSteps()}</div>
        </div>
      )}

      {userProfile.UserType === "Admin" && (
        <div className="w-[90%] mx-auto">
          <div className="flex flex-row justify-center items-center gap-[2%] rounded-lg px-[1%] py-1">
            <div className="flex border border-black rounded-lg justify-between px-[1%] py-1 w-[50%] items-center whitespace-nowrap">
              <div
                onClick={() => setStep(1)}
                className={`${step === 1 && "text-indigo-500"}`}
              >
                <ChartNav linkSrc="" text="هزینه های شرکت" />
              </div>
              <div
                onClick={() => setStep(2)}
                className={`${step === 2 && "text-indigo-500"}`}
              >
                <ChartNav linkSrc="" text="درآمد های شرکت" />
              </div>
            </div>
          </div>
          {renderAdminSteps()}
        </div>
      )}
    </div>
  );
};

export default Finance;
