import { ArticleType } from "../App";
import {
  AddToPanier,
  RemoveFromPanier,
  decrementArticle,
  incrementArticle,
  products,
} from "../signals/Signals";
type ArticleProps = {
  item: ArticleType;
};

export default function Article({ item }: ArticleProps) {
  const isProductInPanier = products.value.find((p) => p.id === item.id);

  return (
    <div>
      <div className="relative flex flex-col items-center justify-center gap-1 p-12 shadow-md shadow-gray-400 max-sm:p-8">
        <img
          src={item.imgUrl}
          alt={item.name}
          className=" w-80 h-60 max-sm:h-48"
        />

        {isProductInPanier && (
          <span className="text-white absolute bottom-0 left-0 flex justify-center items-center  bg-blue-500 rounded-bl-none rounded-br-none rounded-tl-none rounded-tr-md text-center h-8 w-8 max-sm:h-6 max-sm:w-6">
            <p className="text-xs max-sm:text-xxs">{`${
              isProductInPanier.quantity! > 99
                ? "99+"
                : isProductInPanier.quantity!
            }`}</p>
          </span>
        )}
        <h3>{item.name}</h3>
        <p>{(item.price / 100).toFixed(2)}€</p>
        <div className="flex flex-row gap-1 items-center">
          {isProductInPanier && (
            <button
              className=" bg-red-100 h-8 w-8 rounded-lg border-black hover:bg-red-300 duration-300"
              type="button"
              onClick={() => decrementArticle(item.id)}
            >
              -
            </button>
          )}
          {!isProductInPanier && (
            <button
              type="button"
              className="rounded-lg 
            bg-purple-500
            p-2 text-white hover:text-gray-100"
              onClick={() => AddToPanier(item)}
            >
              Ajouter au panier
            </button>
          )}
          {isProductInPanier && (
            <button
              type="button"
              className="bg-red-500 p-2 rounded-lg text-white text-sm hover:bg-red-600 duration-300"
              onClick={() => RemoveFromPanier(item.id)}
            >
              Supprimer le produit
            </button>
          )}

          {isProductInPanier && (
            <button
              className="bg-blue-100 h-8 w-8 rounded-lg hover:bg-blue-300 duration-300"
              type="button"
              onClick={() => incrementArticle(item.id)}
            >
              +
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
