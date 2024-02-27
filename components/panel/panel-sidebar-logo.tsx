import Image from "next/image";
import Link from "next/link";
import React from "react";

const PanelSidebarLogo = () => {
  return (
    <div>
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="logo"
          width={160}
          height={160}
          className="flex justify-center items-center mx-auto mb-7"
        />
      </Link>
    </div>
  );
};

export default PanelSidebarLogo;
