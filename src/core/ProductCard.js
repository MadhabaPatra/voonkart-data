import React from 'react';
import { Link } from "react-router-dom";
import ProductImage from "./helper/ProductImage";
import { RUPPEE } from '../backend';



export const ProductCard=({
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
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
        <div className="single-popular-items mb-50 text-center">
            <div className="popular-img">
                <div className="text-center hot">
                {productDiscount}
                </div>
                <ProductImage product={product}/>
                <a href={`/product/${productId}`} >
                <div className="img-cap">
                    <span>View Product</span>
                </div>
                </a> 
               
                <div className="favorit-items">
                    <span className="flaticon-heart"></span>
                </div>
            </div>
             <div className="popular-caption">
             <a href={`/product/${productId}`} >
               <h3>{productTitle}</h3>
               <p>{productDescription}</p>
                <span><del> {RUPPEE}{productOldPrice}</del> {RUPPEE}{productPrice}</span>
            </a> 
            </div>
        </div>
    </div>
    )
}


export default ProductCard;