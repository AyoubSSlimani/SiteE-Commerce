import { userInfo } from "../signals/Signals";
import { TrimEmail } from "../utility/Utility";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";

export default function HoveredAccount() {
  const navigate = useNavigate();
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      role="button"
      className="p-4 cursor-default absolute -bottom-3 left-1/2 -translate-x-1/2 translate-y-full w-56 h-52 bg-white shadow-sm shadow-gray-400 flex flex-col items-center gap-4 text-black text-sm"
    >
      <h4>
        Hello, <strong>{TrimEmail(userInfo.value.email)}</strong>
      </h4>
      <Logout />

      <button
        className="underline hover:no-underline"
        type="button"
        onClick={() => navigate("/compte")}
      >
        Paramètres
      </button>
    </div>
  );
}
