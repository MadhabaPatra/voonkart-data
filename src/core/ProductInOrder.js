import React from 'react';
import { Link } from "react-router-dom";
import ProductImage from "./helper/ProductImage";
import { RUPPEE } from '../backend';



const ProductInOrder=({
    product
})=>{
       //fetch details from product
       const productId=product? product._id:""
       const productTitle=product? product.name:"product title is not available"
       const productDescription=product? product.description:"product Description is not available"
       const productOldPrice=product? product.oldprice:"product price is not available"
       const productPrice=product? product.price:"product price is not available"
       const productDiscount=product? product.discount:""
   
    return (
        <div class="card">
        <div class="card-body bg-secoundary">
        <span>{productTitle}</span>
        <p class="text-right">
        <img src="https://images.pexels.com/photos/4443538/pexels-photo-4443538.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="..." class="img-thumbnail" /> 
    
        </p>
    
        <hr />
        <span class="text-right text-primary">
        <a href="/plus" class="text-primary">VIEW PLUSZONE</a>
        </span>
        </div>
        </div>

         )
}


export default ProductInOrder;