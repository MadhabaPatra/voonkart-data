import React,{useState, useEffect} from 'react';
import Base from './BaseFolder/Base';
import { getProduct } from './helper/coreapicalls';
import { Link } from 'react-router-dom';
import { addItemToCart,CheckItemInCart } from './helper/CartHelper';
import { Redirect } from "react-router-dom";
import { productNotFound } from './Error';
import { RUPPEE } from '../backend';



const ProductDetails=({
    match, 
    setReload=f=>f,
    //function(f){return f}
    reload=undefined})=>{
        const [redirect,setRedirect]=useState(false)
        const addToCart=()=>{
            addItemToCart(values,()=>setRedirect(true))
          }
    
         
            const getRedirect=(redirect)=>{
              if(redirect){
                return <Redirect to="/cart" />
              }
            }
        
    
        const [values,setValues]=useState({
            _id:"",
            name:"",
            description:"",
            oldprice:"",
            price:"",
            properties:[],
            stock:"",
            photo:"",
            category:"",
            subcategory:""
        })
        const {_id,name,description,oldprice,price,discount,properties,stock,category,subcategory,error}=values;
        const preload=(productId)=>{
            getProduct(productId).then(data=>{
            
                if(data.error){
                    setValues({...values,error:data.error})
                }else{
                    setValues({...values,
                            _id:data._id,
                            name:data.name,
                            description:data.description,
                            oldprice:data.oldprice,
                            price:data.price,
                            discount:data.discount,
                            colors:data.colors,
                            category:data.category._id,
                            subcategory:data.subcategory._id,
                            properties:data.properties,
                            stock:data.stock,
                        })
                        
                }
            })
        }
    
        useEffect(()=>{
            preload(match.params.productId)
            },[]);

    return (
        <Base>
        {getRedirect(redirect)}
        {error?productNotFound():(
            <div>
        <div className="slider-area ">
        <div className="single-slider slider-height2 d-flex align-items-center">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="hero-cap text-center">
                            <h2>{name}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="product_image_area">
    <div className="container">
    <div className="row justify-content-center">
        <div className="col-lg-12">
        <div className="product_img_slide owl-carousel">
            <div className="single_product_img">
                <img src="/assets/img/gallery/gallery1.png" alt="#" className="img-fluid" />
            </div>
            <div className="single_product_img">
                <img src="/assets/img/gallery/gallery01.png" alt="#" className="img-fluid" />
            </div>
            <div className="single_product_img">
                <img src="/assets/img/gallery/gallery1.png" alt="#" className="img-fluid" />
            </div>
        </div>
        </div>
        <div className="col-lg-8">
        <div className="single_product_text text-center">
            <h2>{name} </h2>
            <h3 className="text-success"><del>{RUPPEE}{oldprice}</del> {RUPPEE}{price}</h3>
            <p>
                {description}.
            </p>
            {properties&&properties.map((prop,key)=>(
                prop.isMultiple&&
                 <div className="container box_1170 border-top-generic">
                 <h5 className="text-heading">Available {prop.propertyName}</h5>
                 <div className="button-group-area">
                 {prop.propertyData&&prop.propertyData.map((data,d)=>(
                    <button className={"genric-btn primary radius btn-custom-color color-js"} style={{background: data.value}}  onclick="alert('7')"></button>
                 ))}
                 
                
                 </div>
                 <br/>
             </div>
             
             ) 
            )
            }
            <br/>
            <div className="card_area">
               {stock==0?( <div className="add_to_cart">
               <h2 className="text-danger">Out of stock</h2>
           </div>):(<div className="add_to_cart">
           {CheckItemInCart(_id)?
               ( <Link className="genric-btn success radius" to="/cart">go to cart</Link>)
               :(<a className="genric-btn success-border radius" onClick={addToCart}>add to cart</a>)}
           </div>
)}
            
            </div>
        </div>
        </div>
    </div>
    <ul className="nav nav-tabs" id="myTab" role="tablist">
  <li className="nav-item" role="presentation">
    <a className="nav-link active text-primary" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Menufactures</a>
  </li>
  <li className="nav-item" role="presentation">
    <a className="nav-link text-primary" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Product Information</a>
  </li>
  <li className="nav-item" role="presentation">
    <a className="nav-link text-primary" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Reviews</a>
  </li>
  <li className="nav-item" role="presentation">
    <a className="nav-link text-primary" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Reviews</a>
  </li>
</ul>
<div className="tab-content" id="myTabContent">
  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</div>
  <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</div>
  <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</div>
</div>
    </div>
</div>
</div> )
}
</Base>
    )
}


export default ProductDetails;