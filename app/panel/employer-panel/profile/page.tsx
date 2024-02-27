"use client";

import { useState } from "react";
import EmployerProfileComponent from "../components/employer-profile-component";
import EditProfile from "./edit-profile/page";

const Profile = () => {
  const [steps, setSteps] = useState(0);
  const renderSteps = () => {
    switch (steps) {
      case 0:
        return <EmployerProfileComponent setSteps={setSteps}/>;
      case 1:
        return <EditProfile />;
    }
  };
  return <div>{renderSteps()}</div>;
};
export default Profile;
