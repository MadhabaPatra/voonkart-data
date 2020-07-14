import React,{useState, useEffect} from 'react';
import {getProducts} from './helper/coreapicalls';
import ProductCard from './ProductCard';

import Base from '../core/BaseFolder/Base';


const Home=()=>{
    const [products,setProducts]=useState([])
    const [error,setError]=useState(false)

    const loadAllProduct=()=>{
        getProducts().then(data=>{
            if(data.error){
        setError(data.error)
            }
            else{
             setProducts(data)       
            }
        })
    }
    useEffect(()=>{
        loadAllProduct();
    },[])

    return (
        <Base title="Profile page">
        <div className="slider-area ">
        <div className="slider-active">
            <div className="single-slider slider-height d-flex align-items-center slide-bg">
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8">
                            <div className="hero__caption">
                                <h1 data-animation="fadeInLeft" data-delay=".4s" data-duration="2000ms">Select Your New Perfect Style</h1>
                                <p data-animation="fadeInLeft" data-delay=".7s" data-duration="2000ms">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat is aute irure.</p>
                                <div className="hero__btn" data-animation="fadeInLeft" data-delay=".8s" data-duration="2000ms">
                                    <a href="industries.html" className="btn hero-btn">Shop Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 d-none d-sm-block">
                            <div className="hero__img" data-animation="bounceIn" data-delay=".4s">
                                <img src="assets/img/hero/watch.png" alt="" className=" heartbeat" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="popular-items section-padding30">
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-8 col-md-10">
                <div className="section-tittle mb-70 text-center">
                    <h2>Popular Items</h2>
                    <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.</p>
                </div>
            </div>
        </div>
        <div className="row">
        {products.map((product,index)=>{
            return  (
                
            <ProductCard product={product}/>
           
            )
        })}
      </div>
       
        <div className="row justify-content-center">
            <div className="room-btn pt-70">
                <a href="catagori.html" className="btn view-btn1">View More Products</a>
            </div>
        </div>
    </div>
</div>  
    
</Base>
    )
}


export default Home;