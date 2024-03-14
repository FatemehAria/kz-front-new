import React from "react";
import styles from "./chat.module.css";
import ChatFileUpload from "./chat-file-upload";
const moment = require("moment-jalaali");
type ChatProps = {
  senderText: any;
  recieverText: any;
  textInput: string;
  setTextInput: React.Dispatch<React.SetStateAction<string>>;
  updateSenderText: (newMessage: string) => void;
  File: any;
  handleFileChange: any;
  handleFileUpload: any;
  sendResponseTicket: any;
};

function Chat({
  senderText,
  recieverText,
  textInput,
  setTextInput,
  updateSenderText,
  File,
  handleFileChange,
  handleFileUpload,
  sendResponseTicket,
}: ChatProps) {
  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Promise.all([
      await handleFileUpload(),
      await sendResponseTicket(textInput),
    ]);
    // console.log(textInput);
    // await sendResponseTicket(textInput)
  };
  const timestampConversion = (timestamp: number | Date | undefined) => {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(timestamp);
  };
  return (
    <div className="flex flex-col">
      <div>
        {senderText.map((item: any, index: number) => (
          <div key={index} className={`${styles.chatBubble} ${styles.sender}`}>
            <p>{item.content}</p>
            <span className="flex justify-end">
              {timestampConversion(item.timestamp)}
            </span>
          </div>
        ))}
      </div>
      {/* <div className={`${styles.chatBubble} ${styles.receiver}`}>
        {recieverText}
      </div> */}
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
        <span className="font-faNum flex flex-col self-end p-2 text-[#EAEFF6A1]">0/150</span>
        <div className="grid grid-cols-1 justify-center items-center w-[15%] px-3">
          <button
            className="text-[#4866CE] bg-[#EAEFF6] p-2 rounded-[4px]"
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
