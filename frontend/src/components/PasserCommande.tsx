import axios from "axios";
import { products, userInfo } from "../signals/Signals";
import { useNavigate } from "react-router-dom";

export default function PasserCommande() {
  console.log(products.value);
  const navigate = useNavigate();
  async function CreateStripeSession() {
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_SERVER_URL}/create-checkout-session`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(products.value),
      });
      if (response) {
        window.location = response.data.url;
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {userInfo.value && (
        <button
          type="button"
          className="bg-yellow-500 text-white px-4 py-2 hover:bg-yellow-400 duration-200 rounded-lg"
          id="btnCommande"
          onClick={CreateStripeSession}
        >
          Passer commande
        </button>
      )}
      {!userInfo.value && (
        <button
          type="button"
          className="bg-yellow-500 text-white px-4 py-2 hover:bg-yellow-400 duration-200 rounded-lg"
          onClick={() => navigate("/log")}
        >
          Passer commande
        </button>
      )}
    </>
  );
}
