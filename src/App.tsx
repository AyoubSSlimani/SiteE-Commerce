import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Panier from "./pages/Panier.tsx";
import Navbar from "./components/Navbar.tsx";

export type ArticleType = {
  id: number;
  imgUrl: string;
  name: string;
  price: number;
  quantity?: number;
};

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/panier" element={<Panier />} />
      </Routes>
    </>
  );
}
