import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Bounce, toast } from "react-toastify";
type GeneralMorakhasiProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};
function GeneralMorakhasi({ setStep }: GeneralMorakhasiProps) {
  const params = useSearchParams();
  const { localToken } = useSelector((state: any) => state.userRole);
  const [vacation, setVacation] = useState<
    {
      _id: string;
      FirstName: string;
      LastName: string;
      position: string;
      Vacation_Period: string;
      Type_of_leave: string;
      start_date: string;
      end_date: string;
      text: string;
    }[]
  >([]);
  const getAids = async () => {
    try {
      const { data } = await axios.get(
        "https://keykavoos.liara.run/AdminGeneral/Confirmation_Leaves",
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        }
      );
      setVacation(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAids();
  }, []);

  const approveVacation = async () => {
    try {
      const { data } = await axios.post(
        `https://keykavoos.liara.run/AdminGeneral/isConfirmation_Leave/${params.get(
          "confirm"
        )}`,
        { isConfirmation: "true" },
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

  const rejectVacation = async () => {
    try {
      const { data } = await axios.delete(
        `https://keykavoos.liara.run/AdminGeneral/Delete_Leave/${params.get(
          "reject"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        }
      );
      toast.success("رد شد.", {
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
    } catch (error) {
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
      console.log(error);
    }
  };

  const handleApproval = async () => {
    await approveVacation();
  };
  const handleRejection = async () => {
    await rejectVacation();
  };
  return (
    <div className="px-[3%] py-[2%] bg-[#4866CF1A] rounded-lg w-full text-center">
      <table className="w-full my-2">
        <thead className="border-b-[1px] border-black">
          <tr>
            <th></th>
            <th>مشخصات</th>
            <th>مدت مرخصی</th>
            <th>بازه زمانی</th>
            <th>علت</th>
          </tr>
        </thead>
        <tbody>
          {vacation.map((item) => (
            <tr key={item._id}>
              <td className="flex flex-row gap-4">
                <Link
                  href={`/panel/main-admin/adminstrative?reject=${item._id}`}
                  className="text-[#FF0000] text-sm"
                  onClick={() =>
                    item._id === params.get("reject") && handleRejection()
                  }
                >
                  <ImCross />
                </Link>
                <Link
                  href={`/panel/main-admin/adminstrative?confirm=${item._id}`}
                  className="text-[#008E0E]"
                  onClick={() =>
                    item._id === params.get("confirm") && handleApproval()
                  }
                >
                  <FaCheck />
                </Link>
              </td>
              <td>{`${item.FirstName} ${item.LastName}`}</td>
              <td>{item.Vacation_Period}</td>
              <td>{`${item.start_date} تا ${item.end_date}`}</td>
              <td>{item.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-indigo-500 text-white px-[1%] py-1 rounded-lg whitespace-nowrap"
        onClick={() => setStep(4)}
      >
        فرم های تایید شده
      </button>
    </div>
  );
}

export default GeneralMorakhasi;
