import React from 'react'
import data from "../data/items.json";
import Article from "../components/Article";
import { products } from '../App';

export default function Home() {
  
  
  return (
    <div id="home">
      <div className='flex flex-row flex-wrap gap-5 justify-center' id='listarticle'>
        {data.map((item) => (
          <Article key={item.id} item={item}/>
          ))}
          </div>
    </div>
  )
}
