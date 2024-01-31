import React from 'react'
import { products } from '../App'
export default function Panier() {
  console.log(products.value);
  
  return (
    <div>
        <h1>{products.value.length}</h1>
    </div>
  )
}
