import React from "react";

const Support = () => {
  return (
    <div>
      <div className="w-[90%] mx-auto rounded-xl p-[2%] grid grid-cols-1 justify-center gap-[3%] lg:bg-profileBorderbg my-[2%]">
        <div className="bg-white w-full rounded-lg grid grid-cols-1 lg:gap-[80%] pt-[5%] pb-[15%] px-[3%] gap-[30%] text-center">
          <table className="w-full my-2">
            <thead className="border-b-[1px] border-black">
              <tr>
                <th>وضعیت</th>
                <th>تاریخ</th>
                <th>شماره تماس</th>
                <th>شماره دوره</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b-[1px] border-black">
                <td>9،900،000</td>
                <td>1399/10/11</td>
                <td>09123333333</td>
                <td>#2546</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Support;
