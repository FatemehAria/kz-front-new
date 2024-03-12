"use client";
import React, { useEffect, useState } from "react";
import styles from "./in-hand.module.css";
import { animated, useSpring } from "@react-spring/web";
import Image from "next/image";
import board from "../../public/in-hand/board.svg";
import { useStopwatch } from "react-timer-hook";
const { inHandBackground } = styles;

const InHand = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [heightReached, setHeightReached] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });
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
              width: "250px",
              height: "250px",
            }}
          >
            <div className="relative">
              <Image src={board} alt="board" />
              <span className="font-bold absolute top-[8rem] left-8 text-[20px]">
                به زودی حاضر میشه
              </span>
              <div className="absolute top-[10rem] left-1/2 -translate-x-1/2">
                <div className="text-[25px] font-bold flex">
                  <span className="px-1 rounded-sm text-yellow-600 flex gap-1">
                    {String(days)
                      .split("")
                      .map((digit, index) => (
                        <span
                          key={index}
                          className="border border-black px-2 rounded-[4px]"
                        >
                          {digit}
                        </span>
                      ))}
                  </span>
                  :
                  <span className="px-1 rounded-sm text-yellow-600 flex gap-1">
                    {String(hours)
                      .split("")
                      .map((digit, index) => (
                        <span
                          key={index}
                          className="border border-black px-2 rounded-[4px]"
                        >
                          {digit}
                        </span>
                      ))}
                  </span>
                  :
                  <span className="px-1 rounded-sm text-yellow-600 flex gap-1">
                    {String(minutes)
                      .split("")
                      .map((digit, index) => (
                        <span
                          key={index}
                          className="border border-black px-2 rounded-[4px]"
                        >
                          {digit}
                        </span>
                      ))}
                  </span>
                  :
                  <span className="px-1 rounded-sm text-yellow-600 flex gap-1">
                    {String(seconds)
                      .split("")
                      .map((digit, index) => (
                        <span
                          key={index}
                          className="border border-black px-2 rounded-[4px] relative"
                        >
                          {digit}
                          {/* <span className="absolute h-[1px] bg-black w-[3rem] bottom-5 left-0"></span> */}
                        </span>
                      ))}
                  </span>
                </div>
              </div>
            </div>
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
