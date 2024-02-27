import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ApprovedAids() {
  const { localToken } = useSelector((state: any) => state.userRole);
  const [approvedAids, setApprovedAids] = useState<
    {
      _id: string;
      FirstName: string;
      LastName: string;
      Amount_String: string;
      Amount_Number: string;
      text: string;
    }[]
  >([]);
  const getApprovedAids = async () => {
    try {
      const { data } = await axios.get(
        "https://keykavoos.liara.run/AdminGeneral/Aids",
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        }
      );
      setApprovedAids(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getApprovedAids();
  }, []);
  return (
    <div className="px-[3%] py-[2%] bg-[#4866CF1A] rounded-lg w-full text-center">
      <table className="w-full my-2">
        <thead className="border-b-[1px] border-black">
          <tr>
            <th>مشخصات</th>
            <th>مبلغ مساعده به حروف</th>
            <th>مبلغ مساعده به عدد</th>
            <th>علت</th>
          </tr>
        </thead>
        <tbody>
          {approvedAids.map((item) => (
            <tr key={item._id}>
              <td>{`${item.FirstName} ${item.LastName}`}</td>
              <td>{item.Amount_String}</td>
              <td>{item.Amount_Number}</td>
              <td>{item.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApprovedAids;
