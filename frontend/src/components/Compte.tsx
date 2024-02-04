import { NavLink, Outlet } from "react-router-dom";

export default function Compte() {
  return (
    <div className="pt-16 w-screen h-screen">
      <div className="p-6 bg-white text-black text-sm font-mono flex flex-row gap-4">
        <NavLink
          to="/compte"
          className={({ isActive }) =>
            `underline hover:no-underline p-2 ${
              isActive ? "border-2 border-gray-300 rounded-lg" : ""
            }`
          }
        >
          Paramètres
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}
