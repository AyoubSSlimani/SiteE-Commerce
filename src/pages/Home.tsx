import data from "../data/items.json";
import Article from "../components/Article";
import { ArticleType } from "../App";
export default function Home() {
  console.log("home");
  return (
    <div id="home">
      <div
        className="flex flex-row flex-wrap gap-5 justify-center"
        id="listarticle"
      >
        {data.map((item: ArticleType) => (
          <Article key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
