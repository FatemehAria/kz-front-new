"use client";
import React, { useState } from "react";
import styles from "./chat.module.css";
import ChatFileUpload from "./chat-file-upload";
const moment = require("moment-jalaali");
type ChatProps = {
  senderText: any;
  recieverText: any;
  textInput: string;
  setTextInput: React.Dispatch<React.SetStateAction<string>>;
  File: any;
  handleFileChange: any;
  handleFileUpload: any;
  sendResponseTicket: any;
  fileSelected: boolean;
  ticketId: string;
};

function Chat({
  senderText,
  textInput,
  setTextInput,
  File,
  handleFileChange,
  handleFileUpload,
  sendResponseTicket,
  fileSelected,
  ticketId,
}: ChatProps) {
  console.log("sender text", senderText);
  const userMessages = senderText.filter(
    (item: any) => item.register_user_id !== null
  );
  const adminMessages = senderText.filter(
    (item: any) => item.responser_user_id !== null
  );
  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (File && textInput) {
      Promise.all([
        await handleFileUpload(),
        await sendResponseTicket(textInput, ticketId),
      ]);
      setTextInput("");
    } else if (textInput && !File) {
      await sendResponseTicket(textInput, ticketId);
      setTextInput("");
    } else if (!textInput && File) {
      await handleFileUpload();
    }
  };
  const timestampConversion = (timestamp: number | Date | undefined) => {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(timestamp);
  };
  // const combinedMessages = [...userMessages, ...adminMessages];
  // const sortedMessages = combinedMessages.sort(
  //   (a, b) => a.timestamp - b.timestamp
  // );

  return (
    <div>
      <div className="flex flex-col gap-5">
        {senderText.map((item: any, index: number) => (
          <div key={index}>
            {/* Render the main message description if available */}
            {item.mainDescription && (
              <p
                className={`${styles.chatBubble} flex flex-col gap-1 ${
                  item.sender !== "Admin" ? styles.sender : styles.receiver
                }`}
              >
                {item.mainDescription}
                <span
                  className={`flex ${
                    item.sender === "Admin" ? "justify-start" : "justify-end"
                  }`}
                >
                  {timestampConversion(item.timestamp)}
                </span>
              </p>
            )}
            
            {/* Render nested messages */}
            {item.messages.length > 0 && (
              item.messages.map((msg: { childId: number; description: string; register_user_id: number | undefined; responser_user_id: number }, msgIndex: number) => (
                <div key={msgIndex} className={`${styles.chatBubble} ${styles.sender}`}>
                  <p>{msg.description}</p>
                  <span
                    className={`flex justify-end`}
                  >
                    {timestampConversion(msg.timestamp)} {/* Ensure you have a timestamp for each message */}
                  </span>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => handleSubmission(e)}
        className="bg-[#4866CE] rounded-[4px] flex"
      >
        <textarea
          cols={30}
          rows={4}
          className="p-[1%] text-white w-[85%] placeholder:text-[#EAEFF6A1]"
          maxLength={150}
          placeholder="متن مورد نظر خود را تایپ کنید"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        ></textarea>
        <span className="font-faNum flex flex-col self-end p-4 text-[#EAEFF6A1]">
          0/150
        </span>
        <div className="grid grid-cols-1 justify-center items-center w-[15%] px-3">
          <button
            className="p-2 rounded-[4px] text-[#4866CE] bg-[#EAEFF6]"
            type="submit"
          >
            ارسال پیام
          </button>
          <ChatFileUpload File={File} handleChange={handleFileChange} />
        </div>
      </form>
    </div>
  );
  
}

export default Chat;
