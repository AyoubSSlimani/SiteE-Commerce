import { Link } from 'react-router-dom'
import { products } from '../App'
export default function Navbar() {
  return (
    <div className="h-12 bg-blue-500 flex justify-between items-center px-20     ">
        <Link to="/panier">Panier</Link>
        <h1>{products.value.length}</h1>
        <Link to="/">Page</Link>
        </div>
  )
}
