import axios from "axios";
import { useState } from "react";
import cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const [loading, setLoading] = useState(false);
  const removeCookie = (key: string) => {
    cookie.remove(key, { expires: 0 });
  };
  const navigate = useNavigate();
  async function Deconnexion() {
    setLoading(true);
    axios({
      method: "get",
      url: `${import.meta.env.VITE_SERVER_URL}/api/user/logout`,
    })
      .then((response) => {
        removeCookie("jwt");
        setLoading(false);
        console.log(response);
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      {loading && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-transparent border-2 border-blue-500 animate-spin" />
      )}
      <button
        className="text-black underline hover:no-underline  p-2 rounded-lg text-sm duration-200"
        onClick={Deconnexion}
      >
        Se déconnecter
      </button>
    </>
  );
}
