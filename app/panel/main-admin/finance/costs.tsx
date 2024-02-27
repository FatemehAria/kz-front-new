"use client";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import TableSelect from "./components/table-select";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getTokenFromLocal } from "@/redux/features/user/userSlice";

const Costs = () => {
  const { userProfile, localToken } = useSelector(
    (state: any) => state.userRole
  );
  const dispatch = useDispatch();
  const [costsSubmission, setCostsSubmission] = useState({
    For: "",
    Bank: "",
    Amount: 0,
    Dates: "",
    payment_method: "",
  });
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file);
  };

  useEffect(() => {
    dispatch(getTokenFromLocal());
    if (userProfile.UserType === "GeneralAdmin") {
      getCostsByGeneral();
    }
  }, []);

  const fileSubmissionByAdmin = async () => {
    const formData = new FormData();
    formData.append("photo", selectedFile);
    try {
      const { data } = await axios.post(
        "https://keykavoos.liara.run/Admin/Submit_Uploadimage",
        formData,
        {
          headers: {
            authorization: `Bearer ${localToken}`,
          },
        }
      );
      console.log(formData);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitCostsByAdmin = async (
    For: string,
    Bank: string,
    Amount: number,
    Dates: string,
    payment_method: string
  ) => {
    try {
      const { data } = await axios.post(
        "https://keykavoos.liara.run/Admin/Submit_Costs",
        {
          For,
          Bank,
          Amount,
          Dates,
          payment_method,
        },
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        }
      );
      console.log(data);
    } catch (error: any) {
      console.log(error.response?.data.message);
    }
  };

  const FormSubmissionByAdmin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (selectedFile !== null) {
    //   await Promise.all([
    //     fileSubmissionByAdmin(),
    //     submitCostsByAdmin(
    //       costsSubmission.For,
    //       costsSubmission.Bank,
    //       costsSubmission.Amount,
    //       costsSubmission.Dates,
    //       costsSubmission.payment_method
    //     ),
    //   ]);
    // }
  };
  const getCostsByGeneral = async () => {
    try {
      const { data } = await axios(
        "https://keykavoos.liara.run/AdminGeneral/Costs",
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        }
      );
      console.log(data);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };
  return (
    <div className="">
      {userProfile.UserType === "GeneralAdmin" && (
        <div>
          <div className="px-[3%] py-[2%] bg-[#4866CF1A] rounded-lg w-full">
            <table className="w-full my-2">
              <thead className="border-b-[1px] border-black">
                <tr>
                  <th>
                    <TableSelect
                      selectText="وضعیت"
                      dropDownOptions={["تایید شده"]}
                    />
                  </th>
                  <th>
                    <TableSelect selectText="تاریخ" />
                  </th>
                  <th>
                    <TableSelect selectText="مبلغ" />
                  </th>
                  <th>
                    <TableSelect selectText="علت هزینه" />
                  </th>
                  <th>
                    <TableSelect selectText="پرداخت شده از" />
                  </th>
                  <th>
                    <TableSelect selectText="محل پرداخت" />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b-[1px] border-black">
                  <td className="flex justify-center items-center pt-1">
                    تایید شده
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="text-center flex justify-center items-center pt-1">
                    <Image
                      src="/mainadminpanel/downloadiconpng.png"
                      width={20}
                      height={20}
                      alt="download"
                    />
                  </td>
                </tr>
                <tr className="border-b-[1px] border-black">
                  <td className="flex justify-center items-center pt-1">
                    تایید نشده
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="text-center flex justify-center items-center pt-1">
                    <Image
                      src="/mainadminpanel/downloadiconpng.png"
                      width={20}
                      height={20}
                      alt="download"
                    />
                  </td>
                </tr>
                <tr className="">
                  <td className="flex justify-center items-center pt-1">
                    تایید شده
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="text-center flex justify-center items-center pt-1">
                    <Image
                      src="/mainadminpanel/downloadiconpng.png"
                      width={20}
                      height={20}
                      alt="download"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-row text-white justify-end text-center pb-4 my-2">
            <Link
              href="/panel/main-admin/finance/chart"
              className="bg-[#9DACDF] w-[100px] rounded-lg py-1"
            >
              نمودار
            </Link>
          </div>
        </div>
      )}

      {userProfile.UserType === "Admin" && (
        <div className="pt-2">
          <form onSubmit={(e) => FormSubmissionByAdmin(e)}>
            <div className="grid grid-cols-5 gap-x-[3%] justify-between text-center">
              <div className="flex flex-col">
                <label>بابت</label>
                <input
                  type="text"
                  className="bg-[#9DACDF] rounded-lg py-[2%] text-white px-[3%]"
                  value={costsSubmission.For}
                  onChange={(e) =>
                    setCostsSubmission((last) => ({
                      ...last,
                      For: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col">
                <label>نحوه پرداخت</label>
                <input
                  type="text"
                  className="bg-[#9DACDF] rounded-lg py-[2%] text-white px-[3%]"
                  value={costsSubmission.payment_method}
                  onChange={(e) =>
                    setCostsSubmission((last) => ({
                      ...last,
                      payment_method: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col">
                <label>بانک</label>
                <input
                  type="text"
                  className="bg-[#9DACDF] rounded-lg py-[2%] text-white px-[3%]"
                  value={costsSubmission.Bank}
                  onChange={(e) =>
                    setCostsSubmission((last) => ({
                      ...last,
                      Bank: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col">
                <label>مبلغ</label>
                <input
                  type="text"
                  className="bg-[#9DACDF] rounded-lg py-[2%] text-white px-[3%]"
                  value={costsSubmission.Amount}
                  onChange={(e) =>
                    setCostsSubmission((last) => ({
                      ...last,
                      Amount: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="flex flex-col">
                <label>تاریخ</label>
                <input
                  type="text"
                  className="bg-[#9DACDF] rounded-lg py-[2%] text-white px-[3%]"
                  value={costsSubmission.Dates}
                  onChange={(e) =>
                    setCostsSubmission((last) => ({
                      ...last,
                      Dates: e.target.value,
                    }))
                  }
                />
                <div className="flex flex-row justify-end items-center mt-[3%] gap-[2%] whitespace-nowrap">
                  <button
                    className="bg-[#9DACDF] rounded-lg w-full py-1 text-center text-white"
                    disabled={selectedFile ? false : true}
                  >
                    تایید
                  </button>
                  <div className="bg-[#9DACDF] w-full rounded-lg py-1 text-center text-white px-[2%]">
                    <input
                      id="fileInput"
                      type="file"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="fileInput"
                      style={{ cursor: "pointer" }}
                      className="rounded-lg p-[2%] w-full text-center"
                    >
                      {selectedFile ? selectedFile.name : "افزودن فایل"}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
export default Costs;
