"use client";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import React from "react";

export default function CaptchaProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const recaptchaKey: string | undefined =
        process?.env?.RECAPTCHA_SITE_KEY;
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={recaptchaKey ?? "NOT DEFINED"}
        >
            {children}
        </GoogleReCaptchaProvider>
    );
}