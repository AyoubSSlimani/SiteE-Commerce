import {
  products,
  RemoveFromPanier,
  incrementArticle,
  decrementArticle,
} from "../signals/Signals";
import { ArticleType } from "../App";

export default function Panier() {
  const priceTotal = products.value.reduce(
    (accumulator, currentValue: ArticleType) =>
      accumulator + currentValue.quantity! * currentValue.price,
    0
  );

  const completedCount = products.value.reduce(
    (accumulator, currentValue: ArticleType) =>
      accumulator + (currentValue.quantity ? currentValue.quantity : 0),
    0
  );
  return (
    <div>
      <div className="p-8 flex flex-row flex-wrap justify-between">
        {products.value.map((product: ArticleType) => (
          <div
            key={product.id}
            className="w-2/5 flex flex-col justify-center items-center m-5 gap-1"
          >
            <img
              src={product.imgUrl}
              className="w-80 h-60"
              alt={product.name}
            />

            <h2>{product.name}</h2>
            <p>Prix : {(product.price * product.quantity!).toFixed(2)}€</p>
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
        {/* PRIX TOTAL */}

        {/* END PRIX TOTAL */}
      </div>
      <div>Prix total : {priceTotal.toFixed(2)}€ </div>
      <div>Quantité de produit: {completedCount} </div>
      <button
        type="button"
        className="bg-yellow-500 text-white p-2 hover:bg-yellow-600 duration-200 rounded-lg"
      >
        Passer commande
      </button>
    </div>
  );
}
