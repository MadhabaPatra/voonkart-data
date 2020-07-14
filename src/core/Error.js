import React from 'react';
import { isAuthenticated } from '../auth/helper';
import Base from './BaseFolder/Base';

/*
IF THERE IS NO CONTENT TO SHOW IN PAGE
*/
export const noContent=()=>{
    return (
        <section class="confirmation_part section_padding">
    <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="confirmation_tittle">
                <span>Sorry,this content isnot available right now.</span>
              </div>
            </div>
    </div>
    </div>
    </section>
    )
}
/*
IF The Page url is not found
*/
export const pageNotFound=()=>{
    return (
      <Base>
      <section class="confirmation_part section_padding">
      <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="confirmation_tittle">
                  <span>Sorry,this page is not found.</span>
                </div>
              </div>
      </div>
      </div>
      </section>
      </Base>
    )
}

/*
YOU CAN NOT ACCESS TO THIS PAGE
*/
export const pageNotAuthorized=()=>{
  return (
    
    <section class="confirmation_part section_padding">
    <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="confirmation_tittle">
                <span>Sorry,You are not authorized to view this page.</span>
              </div>
            </div>
    </div>
    </div>
    </section>
  )
}

/*
IF YOU ARE DOING SOMETHING,ERROR OCCURED
*/
export const PageError=({ match})=>{
  return (
 <Base>
 <section class="confirmation_part section_padding">
 <div class="container">
       <div class="row">
         <div class="col-lg-12">
           <div class="confirmation_tittle">
             <span>Sorry,{match.params.error}</span>
           </div>
         </div>
 </div>
 </div>
 </section>
 </Base> 
  )
}

/*
IF YOU ARE PRODUCT IS NOT FOUND
*/
export const productNotFound=()=>{
    return (
        <section class="confirmation_part section_padding">
    <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="confirmation_tittle">
                <span>Sorry,the requested product is not found.</span>
                <p>Either the product is deleted or you got broken link.</p>
                <button className="genric-btn danger radius">Countinue shopping</button>
              </div>
            </div>
    </div>
    </div>
    </section>
    )
}

export const notFound=()=>{
    return (
        <section class="confirmation_part section_padding">
    <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="confirmation_tittle">
                <span>Sorry,this page is not found.</span>
              </div>
            </div>
    </div>
    </div>
    </section>
    )
}

/*
IF CART IS EMPTY
*/
export const noProductInCart=()=>{
    return (
    isAuthenticated()?( <section class="confirmation_part section_padding">
    <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="confirmation_tittle">
                <span>Your cart is empty!</span>
                <p>Add items to the cart</p>
                <button className="genric-btn danger radius">Countinue shopping</button>
              </div>
            </div>
    </div>
    </div>
    </section>):( <section class="confirmation_part section_padding">
    <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="confirmation_tittle">
                <span>Missing Cart items?</span>
                <p>Login to see the items you added previously</p>
                <button className="genric-btn danger radius">Login</button>
              </div>
            </div>
    </div>
    </div>
    </section>)
)
}