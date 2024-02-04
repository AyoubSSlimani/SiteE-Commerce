import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="w-screen h-screen bg-gray-200 flex items-center justify-center">
      <div className="w-1/3 max-lg:w-1/2 max-md:w-11/12 h-1/2 bg-white rounded-lg flex flex-col mb-44">
        <div className="p-4 flex flex-col gap-3">
          <h2 className="text-xl self-center">Nom boutique</h2>
          {isLogin && <Login />}
          {!isLogin && <Signup />}
          <div className="text-sm max-sm:text-xs text-gray-500">
            <p className="mb-2 flex items-center justify-center">
              <span className="font-semibold">Demo:</span> <br />
              <span className="ml-2">
                email: <span className="font-semibold">demo@test.com </span>
              </span>
              <span className="ml-2">
                password: <span className="font-semibold">demo</span>
              </span>
            </p>
          </div>
        </div>

        {/* PASSER DE LOGIN A SIGNUP OU INVERSE */}
        <div className="flex flex-col gap-3 bg-gray-100 p-4 h-full">
          <h3 className="font-semibold text-lg">
            {isLogin ? "Nouveau client ?" : "Déjà client ? "}
          </h3>
          <button
            type="button"
            className="bg-white px-4 py-2 rounded-2xl text-blue-600 hover:bg-blue-600 hover:text-white duration-150 text-sm font-serif  border-2 border-blue-600"
            onClick={() => setIsLogin((prev) => !prev)}
          >
            {isLogin ? "Créer un compte" : "Se connecter"}
          </button>
        </div>
        {/* END PASSER DE LOGIN A SIGNUP OU INVERSE */}
      </div>
    </div>
  );
}
