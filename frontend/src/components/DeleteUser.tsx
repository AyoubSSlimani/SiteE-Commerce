import axios from "axios";
import { useState } from "react";
import { userInfo } from "../signals/Signals";
import cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { TrimEmail } from "../utility/Utility";
export default function DeleteUser() {
  const navigate = useNavigate();
  const removeCookie = (key: string) => {
    cookie.remove(key, { expires: 1 });
  };
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  async function deleteAccount() {
    if (
      TrimEmail(userInfo.value?.email ? userInfo.value.email : "") !== "demo"
    ) {
      setLoading(true);
      axios({
        method: "delete",
        withCredentials: true,
        url: `${import.meta.env.VITE_SERVER_URL}/api/user/delete/${
          userInfo?.value?._id
        }`,
      })
        .then((response) => {
          if (response) {
            console.log(response);
          }
        })
        .catch((err: any) => {
          console.log(err);
        })
        .finally(() => {
          setIsDeleted(true);
          removeCookie("jwt");
          setTimeout(() => {
            navigate("/");
            window.location.reload();
            setLoading(false);
          }, 2000);
        });
    } else {
      setIsDemo(true);
    }
  }
  return (
    <>
      {loading && <Loading color="blue" />}
      <button
        type="button"
        className=" text-black underline hover:no-underline p-2 rounded-lg text-sm"
        onClick={() => setOpenModal((prev) => !prev)}
        disabled={loading}
      >
        Supprimer votre compte
      </button>
      {openModal && (
        // BACKDROP FILTER DIV
        <div className="fixed w-screen h-screen left-0 top-0 backdrop-blur-sm">
          {/* MODAL */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/3 max-sm:h-1/4 max-md:w-5/6 bg-white text-black shadow-md shadow-gray-500 p-4 max-md:p-2 flex flex-col items-center justify-center gap-4 max-md:text-sm text-center font-serif">
            <h3>
              Voulez vous vraiment supprimer{" "}
              <span className="underline">définitivement</span> votre compte?
            </h3>
            <div className="flex gap-8 max-md:gap-2">
              <button
                type="button"
                onClick={deleteAccount}
                className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-xl "
              >
                Confirmer la suppression
              </button>
              <button
                type="button"
                className="p-2 bg-gray-300 hover:bg-gray-400 text-black hover:text-white rounded-xl  w-28 max-sm:w-fit"
                onClick={() => setOpenModal((prev) => !prev)}
              >
                Annuler
              </button>
            </div>
            {isDeleted && (
              <span className="text-green-600 text-center">
                Votre compte a bien été supprimé définitivement <br /> La page
                va se recharger dans 2 secondes
              </span>
            )}
            {isDemo && (
              <span className="text-red-600 text-center">
                Le compte demo ne peut être supprimé.
              </span>
            )}
          </div>
          {/* END MODAL */}
        </div>
      )}
    </>
  );
}
