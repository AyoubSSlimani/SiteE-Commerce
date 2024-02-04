import { effect, signal } from "@preact/signals-react";
import { ArticleType } from "../App";
import axios from "axios";

// LOGGED
export const userID = signal<Promise<string> | null>(getAuthentification());
export const userInfo = signal(userID.value ? getUserInfo() : null);

async function getAuthentification() {
  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:9999/jwtid`,
      withCredentials: true,
    });
    if (response) {
      return response.data;
    }
  } catch (err: any) {
    return null;
  }
}

async function getUserInfo() {
  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:9999/api/user/${userID.value}`,
      withCredentials: true,
    });
    if (response) {
      return response.data;
    }
  } catch (err: any) {
    console.log(err);
    return null;
  }
}

// LOGGED

// STRIPE CALL

// END STRIPE CALL

// PANIER PRODUCTS

export const products = signal<ArticleType[]>(getPanier());
// FONCTION QUI RECUPERE DU LOCAL STORAGE LE PANIER
function getPanier(): ArticleType[] | [] {
  const value = localStorage.getItem("panier");
  if (value == null) return [];
  return JSON.parse(value);
}
// END PANIER PRODUCTS

// VOLET CATEGORY SIGNAL

export const voletSignal = signal({
  voiture: false,
  livre: false,
  ordinateur: false,
  nourriture: false,
});
export function handleVoletSignal(id: string) {
  for (const [key, value] of Object.entries(voletSignal.value)) {
    if (key === id) {
      // Mettez à jour la valeur pour la clé spécifiée
      voletSignal.value = { ...voletSignal.value, [key]: !value };
    } else {
      voletSignal.value = { ...voletSignal.value, [key]: false };
    }
  }
}

// END VOLET CATEGORY SIGNAL

// END FONCTION QUI RECUPERE DU LOCAL STORAGE LE PANIER

export function AddToPanier(i: ArticleType): void {
  const foundProduct = products.value.find((product) => product.id === i.id);
  // SI LE PRODUIT EXISTE DEJA DANS LE PANIER, NE RIEN FAIRE
  if (!foundProduct) {
    products.value = [...products.value, { ...i, quantity: 1 }];
  }
}

export function RemoveFromPanier(id: number): void {
  const foundProduct = products.value.find((product) => product.id === id);
  // SI LE PRODUIT EXISTE PAS DANS LE PANIER, NE RIEN FAIRE
  if (foundProduct) {
    products.value = products.value.filter((p) => p.id !== id);
  }
}

export function incrementArticle(id: number): void {
  products.value = products.value.map((product) =>
    product.id === id
      ? { ...product, quantity: product.quantity ? product.quantity + 1 : 1 }
      : product
  );
}
export function decrementArticle(id: number): void {
  products.value = products.value
    .map((product) => {
      if (product.id === id && product.quantity! >= 1) {
        return {
          ...product,
          quantity: product.quantity! - 1,
        };
      } else {
        return product;
      }
    })
    .filter((product) => product.quantity! >= 1 || product.id !== id);
}

// EFFECT QUI SAUVEGARDE DANS LE LOCAL STORAGE CHAQUE FOIS QUE PRODUCTS CHANGE
effect(() => {
  localStorage.setItem("panier", JSON.stringify(products.value));
});
// END EFFECT QUI SAUVEGARDE DANS LE LOCAL STORAGE CHAQUE FOIS QUE PRODUCTS CHANGE
