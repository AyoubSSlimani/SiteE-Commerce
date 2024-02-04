import data from "../data/items.json";
import Article from "../components/Article";
import { ArticleType } from "../App";
import { voletSignal } from "../signals/Signals";
export default function Home() {
  let trueKey: string = "";
  for (const [key, value] of Object.entries(voletSignal.value)) {
    if (value === true) trueKey = key;
  }

  return (
    <div id="home" className="h-screen w-screen">
      <div
        className="flex flex-row flex-wrap justify-center gap-5 p-12 max-sm:p-4 my-16"
        id="listarticle"
      >
        {data
          .filter((el: ArticleType) => {
            if (trueKey) {
              return el.category === trueKey;
            } else {
              return el;
            }
          })
          .map((item: ArticleType) => (
            <Article key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
}
