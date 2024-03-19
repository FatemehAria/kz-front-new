import React from "react";
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
}: ChatProps) {
  const userMessages = senderText.filter(
    (item: any) => item.sender !== "Admin"
  );
  const adminMessages = senderText.filter(
    (item: any) => item.sender === "Admin"
  );
  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Promise.all([
      await handleFileUpload(),
      await sendResponseTicket(textInput),
    ]);
    // await handleFileUpload();
    // await sendResponseTicket(textInput);
  };
  const timestampConversion = (timestamp: number | Date | undefined) => {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(timestamp);
  };
  const combinedMessages = [...userMessages, ...adminMessages];
  const sortedMessages = combinedMessages.sort(
    (a, b) => a.timestamp - b.timestamp
  );
  return (
    <div className="flex flex-col">
      <div>
        {sortedMessages.map((item: any, index: number) => (
          <div
            key={index}
            className={`${styles.chatBubble} ${
              item.sender !== "Admin" ? styles.sender : styles.receiver
            }`}
          >
            <p>{item.content}</p>
            <span
              className={`flex ${
                item.sender === "Admin" ? "justify-start" : "justify-end"
              } `}
            >
              {timestampConversion(item.timestamp)}
            </span>
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => handleSubmission(e)}
        className="bg-[#4866CE] rounded-[4px] flex"
      >
        <textarea
          name=""
          id=""
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
            className={`p-2 rounded-[4px] ${
              fileSelected === true
                ? " text-[#4866CE] bg-[#EAEFF6]"
                : "bg-[#d2d7dd] text-[#8c8f93]"
            }`}
            type="submit"
            disabled={fileSelected === true ? false : true}
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
