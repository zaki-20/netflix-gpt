import { LOGO } from "../../utils/constant"

const Header = () => {

  return (
    <div className="relative  mx-auto w-full px-8 py-2 z-50 flex flex-col md:flex-row justify-between`">
      <img className="w-44  md:mx-0" src={LOGO} alt="logo" />
    </div>

  );
};
export default Header;