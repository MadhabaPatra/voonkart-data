import React,{useState, useEffect} from 'react';
import { isAuthenticated } from '../auth/helper';
import { getUserData, getOrders } from './helper/userapicalls';
import Base from '../core/BaseFolder/Base';
import Avatar from 'react-avatar';
import {Link} from "react-router-dom"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { RUPPEE } from '../backend';


const Order=({setReload=f=>f,
    //function(f){return f}
    reload=undefined
  })=>{

    const [orders,setOrders]=useState([])

    useEffect(()=>{
        preload()
        },[reload]);
    
        const {user,token}=isAuthenticated();
    const {_id,name,email,phone,addresses,purchases,coupons}=user;
    const preload=()=>{
      getUserData(user._id,token).then(data=>{
    console.log(data)
    loadOrder()
      })
    }

    const loadOrder=()=>{
        getOrders(user._id,token).then(data=>{
          setOrders(data)      
      console.log(data)
        })
      }
    
      const orderCard=({order})=>{
       
        const orderId=order? order._id:""
        const products=order? order.products:""
        const returnDate=order? order.returnDate:""
        const orderStausUpdateDate=order? order.statusDate:""
        const orderStatus=order? order.status:"" 

       return  (
        <a href={`/account/orders/${orderId}`} class="text-primary">
        <div class="card mt-2 h-5">
        <div class="card-body">
        <div class="container-fluid">
        <div class="row">
    
          <div class="col-6 col-md-4">
            <div class="photo-box">
            <img class="img-fluid" src="http://placehold.it/400x300" alt="image" />
            </div>
          </div>
    
          <div class="col-6 col-md-4 p-3">
          <span>Realme Narzo 10A (So Blue, 64 GB)</span>
                      <p>Color:white</p>
                      <p>Seller:Voonkart</p>
          </div>
    
          <div class="col-12 col-md-4 text-center p-3">
            <span>{orderStatus} on Tue, Jul 07</span>
            <p>Return policy valid till Jul 14</p>
            <a href={`/account/orders/${orderId}`} class="button button-primary">View Details</a>
          </div>
    
            </div>
        </div>
            
        </div>
    </div>
    </a>    
      )
        }
    return (
        <Base>
        <div class="jumbotron jumbotron-fluid text-center">
  <div class="container">
  <SkeletonTheme>
  <h1 class="display-4"> {!name?<Skeleton duration={2} width={100}/>:<Avatar name={name} size="100" round={true} maxInitials="2" />}</h1>
  <h2>{name}</h2>
  <span class="lead">Email:</span>
   <span>{!email?<Skeleton duration={2} width={100}/>:email}</span>
  </SkeletonTheme>
   
  </div>
</div>

<div class="text-center pt-0 mt-0">
<span>Select the item you want to track,return or need help with</span>
{orders?orders.map((order,key)=>{
       
  const orderId=order? order._id:""
  const orderProducts=order? order.products:""
  const returnDate=order?order.return:""
  const orderStatus=order? order.status:[]

 return  (
  <a href={`/account/orders/${orderId}`} class="text-primary">
  <div class="card mt-2 h-5">
  <div class="card-body">
  <div class="container-fluid">
  <div class="row">

    <div class="col-6 col-md-4">
      <div class="photo-box">
      <img class="img-fluid" src="https://rukminim1.flixcart.com/image/75/75/k8ddoy80/mobile/4/e/4/realme-narzo-10a-rmx2020-original-imafqechvukdhu6q.jpeg " alt="image" />
      </div>
    </div>

    <div class="col-6 col-md-4 p-3">
    <span>{orderProducts.length>1?orderProducts.map((p,k)=>(<span key={k}>{p.name}{k==orderProducts.length-1?"":","}</span>)):orderProducts[0].name}</span>
                <p>Seller:Voonkart</p>
    </div>

    <div class="col-12 col-md-4 text-center p-3">
      <span>{orderStatus[orderStatus.length-1].status} on {orderStatus[orderStatus.length-1].date}</span>
      <p>Return policy valid till {returnDate}</p>
      <a href={`/account/orders/${orderId}`} class="button button-primary">View Details</a>
    </div>

      </div>
  </div>
      
  </div>
</div>
</a>    
)
  }):"no order found"}
    </div>
   
    
      </Base>
    )
}


export default Order;