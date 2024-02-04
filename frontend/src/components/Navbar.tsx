import { Link } from "react-router-dom";
import { ArticleType } from "../App";
import { PiShoppingCartLight } from "react-icons/pi";
import Panier from "../pages/Panier";
import Volet from "./Volet";
import { useRef, useState } from "react";
import { AiOutlineUser, AiOutlineMenu } from "react-icons/ai";
import { userInfo, products } from "../signals/Signals";
import { TrimEmail } from "../utility/Utility";
import { useHover } from "./UseHover";
import HoveredAccount from "./HoveredAccount";
type NavbarProps = {
  setShowPanier: React.Dispatch<React.SetStateAction<boolean>>;
  showPanier: boolean;
};
export default function Navbar({
  setShowPanier,
  showPanier,
}: Readonly<NavbarProps>) {
  const completedCount = products.value.reduce(
    (accumulator, currentValue: ArticleType) =>
      accumulator + (currentValue.quantity ? currentValue.quantity : 0),
    0
  );
  const wrapperRef = useRef(null);
  const isHovered = useHover(wrapperRef);

  const [showVolet, setShowVolet] = useState(false);

  return (
    <nav className="z-50 fixed top-0 left-0 w-screen h-16 bg-blue-500 flex items-center justify-between px-32 max-md:px-16 max-sm:px-12 text-lg max-md:text-base max-sm:text-sm text-white">
      <div className="relative h-full flex items-center gap-8">
        <button type="button" onClick={() => setShowVolet((prev) => !prev)}>
          <AiOutlineMenu />
        </button>
        <Link to="/" className="hover:text-gray-200 duration-300">
          Catalogue
        </Link>
      </div>
      <div className="flex gap-12 max-md:gap-6">
        <button
          type="button"
          className="relative duration-500 hover:rotate-12"
          onClick={() => setShowPanier((prev) => !prev)}
        >
          <PiShoppingCartLight
            className="h-10 w-10 max-sm:h-8 max-sm:w-8"
            color="white"
          />
          <span className="absolute bottom-0 right-0 flex justify-center items-center  bg-red-500 rounded-full text-center h-5 w-5 max-sm:h-4 max-sm:w-4">
            <p className="text-xs max-sm:text-xxs">{`${
              completedCount > 99 ? "99+" : completedCount
            }`}</p>
          </span>
        </button>

        {/* SI PAS CONNECTE DIRIGER VERS /LOG SINON JUSTE AFFICHER LE NOM DE LA PERSONNE EN BAS DE LICONE ET PEUT ETRE UN MODAL */}
        {userInfo.value ? (
          <Link
            to="/compte"
            className="relative"
            ref={wrapperRef}
            onMouseOver={(e) => e.stopPropagation()}
          >
            <AiOutlineUser className=" rounded-full h-10 w-10 max-sm:h-8 max-sm:w-8 hover:text-gray-200 duration-300" />
            <p className="absolute left-1/2 -bottom-4 -translate-x-1/2 whitespace-nowrap text-xxs">
              {TrimEmail(userInfo.value.email)}
            </p>
            {isHovered && <HoveredAccount />}
          </Link>
        ) : (
          <Link to="/log" className="relative">
            <AiOutlineUser className=" rounded-full h-10 w-10 max-sm:h-8 max-sm:w-8 hover:text-gray-200 duration-300" />
            <p className="absolute left-1/2 -bottom-4 -translate-x-1/2 whitespace-nowrap text-xxs">
              Se connecter
            </p>
          </Link>
        )}
      </div>

      {showPanier && <Panier setShowPanier={setShowPanier} />}
      {showVolet && <Volet setShowVolet={setShowVolet} />}
    </nav>
  );
}
