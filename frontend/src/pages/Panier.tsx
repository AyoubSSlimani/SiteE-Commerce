import {
  products,
  RemoveFromPanier,
  incrementArticle,
  decrementArticle,
} from "../signals/Signals";
import { ArticleType } from "../App";
import { useEffect, useRef } from "react";
import PasserCommande from "../components/PasserCommande";

export default function Panier({
  setShowPanier,
}: {
  setShowPanier: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // FONCTION QUI GERE LE CLIC EN DEHORS DU PANIER
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowPanier(false);
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

  // END FONCTION QUI GERE LE CLIC EN DEHORS DU PANIER

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const priceTotal = products.value.reduce(
    (accumulator, currentValue: ArticleType) =>
      accumulator + currentValue.quantity! * (currentValue.price / 100),
    0
  );

  const completedCount = products.value.reduce(
    (accumulator, currentValue: ArticleType) =>
      accumulator + (currentValue.quantity ? currentValue.quantity : 0),
    0
  );

  return (
    <div className={`fixed top-0 right-0 h-screen w-screen backdrop-blur-xs`}>
      <div
        ref={wrapperRef}
        className="flex flex-col items-center absolute top-0 right-0 py-12  translate-x-full overflow-y-auto h-screen w-1/3 max-md:w-2/3 max-sm:w-full text-black bg-white max-md:bg-white/[.97] animate-trans shadow-lg shadow-black 
        "
      >
        {completedCount > 0 && (
          <>
            <button
              type="button"
              className="fixed top-2 right-8 text-5xl text-red-400 hover:text-red-600 duration-300"
              onClick={() => setShowPanier((prev) => !prev)}
            >
              &times;
            </button>
            <div className="flex flex-col gap-3 items-center text-base m-3">
              <div className="text-lg">
                Prix total : <strong>{priceTotal.toFixed(2)}€ </strong>{" "}
              </div>
              <div>
                Quantité de produit: <strong>{completedCount}</strong>{" "}
              </div>
              <PasserCommande />
            </div>
            <div className="text-lg m-3">
              <h2>Votre sélection d'articles</h2>
            </div>
            <div className=" flex flex-col text-base">
              {products.value.map((product: ArticleType) => (
                <div
                  key={product.id}
                  className=" flex flex-col justify-center items-center m-5 p-2 gap-1 shadow-lg shadow-gray-400 rounded-lg "
                >
                  <img
                    src={product.imgUrl}
                    className="w-48 h-32"
                    alt={product.name}
                  />

                  <h2>{product.name}</h2>
                  <p>
                    Prix :{" "}
                    <strong className="text-gray-600">
                      {((product.price / 100) * product.quantity!).toFixed(2)}€{" "}
                    </strong>
                  </p>
                  <p className="text-sm">Quantité: {product.quantity!}</p>
                  <button
                    type="button"
                    className="bg-red-500 p-2 rounded-lg text-white text-sm hover:bg-red-600 duration-300"
                    onClick={() => RemoveFromPanier(product.id)}
                  >
                    Supprimer le produit
                  </button>
                  <div className="flex flex-row justify-center items-center gap-2">
                    <button
                      className="bg-red-100 h-8 w-8 rounded-lg border-black hover:bg-red-300 duration-300"
                      type="button"
                      onClick={() => decrementArticle(product.id)}
                    >
                      -
                    </button>
                    <button
                      className="bg-blue-100 h-8 w-8 rounded-lg hover:bg-blue-300 duration-300"
                      type="button"
                      onClick={() => incrementArticle(product.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {completedCount === 0 && (
          <>
            <button
              type="button"
              className="fixed top-2 right-8 text-5xl text-red-400 hover:text-red-600   duration-300"
              onClick={() => setShowPanier((prev) => !prev)}
            >
              &times;
            </button>
            <p className="p-5 text-center">
              Vous n'avez pas d'articles pour le moment.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
