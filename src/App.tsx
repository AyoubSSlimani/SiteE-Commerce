import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Panier from './pages/Panier.tsx'
import Navbar from './components/Navbar.tsx';
import { signal } from '@preact/signals-react';

export type  ArticleType = {
  id: number;
  imgUrl: string;
  name: string;
  price: number;
}

export const products = signal<ArticleType[]>([]);




export default function 
() {
  
  return (
    <>
    <Navbar/>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/panier' element={<Panier/>}/>
      
    </Routes>
    </>
  )
}
