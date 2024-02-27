"use client";
import { useState } from "react";
import ProfileComponent from "../components/profile-component";
import EditInfoComponent from "../components/edit-info-component";

const Profile = () => {
  const [step, setStep] = useState(1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ProfileComponent />;
      default:
        return;
    }
  };
  return <div className="">{renderStep()}</div>;
};
export default Profile;
