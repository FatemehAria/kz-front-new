"use client";
import React, { useState } from "react";
import InfoFields from "../../components/info-fields";
import { useSelector } from "react-redux";
import axios from "axios";

const Hoghoghi = () => {
  const { localToken } = useSelector((state: any) => state.userRole);
  const [hoghoghiInfo, setHoghoghiInfo] = useState({
    type: "حقوقی",
    Company_Name: "",
    National_ID: "",
    registration_number: "",
    Activity: "",
    Company_Contact_Name: "",
    FirstName: "",
    LastName: "",
    the_method_of_Introduction: "",
  });

  const handleHaghighi = async (
    type: string,
    Company_Name: string,
    National_ID: string,
    registration_number: string,
    Activity: string,
    Company_Contact_Name: string,
    FirstName: string,
    LastName: string,
    the_method_of_Introduction: string
  ) => {
    try {
      const { data } = await axios.post(
        "https://keykavoos.liara.run/User/req_Employer",
        {
          type,
          Company_Name,
          National_ID,
          registration_number,
          Activity,
          Company_Contact_Name,
          FirstName,
          LastName,
          the_method_of_Introduction,
        },
        {
          headers: {
            authorization: `Bearer ${localToken}`,
          },
        }
      );
      // console.log(selectedFile);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleHaghighi(
      hoghoghiInfo.type,
      hoghoghiInfo.Company_Name,
      hoghoghiInfo.National_ID,
      hoghoghiInfo.registration_number,
      hoghoghiInfo.Activity,
      hoghoghiInfo.Company_Contact_Name,
      hoghoghiInfo.FirstName,
      hoghoghiInfo.LastName,
      hoghoghiInfo.the_method_of_Introduction
    );
  };
  return (
    <div className="w-[90%] mx-auto h-full">
      <form onSubmit={(e) => handleSubmission(e)}>
        <div className="grid grid-cols-2 gap-x-[3%] gap-y-8">
          <InfoFields
            title="نام "
            type="text"
            info={hoghoghiInfo.FirstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setHoghoghiInfo((last) => ({
                ...last,
                FirstName: e.target.value,
              }))
            }
          />
          <InfoFields
            title="نام خانوادگی "
            type="text"
            info={hoghoghiInfo.LastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setHoghoghiInfo((last) => ({
                ...last,
                LastName: e.target.value,
              }))
            }
          />
          <InfoFields
            title="نام شرکت"
            type="text"
            info={hoghoghiInfo.Company_Name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setHoghoghiInfo((last) => ({
                ...last,
                Company_Name: e.target.value,
              }))
            }
          />
          <InfoFields
            title="شناسه ملی "
            type="text"
            info={hoghoghiInfo.National_ID}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setHoghoghiInfo((last) => ({
                ...last,
                National_ID: e.target.value,
              }))
            }
          />
          <InfoFields
            title="شماره ثبت "
            type="text"
            info={hoghoghiInfo.registration_number}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setHoghoghiInfo((last) => ({
                ...last,
                registration_number: e.target.value,
              }))
            }
          />
          <InfoFields
            title="حوزه فعالیت "
            type="text"
            info={hoghoghiInfo.Activity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setHoghoghiInfo((last) => ({
                ...last,
                Activity: e.target.value,
              }))
            }
          />
          <InfoFields
            title="سمت"
            type="text"
            info={hoghoghiInfo.Company_Contact_Name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setHoghoghiInfo((last) => ({
                ...last,
                Company_Contact_Name: e.target.value,
              }))
            }
          />

          <InfoFields
            title="نحوه آشنایی "
            type="text"
            info={hoghoghiInfo.the_method_of_Introduction}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setHoghoghiInfo((last) => ({
                ...last,
                the_method_of_Introduction: e.target.value,
              }))
            }
          />
        </div>
        <div className="flex justify-end mt-2">
          <button
            className="bg-[#9DACDF] whitespace-nowrap text-white rounded-lg p-2"
            type="submit"
          >
            ارتقا به پنل کارفرما
          </button>
        </div>
      </form>
    </div>
  );
};

export default Hoghoghi;
