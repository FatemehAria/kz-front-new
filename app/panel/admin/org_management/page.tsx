import Link from "next/link";
import React from "react";

function OrgManagement() {
  return (
    <div className="grid grid-cols-1 gap-5">
      <div className="flex">
        <Link
          href={`/panel/admin/org_management/brands`}
          className="text-white bg-[#4866CF] p-2 rounded-[5px]"
        >
          برندها
        </Link>
        <Link
          href={`/panel/admin/org_management/departments`}
          className="text-white bg-[#4866CF] p-2 rounded-[5px]"
        >
          دپارتمان ها
        </Link>
      </div>
      <div className="bg-white shadow mx-auto rounded-2xl w-full p-[3%] text-center space-y-3">
        
      </div>
    </div>
  );
}

export default OrgManagement;
