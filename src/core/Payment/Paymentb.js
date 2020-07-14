import React,{useState,useEffect} from "react"
import {  cartEmpty } from "../helper/CartHelper";
import {  Redirect,withRouter } from "react-router-dom";
import { getmeToken, processPayment } from "../helper/paymentbhelper";
import {createOrder} from "../helper/OrderHelper"
import { isAuthenticated } from "../../auth/helper";
import DropIn from "braintree-web-drop-in-react";



const Paymentb=({
    products,finalamount,address,setReload=f=>f,reload=undefined,history
})=>{
    const [info,setInfo]=useState({
    loading:false,
    success:false,
    clientToken:null,
    error:"",
    instance:{}
    })

    const [redirect,setRedirect]=useState(false)

    const getRedirect=(redirect)=>{
        if(redirect){
          return <Redirect to="/success" />
        }
      }
      
 const userId=isAuthenticated()&&isAuthenticated().user._id
 const token=isAuthenticated()&&isAuthenticated().token
 
    const getToken=(userId,token)=>{
  getmeToken(userId,token).then(info=>{
    console.log(info)
      if(info.error){
          setInfo({...info,error:info.error})
      }else{
          const clientToken=info.clientToken
          setInfo({clientToken})
      }
  })
    }
    useEffect(()=>{
getToken(userId,token)
    },[reload])


    const showbtdropIn=()=>{
        return (
            <div>
            {
                info.clientToken!==null&&products.length>0?(
                    <div>
          <DropIn
            options={{ authorization: info.clientToken }}
            onInstance={(instance) => (info.instance = instance)}
          />
          <button class="btn btn-danger"  onClick={onPurchase}>Place an order {finalamount}</button>
        </div>
                ):(<h3>please login</h3>)
            }
            </div>
        )
    }

const onPurchase=()=>{
    setInfo({loading:true})
    let nonce;
    let getNonce=info.instance
    .requestPaymentMethod()
    .then(data=>{
        nonce=data.nonce
        const paymentData={
            paymentMethodNonce:nonce,
            amount:finalamount
        }
        processPayment(userId,token,paymentData)
        .then(data=>{
            setInfo({...info,success:data.success,loading:false})
            console.log("payment success")
            const orderData={
                products:products,
                transaction_id:data.transaction.id,
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
           
        })
        .catch(payerror=>{
            setInfo({loading:false,success:false})
            console.log("Payment failed")
            const customErrorMessage="You order is not completed due to Payment failed"
            history.push(`/failed/${customErrorMessage}`);
        })
    })
}
    return (
        <div> {showbtdropIn()} {getRedirect(redirect)}</div>
      
    )
}


export default withRouter(Paymentb);