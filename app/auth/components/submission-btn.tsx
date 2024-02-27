type SubmissionBtnProps = {
  text: string;
  validation?: boolean;
};
const SubmissionBtn = ({ text, validation }: SubmissionBtnProps) => {
  return (
    <button
      className={`${
        validation ? "bg-[#4866CF] cursor-pointer" : "bg-indigo-300"
      } text-white w-full whitespace-nowrap text-[24px] py-1 rounded-[7px]`}
      disabled={!validation ? true : false}
      type="submit"
    >
      {text}
    </button>
  );
};
export default SubmissionBtn;
