import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ApprovedLeaves() {
  const { localToken } = useSelector((state: any) => state.userRole);
  const [approvedLeaves, setApprovedLeaves] = useState<
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
  const getApprovedLeaves = async () => {
    try {
      const { data } = await axios.get(
        "https://keykavoos.liara.run/AdminGeneral/Leaves",
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        }
      );
      setApprovedLeaves(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getApprovedLeaves();
  }, []);
  return (
    <div className="px-[3%] py-[2%] bg-[#4866CF1A] rounded-lg w-full text-center">
      <table className="w-full my-2">
        <thead className="border-b-[1px] border-black">
          <tr>
            <th>مشخصات</th>
            <th>مدت مرخصی</th>
            <th>بازه زمانی</th>
            <th>علت</th>
          </tr>
        </thead>
        <tbody>
          {approvedLeaves.map((item) => (
            <tr key={item._id}>
              <td>{`${item.FirstName} ${item.LastName}`}</td>
              <td>{item.Vacation_Period}</td>
              <td>{`${item.start_date} تا ${item.end_date}`}</td>
              <td>{item.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApprovedLeaves;
