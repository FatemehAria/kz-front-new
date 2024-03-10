import Footer from "@/components/home-components/footer";
import Nav from "@/components/home-components/nav";
import React from "react";
import ContactHeading from "./components/contact-heading";
import Options from "./components/options/options";
import Form from "./components/form/form";
import Map from "./components/map/map";

const Contact = () => {
  return (
    <React.Fragment>
      <Nav />
      <div dir="rtl" className="font-YekanBakh flex flex-col gap-14">
        <ContactHeading />
        <Options />
        <Form />
        <Map />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Contact;
