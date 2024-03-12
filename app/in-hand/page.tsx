"use client";
import React, { useEffect, useState } from "react";
import styles from "./in-hand.module.css";
import { animated, useSpring } from "@react-spring/web";
const { inHandBackground } = styles;
const InHand = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [heightReached, setHeightReached] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const stopAnimation = () => {
    setIsAnimating(false);
  };
  useEffect(() => {
    setIsAnimating(true);
    setHeightReached(false);
    setTimeLeft(30);
  }, []);
  const hookSpring = useSpring({
    from: { y: 0 },
    to: { y: 100 },
    config: { duration: 5000 },
    onStart: () => {
      setIsAnimating(true);
    },
    onFrame: (props: any) => {
      if (props.y >= 100 && !heightReached) {
        setHeightReached(true);
        startTimer();
      }
    },
  });

  const startTimer = () => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
      if (timeLeft === 0) {
        clearInterval(timer);
      }
    }, 1000);
  };

  const ropeSpring = useSpring({
    from: { height: 0 },
    to: { height: 100 },
    config: { duration: 5000 },
    onStart: () => {
      setIsAnimating(true);
    },
    onFrame: (props: any) => {
      if (props.height >= 100) {
        stopAnimation();
      }
    },
  });

  useEffect(() => {
    if (!isAnimating) {
      setTimeLeft(0);
    }
  }, [isAnimating]);
  return (
    <div className="">
      <div
        className={`bg-inHandSmall lg:bg-inHandLarge ${inHandBackground} relative`}
      >
        <div className="absolute top-52 left-[40%]">
          {" "}
          <animated.div
            style={{
              position: "absolute",
              top: hookSpring.y.to((value) => `${value}px`),
              left: "50%",
              transform: "translateX(-50%)",
              width: "20px",
              height: "20px",
              background: "gray",
              borderRadius: "50%",
            }}
          />
          <animated.div
            style={{
              position: "absolute",
              top: "0",
              left: "50%",
              transform: "translateX(-1px)",
              width: "2px",
              background: "brown",
              height: ropeSpring.height.to((value) => `${value}px`),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default InHand;
