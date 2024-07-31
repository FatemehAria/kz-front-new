"use client";
import { useEffect, useState } from "react";

export const useCaptcha = (PhoneNumber: string) => {
  const [answer, setAnswer] = useState("");
  const [mathProblem, setMathProblem] = useState("");
  const [wrongAnswerMessage, setWrongAnswerMessage] = useState("");
  const [firstNumber, setFirstNumber] = useState(
    Math.floor(Math.random() * 10) + 1
  );
  const [secondNumber, setSecondNumber] = useState(
    Math.floor(Math.random() * 10) + 1
  );

  const correctAnswer = firstNumber + secondNumber;

  useEffect(() => {
    setMathProblem(`${firstNumber} + ${secondNumber}`);

    if (answer === "") {
      setWrongAnswerMessage("");
    } else if (parseInt(answer) !== correctAnswer && PhoneNumber) {
      setWrongAnswerMessage("پاسخ صحیح نیست.");
    } else if (parseInt(answer) === correctAnswer) {
      setWrongAnswerMessage("");
    }
  }, [answer, PhoneNumber, firstNumber, secondNumber]);

  let result = parseInt(answer) === correctAnswer
  
  return {
    mathProblem,
    wrongAnswerMessage,
    answer,
    correctAnswer,
    setAnswer,
    setSecondNumber,
    setFirstNumber,
    result
  };
};
