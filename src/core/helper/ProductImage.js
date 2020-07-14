import React from 'react';

import { API } from '../../backend';


const ProductImage=({
    product
})=>{
   // const imageurl=product.photo? `${API}/product/photo/${product._id}`: ""
   const imageurl="assets/img/gallery/popular2.png"
    return (
        <img src={imageurl} class="img-fluid" alt="photo" />
         
    )
}


export default ProductImage;