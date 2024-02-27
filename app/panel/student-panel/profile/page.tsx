"use client";

import { useState } from "react";
import EditProfile from "./edit-profile/page";
import StudentProfileComponent from "./student-profile-component";

const Profile = () => {
  const [steps, setSteps] = useState(0);
  const renderSteps = () => {
    switch (steps) {
      case 0:
        return <StudentProfileComponent setSteps={setSteps} />;
      case 1:
        return <EditProfile />;
    }
  };
  return <div>{renderSteps()}</div>;
};
export default Profile;
