import { getData } from "./productData.mjs";

export default async function productList(selector, category){
    const element= document.querySelector(selector);
    const products= await getData(category);
    console.log(products);
}