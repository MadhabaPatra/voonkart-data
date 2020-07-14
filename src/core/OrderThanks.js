import React,{useState, useEffect} from 'react';
import Base from './BaseFolder/Base';
import { RUPPEE } from '../backend';
import { getAOrder } from './helper/OrderHelper';
import { isAuthenticated } from '../auth/helper';
import { pageNotAuthorized } from './Error';



const OrderThanks=({
  match, 
  setReload=f=>f,
  //function(f){return f}
  reload=undefined})=>{

    const [values,setValues]=useState({
      products:[],
      address:{},
      _id:"",
      date:"",
      amount:"",
      transaction_id:"",
      error:""
    }) 
    const {_id,products,address,date,amount,transaction_id,error}=values;

    const {user,token}=isAuthenticated();

   
    const preload=(orderId)=>{
      getAOrder(orderId,user._id,token).then(data=>{
        if(data.error){
          setValues({...values,error:data.error})
        }
        if(user._id!=data.user){
          setValues({...values,error:"Sorry,You are not authorized to view this page"})
        }
        else{
          setValues({...values,
            products:data.products,
            address:data.address,
            _id:data._id,
            date:data.createdAt,
            amount:data.amount,
            transaction_id:data.transaction_id
          })
        }
        
      })
  }

  useEffect(()=>{
      preload(match.params.orderId)
      },[]);

    const loadAllProducts=()=>{
        return (
            <div>
             {products.map((product,index)=>{
                 return (
                    <tr>
                    <th colspan="2"><span>{product.name}</span></th>
                    <th>x{product.count}</th>
                    <th> <span>{RUPPEE}{product.count * product.price}.00</span></th>
                  </tr>
                 )
             })}
             </div>
        )
    }
    
    return (
        <Base title="Profile page">
        {error?pageNotAuthorized():
         ( <section class="confirmation_part section_padding">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="confirmation_tittle">
                  <span>Thank you. Your order has been received.</span>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="single_confirmation_details">
                  <h4>order info</h4>
                  <ul>
                    <li>
                      <p>order number</p><span>: {_id}</span>
                    </li>
                    <li>
                      <p>data</p><span>: {date}</span>
                    </li>
                    <li>
                      <p>total</p><span>: {RUPPEE} {amount}</span>
                    </li>
                    <li>
                      <p>payment method</p><span>: {transaction_id==="cash on delivery"?"":"(Prepaid)"}{transaction_id}</span>
                    </li>
                  </ul>
                </div>
              </div>
              </div>
              <div class="row">
              <div class="col-lg-12">
                <div class="single_confirmation_details">
                  <h4>Shipping Address</h4>
                  <ul>
                    <li>
                      <p>Name</p><span>:{address.fname} {address.lname}</span>
                    </li>
                    <li>
                      <p>Address 1</p><span>: {address.address1}</span>
                    </li>
                    <li>
                      <p>Address 2</p><span>: {address.address2}</span>
                    </li>
                    <li>
                      <p>Town/city</p><span>: {address.town}</span>
                    </li>
                    <li>
                      <p>District</p><span>: {address.district}</span>
                    </li>
                    <li>
                      <p>State</p><span>: {address.state} ({address.pincode})</span>
                    </li>
                    <li>
                    <p>Phone</p><span class="text-danger">:{address.phone}</span>
                  </li>
                  <li>
                    <p>EMail</p><span>: {address.email}</span>
                  </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="row">
            <div class="col-lg-12">
              <div class="single_confirmation_details">
                <h5>keep your phone on. we will contact you this number while delivery.</h5>
              </div>
            </div>
          </div>
            <div class="row">
              <div class="col-lg-12">
                <div class="order_details_iner">
                  <h3>Order Details</h3>
                  <table class="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col" colspan="2">Product</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      
                   { loadAllProducts()}
                      <tr>
                        <th colspan="3">Subtotal</th>
                        <th> <span>$2160.00</span></th>
                      </tr>
                      <tr>
                        <th colspan="3">shipping</th>
                        <th><span>flat rate: $50.00</span></th>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th scope="col" colspan="3">Quantity</th>
                        <th scope="col">Total</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
         )
        }
       
       
       </Base>
    )
}


export default OrderThanks;