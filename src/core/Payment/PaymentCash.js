import React,{useState,useEffect} from "react"
import {  cartEmpty } from "../helper/CartHelper";
import {     Redirect,withRouter } from "react-router-dom";

import {createOrder} from "../helper/OrderHelper"
import { isAuthenticated } from "../../auth/helper";




const PaymentCash=({
    products,finalamount,address,setReload=f=>f,reload=undefined,history
})=>{
  
    const [redirect,setRedirect]=useState(false)

    const getRedirect=(redirect,id)=>{
        if(redirect){
            return <Redirect to={`/ordersuccess/${id}`}/>
        }
      }
      
 const userId=isAuthenticated()&&isAuthenticated().user._id
 const token=isAuthenticated()&&isAuthenticated().token
 
    
    useEffect(()=>{

    },[reload])


    const showbtdropIn=()=>{
        return (
            <div>
            {
                products.length>0?(
                    <div>
                    <button class="btn btn-danger" onClick={onPurchase}>Place an order (cash)</button>
        </div>
                ):(<h3>please login</h3>)
            }
            </div>
        )
    }

const onPurchase=()=>{
    address.error=undefined
    address.pincodeData=undefined
            const orderData={
                products:products,
                transaction_id:"cash on delivery",
                amount:finalamount,
                address:address
            }
            createOrder(userId,token,orderData).then(data=>{
                if(data.error){
                    const customErrorMessage="You order is failed due to technical issues."
                    history.push(`/failed/${customErrorMessage}`);
                }
                else{
                    cartEmpty(()=>{
                        history.push(`/ordersuccess/${data._id}`);
                 });
                }
                
            })
          
}
    return (
        <div> {showbtdropIn()} {getRedirect(redirect)}</div>
      
    )
}


export default withRouter(PaymentCash);