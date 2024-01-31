import { ArticleType } from '../App';
import { products } from '../App'
type ArticleProps = {
    item: ArticleType;
}

export default function Article({item}:ArticleProps) {
    


    function AddToPanier(i:ArticleType) {
        products.value = [...products.value,  i]
    }
  return (
    <div>
        <h3>{item.name}</h3>
        <img src={item.imgUrl} alt={item.name} className='w-72 h-72'/>
        <p>{item.price}</p>
        <p>{products.value.length}</p>
        <button type="button" className="rounded-lg bg-purple-500 p-2 text-white hover:text-yellow-400" onClick={() => AddToPanier(item)}>Ajouter au panier</button>
    </div>
  )
}