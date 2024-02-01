import { ArticleType } from "../App";
import { AddToPanier, incrementArticle } from "../signals/Signals";
type ArticleProps = {
  item: ArticleType;
};

export default function Article({ item }: ArticleProps) {
  console.log("article");
  return (
    <div className="flex flex-col items-center justify-center gap-1 p-12">
      <img src={item.imgUrl} alt={item.name} className="w-80 h-60" />
      <h3>{item.name}</h3>
      <p>{item.price}€</p>
      <div className="flex flex-row gap-1 items-center">
        <button
          type="button"
          className="rounded-lg bg-purple-500 p-2 text-white hover:text-yellow-400"
          onClick={() => AddToPanier(item)}
        >
          Ajouter au panier
        </button>
        <button
          className="bg-blue-100 h-8 w-8 rounded-lg hover:bg-blue-300 duration-300"
          type="button"
          onClick={() => incrementArticle(item.id)}
        >
          +
        </button>
      </div>
    </div>
  );
}
