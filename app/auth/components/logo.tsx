import Image from "next/image";
import logo from "../../../public/logo.svg";
const Logo = () => {
  return <Image src={logo} width={190} alt="logo" />;
};
export default Logo;
