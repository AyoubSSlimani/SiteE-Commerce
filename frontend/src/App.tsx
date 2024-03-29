import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Navbar from "./components/Navbar.tsx";
import { useEffect, useState } from "react";
import Auth from "./components/Auth.tsx";
import { Preparation, userInfo } from "./signals/Signals.tsx";
import Compte from "./components/Compte.tsx";
import Settings from "./components/Settings.tsx";
import SuccessPayment from "./components/SuccessPayment.tsx";
export type ArticleType = {
  id: number;
  imgUrl: string;
  name: string;
  price: number;
  quantity?: number;
  category: string;
};
export type UserInfoType = {
  _id: string;
  email: string;
};

export default function App() {
  const [showPanier, setShowPanier] = useState(false);

  useEffect(() => {
    Preparation();
  }, []);
  return (
    <>
      <Navbar setShowPanier={setShowPanier} showPanier={showPanier} />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* SI LOGGEDIN, NE PAS METTRE LA ROUTE POUR /LOG */}
        {!userInfo.value && <Route path="/log" element={<Auth />} />}
        {userInfo.value && (
          <>
            <Route path="/compte" element={<Compte />}>
              <Route path="" element={<Settings />} />
            </Route>
            <Route path="/success-payment" element={<SuccessPayment />} />
          </>
        )}
      </Routes>
    </>
  );
}
