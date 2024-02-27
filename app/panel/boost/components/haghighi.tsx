import React, { useState } from "react";
import InfoFields from "../../components/info-fields";
import axios from "axios";
import { useSelector } from "react-redux";

const Haghighi = () => {
  const { localToken } = useSelector((state: any) => state.userRole);
  const [haghighiInfo, setHaghighiInfo] = useState({
    type: "حقیقی",
    Company_Name: "",
    National_ID: "",
    registration_number: "",
    Activity: "",
    Company_Contact_Name: "",
    FirstName: "",
    LastName: "",
    the_method_of_Introduction: "",
    The_reason_for_the_request: "",
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
    the_method_of_Introduction: string,
    The_reason_for_the_request: string
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
          The_reason_for_the_request,
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
      haghighiInfo.type,
      haghighiInfo.Company_Name,
      haghighiInfo.National_ID,
      haghighiInfo.registration_number,
      haghighiInfo.Activity,
      haghighiInfo.Company_Contact_Name,
      haghighiInfo.FirstName,
      haghighiInfo.LastName,
      haghighiInfo.the_method_of_Introduction,
      haghighiInfo.The_reason_for_the_request
    );
  };
  return (
    <div className="w-[90%] mx-auto h-full">
      <form onSubmit={(e) => handleSubmission(e)}>
        <div className="grid grid-cols-2 gap-x-[3%] gap-y-8">
          <InfoFields
            title="نام"
            type="text"
            info={haghighiInfo.FirstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setHaghighiInfo((last) => ({
                ...last,
                FirstName: e.target.value,
              }))
            }
          />
          <InfoFields
            title="نام خانوادگی"
            type="text"
            info={haghighiInfo.LastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setHaghighiInfo((last) => ({ ...last, LastName: e.target.value }))
            }
          />
          <InfoFields
            title="شماره ملی "
            type="text"
            info={haghighiInfo.National_ID}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setHaghighiInfo((last) => ({
                ...last,
                National_ID: e.target.value,
              }))
            }
          />
          <InfoFields
            title="علت درخواست"
            type="text"
            info={haghighiInfo.The_reason_for_the_request}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setHaghighiInfo((last) => ({
                ...last,
                The_reason_for_the_request: e.target.value,
              }))
            }
          />
          <InfoFields
            title="نحوه آشنایی"
            type="text"
            info={haghighiInfo.the_method_of_Introduction}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setHaghighiInfo((last) => ({
                ...last,
                the_method_of_Introduction: e.target.value,
              }))
            }
          />
        </div>
        <div className="flex justify-end">
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

export default Haghighi;
