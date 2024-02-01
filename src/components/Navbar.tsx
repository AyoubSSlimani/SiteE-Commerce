import { Link } from "react-router-dom";
import { products } from "../signals/Signals";
import { ArticleType } from "../App";
import { PiShoppingCartLight } from "react-icons/pi";

export default function Navbar() {
  const completedCount = products.value.reduce(
    (accumulator, currentValue: ArticleType) =>
      accumulator + (currentValue.quantity ? currentValue.quantity : 0),
    0
  );

  return (
    <nav className="h-16 bg-blue-500 flex justify-between items-center px-20 text-lg text-white">
      <Link to="/panier" className="relative">
        <PiShoppingCartLight size={42} color="white" />
        <span className="absolute bottom-0 right-0 flex justify-center items-center  bg-red-500 rounded-full text-center h-5 w-5">
          <p className="text-xs">{`${
            completedCount > 99 ? "99+" : completedCount
          }`}</p>
        </span>
      </Link>
      <Link to="/">Page</Link>
    </nav>
  );
}
