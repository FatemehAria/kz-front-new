import Image from "next/image";

const PanelnavPointer = () => {
  return (
    <Image
      src="/sidebar/pointer.png"
      alt="pointer"
      width={15}
      height={10}
      className="-rotate-90 mx-auto"
    />
  );
};
export default PanelnavPointer;
