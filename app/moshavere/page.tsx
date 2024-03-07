"use client"
import axios from "axios";
import React from "react";

function Moshavere() {
  const getData = async () => {
    try {
      const { data } = await axios("https://keykavoos.liara.run/pay");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return <button onClick={() => getData()}>click</button>;
}

export default Moshavere;
