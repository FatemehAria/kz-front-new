"use client";
import React, { useEffect, useState } from "react";
import styles from "./in-hand.module.css";
import { animated, useSpring } from "@react-spring/web";
import Image from "next/image";
import board from "../../public/in-hand/board.svg";
const { inHandBackground } = styles;

const InHand = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [heightReached, setHeightReached] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const stopAnimation = () => {
    setIsAnimating(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsAnimating(true);
    }, 1000); // Start animation after 1 second delay
  }, []); // Run only on component mount

  useEffect(() => {
    setIsAnimating(true);
    setHeightReached(false);
    setTimeLeft(30);
  }, []); // Run only on component mount

  const hookSpring = useSpring({
    from: { y: 0 },
    to: { y: 30 },
    config: { duration: 3000 },
    onStart: () => {
      setIsAnimating(true);
    },
    onFrame: (props) => {
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
    to: { height: 30 },
    config: { duration: 3000 },
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
        <div className="absolute top-52 left-[43%]">
          {" "}
          <animated.div
            style={{
              position: "absolute",
              top: hookSpring.y.to((value) => `${value}px`),
              left: "50%",
              transform: "translateX(-50%)",
              width: "230px",
              height: "230px",
            }}
          >
            <Image src={board} alt="board" />
          </animated.div>
          <animated.div
            style={{
              position: "absolute",
              top: "0",
              left: "50%",
              transform: "translateX(-1.75px)",
              width: "3.5px",
              background: "#413a64",
              height: ropeSpring.height.to((value) => `${value}px`),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default InHand;
