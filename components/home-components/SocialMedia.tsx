"use client";
import Image from "next/image";
import React, { useState } from "react";
import InstagramLogo from "../../public/footer/insLogoSvg.svg";
import InstagramColoredLogo from "../../public/footer/insColoredLogoSvg.svg";
import WhatsappLogo from "../../public/footer/whatLogoSvg.svg";
import WhatsappColoredLogo from "../../public/footer/whatColoredLogoSvg.svg";
import BaleLogo from "../../public/footer/baleLogoSvg.svg";
import BaleColoredLogo from "../../public/footer/baleColoredLogoSvg.svg";
import TelegramLogo from "../../public/footer/telegramLogoSvg.svg";
import TelegramColoredLogo from "../../public/footer/telegramColoredLogoSvg.svg";
import styles from "./socialmedia.module.css";

function SocialMedia() {
  const [hoverLogo, setHoverLogo] = useState({
    hoverOne: false,
    hoverTwo: false,
    hoverThree: false,
    hoverFour: false,
  });
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[18.5px] whitespace-nowrap text-[#4866CF] font-semibold">
        ما را در شبکه های اجتماعی دنبال کنید
      </p>
      <div className="flex flex-col text-center justify-center items-center gap-5">
        <div className="flex justify-center items-center gap-8">
          <Image
            src={hoverLogo.hoverOne ? InstagramLogo : InstagramColoredLogo}
            alt="instagram"
            onMouseEnter={() =>
              setHoverLogo((last) => ({ ...last, hoverOne: true }))
            }
            onMouseLeave={() =>
              setHoverLogo((last) => ({ ...last, hoverOne: false }))
            }
            className={`${styles["socail-media-icon"]}`}
          />
          <Image
            src={hoverLogo.hoverTwo ? WhatsappLogo : WhatsappColoredLogo}
            alt="whatsapp"
            onMouseEnter={() =>
              setHoverLogo((last) => ({ ...last, hoverTwo: true }))
            }
            onMouseLeave={() =>
              setHoverLogo((last) => ({ ...last, hoverTwo: false }))
            }
            width={50}
            height={50}
          />
          <Image
            src={hoverLogo.hoverThree ? BaleLogo : BaleColoredLogo}
            alt="bale"
            onMouseEnter={() =>
              setHoverLogo((last) => ({ ...last, hoverThree: true }))
            }
            onMouseLeave={() =>
              setHoverLogo((last) => ({ ...last, hoverThree: false }))
            }
            className={`${styles["socail-media-icon"]}`}
          />
          <Image
            src={hoverLogo.hoverFour ? TelegramLogo : TelegramColoredLogo}
            alt="telegram"
            onMouseEnter={() =>
              setHoverLogo((last) => ({ ...last, hoverFour: true }))
            }
            onMouseLeave={() =>
              setHoverLogo((last) => ({ ...last, hoverFour: false }))
            }
            className={`${styles["socail-media-icon"]}`}
          />
        </div>
      </div>
    </div>
  );
}

export default SocialMedia;
