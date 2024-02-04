import { useEffect, useRef } from "react";
import { handleVoletSignal } from "../signals/Signals";
import { AiOutlineMenu } from "react-icons/ai";

type VoletProps = {
  setShowVolet: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Volet({ setShowVolet }: VoletProps) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowVolet(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <div className={`fixed top-0 left-0 h-screen w-screen backdrop-blur-xs`}>
      <div
        ref={wrapperRef}
        className="z-50 flex flex-col gap-3 items-center absolute top-0 left-0 pt-14  translate-x-full overflow-y-auto h-screen w-1/3 max-md:w-2/3 max-sm:w-full text-black bg-white max-md:bg-white/[.97] animate-transvolet shadow-lg shadow-black"
      >
        <button
          type="button"
          className="fixed top-6 left-8 text-2xl text-gray-600 hover:text-gray-800 duration-300"
          onClick={() => setShowVolet((prev) => !prev)}
        >
          <AiOutlineMenu />       
        </button>
        <h2 className="text-xl uppercase font-mono">Catégories</h2>
        <div className="flex flex-col w-full h-full text-base justify-between">
          <button
            type="button"
            className="hover:text-gray-500 duration-300 shadow-sm shadow-gray-200  p-2 uppercase w-full h-full"
            onClick={() => {
              setShowVolet((prev) => !prev);
              handleVoletSignal("");
            }}
          >
            Toute catégorie
          </button>
          <button
            type="button"
            className="hover:text-gray-500 duration-300 shadow-sm shadow-gray-200 p-2 uppercase w-full h-full"
            onClick={() => {
              setShowVolet((prev) => !prev);
              handleVoletSignal("voiture");
            }}
          >
            <p className="">Voitures</p>
          </button>
          <button
            type="button"
            className="hover:text-gray-500 duration-300 shadow-sm shadow-gray-200 p-2 uppercase w-full h-full"
            onClick={() => {
              setShowVolet((prev) => !prev);
              handleVoletSignal("livre");
            }}
          >
            Livres
          </button>
          <button
            type="button"
            className="hover:text-gray-500 duration-300 shadow-sm shadow-gray-200 p-2 uppercase w-full h-full"
            onClick={() => {
              setShowVolet((prev) => !prev);
              handleVoletSignal("ordinateur");
            }}
          >
            Ordinateurs
          </button>
          <button
            type="button"
            className="hover:text-gray-500 duration-300 shadow-sm shadow-gray-200 p-2 uppercase w-full h-full"
            onClick={() => {
              setShowVolet((prev) => !prev);
              handleVoletSignal("nourriture");
            }}
          >
            Nourriture
          </button>
        </div>
      </div>
    </div>
  );
}
