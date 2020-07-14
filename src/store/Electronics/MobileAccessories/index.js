import React,{useState, useEffect} from 'react';
import {getProducts} from '../../../core/helper/coreapicalls';
import { Link } from 'react-router-dom';
import Base from '../../../core/BaseFolder/Base';
import ProductCard from '../../../core/ProductCard';


const MobileAccessoriesStore=()=>{

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
	
    
    const productData=()=>{
		products.map((product,index)=>{
            return  (
                
            <ProductCard product={product} key={index}/>
           
            )
        })
    }
    const categoryImages=()=>(
        <div class="section-top-border">
					<h3>Image Gallery</h3>
					<div class="row gallery-item">
						<div class="col-md-4">
							<a href="assets/img/elements/g1.jpg" class="img-pop-up">
								<div class="single-gallery-image" style="background: url(assets/img/elements/g1.jpg);"></div>
							</a>
						</div>
						<div class="col-md-4">
							<a href="assets/img/elements/g2.jpg" class="img-pop-up">
								<div class="single-gallery-image" style="background: url(assets/img/elements/g2.jpg);"></div>
							</a>
						</div>
						<div class="col-md-4">
							<a href="assets/img/elements/g3.jpg" class="img-pop-up">
								<div class="single-gallery-image" style="background: url(assets/img/elements/g3.jpg);"></div>
							</a>
						</div>
						<div class="col-md-6">
							<a href="assets/img/elements/g4.jpg" class="img-pop-up">
								<div class="single-gallery-image" style="background: url(assets/img/elements/g4.jpg);"></div>
							</a>
						</div>
						<div class="col-md-6">
							<a href="assets/img/elements/g5.jpg" class="img-pop-up">
								<div class="single-gallery-image" style="background: url(assets/img/elements/g5.jpg);"></div>
							</a>
						</div>
						<div class="col-md-4">
							<a href="assets/img/elements/g6.jpg" class="img-pop-up">
								<div class="single-gallery-image" style="background: url(assets/img/elements/g6.jpg);"></div>
							</a>
						</div>
						<div class="col-md-4">
							<a href="assets/img/elements/g7.jpg" class="img-pop-up">
								<div class="single-gallery-image" style="background: url(assets/img/elements/g7.jpg);"></div>
							</a>
						</div>
						<div class="col-md-4">
							<a href="assets/img/elements/g8.jpg" class="img-pop-up">
								<div class="single-gallery-image" style="background: url(assets/img/elements/g8.jpg);"></div>
							</a>
						</div>
					</div>
				</div>
    )

    const HeaderData=()=>{

        return (
            <div class="jumbotron jumbotron-fluid text-center">
            <div class="container">
           
            <h1 class="display-4">Mobile Accessories</h1>
            
        <span>
            <span>Covers & Cases</span>
            <span class="lead"> / </span>  
            <span>Powerbanks</span>
            <span class="lead"> / </span>  
            <span>Mobile Cables</span>
        </span>
            
        <br/>
    
        <span>
            <span>OTG Adapters</span>
            <span class="lead"> / </span>  
            <span>Selfie sticks</span>
            <span class="lead"> / </span>  
            <span>Screen Guards</span>
        </span>
            </div>
          </div>    
        )
    }

    
    return (
        <Base>
		   {HeaderData()}
		   <div className="popular-items">
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
					   <a href="/mobileparts/products" className="btn view-btn1">View More Products</a>
				   </div>
			   </div>
		   </div>
	   </div>  
		  
        </Base>
    )
}

export default MobileAccessoriesStore;