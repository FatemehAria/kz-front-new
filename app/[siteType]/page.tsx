import React from "react";
import Info from "./components/info";
import PlansTable from "./components/plans-table";
import { CorporateTableData, EcommerceTableData, MedicalTableData, TourismTableData } from "@/lib/data";

function SiteType({ params }: { params: { siteType: string } }) {
  return (
    <div className="flex flex-col gap-8">
      <Info />
      <PlansTable
        TableData={
          params.siteType === "corporate"
            ? CorporateTableData
            : params.siteType === "ecommerce"
            ? EcommerceTableData
            : params.siteType === "tourism"
            ? TourismTableData
            : params.siteType === "medical"
            ? MedicalTableData
            : []
        }
      />
    </div>
  );
}

export default SiteType;
