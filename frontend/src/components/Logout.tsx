import axios from "axios";
import { useState } from "react";
import cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

export default function Logout() {
  const [loading, setLoading] = useState(false);
  const removeCookie = (key: string) => {
    cookie.remove(key, { expires: 1 });
  };
  const navigate = useNavigate();
  async function Deconnexion() {
    setLoading(true);
    axios({
      method: "get",
      url: `${import.meta.env.VITE_SERVER_URL}/api/user/logout`,
      withCredentials: true,
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
      {loading && <Loading color="blue" />}
      <button
        className="text-black underline hover:no-underline  p-2 rounded-lg text-sm duration-200"
        onClick={Deconnexion}
      >
        Se déconnecter
      </button>
    </>
  );
}
