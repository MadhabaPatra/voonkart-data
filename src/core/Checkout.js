import React,{useState, useEffect} from 'react';
import Base from '../core/BaseFolder/Base';
import { loadCart,loadNumberOfProductsInCart } from './helper/CartHelper';
import { Redirect } from 'react-router-dom';
import { getCities} from './BaseFolder/Pincode';
import { RUPPEE, MINUS,PLUS,EQUAL } from '../backend';
import Paymentb from './Payment/Paymentb';
import PaymentCash from './Payment/PaymentCash';

const Checkout=()=>{
    const [products,setProducts]=useState([])
    const [orderType,setOrderType]=useState(true)
   
    const [address,setAddress]=useState({
        fname:"Madhaba",
        lname:"Patra",
        pincodeData:[],
        pincode:"761105",
        address1:"near mainroad",
        address2:"new busstand",
        town:"polasara",
        state:"",
        district:"",
        email:"madhabapatra@gmail.com",
        phone:"7873476062",
        notes:"no thank you"
    });
    const {fname,lname,address1,address2,pincodeData,pincode,town,district,state,email,phone,notes}=address;

    


    const handleChange= name=>event=>{
        if(name==="pincode"){
            const pin=event.target.value
            getCities(pin)
            .then(data=>{
                if(data[0].Status=="Success"){
                setAddress({...address,
                    error:false,
                    pincodeData:data[0].PostOffice,
                    pincode:pin,
                    district:data[0].PostOffice[0].District,
                    state:data[0].PostOffice[0].State
                });
                }  
            })
            .catch() 
        }
        setAddress({...address,error:false,[name]:event.target.value});
    } 

    useEffect(()=>{
        setProducts(loadCart);
      
    },[])

    

const loadAllProducts=()=>{
    return (
        <div>
         {products.map((product,index)=>{
             return (
                <li>
                <a>{product.name}
                  <span class="middle">x {product.count}</span>
                  <span class="last">{RUPPEE}{product.count * product.price}.00</span>
                </a>
              </li>
             )
         })}
         </div>
    )
}


const getTotalPrice=()=>{
    let amount=0
    products.map(p=>{
        amount=amount+(p.price*p.count)
    })
    return amount;
};
const getDeliveryPrice=()=>{
    let amount=40
    
    return amount;
};
const getDiscountPrice=()=>{
    let amount=20
    return amount;
};
const getFinalPrice=()=>{
    let amount=0;
    amount=getTotalPrice()+getDeliveryPrice()-getDiscountPrice();
    return amount;
};

const orderTypeChange=name=>event=>{
    const value=name==="cash"?true:false;
    if(value){
        setOrderType(true)
    }
    else{
        setOrderType(false)
    }
}
    return (
        <Base title="Profile page">
        {(loadNumberOfProductsInCart()>0?"":<Redirect to="/cart"></Redirect>)}
        <section class="checkout_area section_padding">
        <div class="container">
          <div class="returning_customer">
            <div class="check_title">
              <h2>
                Returning Customer?
                <a href="#">Click here to login</a>
              </h2>
            </div>
            <p>
              If you have shopped with us before, please enter your details in the
              boxes below. If you are a new customer, please proceed to the
              Billing & Shipping section.
            </p>
            <form class="row contact_form" action="#" method="post" novalidate="novalidate">
              <div class="col-md-6 form-group p_star">
                <input type="text" class="form-control" id="name" name="name" value=" " />
                <span class="placeholder" data-placeholder="Username or Email"></span>
              </div>
              <div class="col-md-6 form-group p_star">
                <input type="password" class="form-control" id="password" name="password" value="" />
                <span class="placeholder" data-placeholder="Password"></span>
              </div>
              <div class="col-md-12 form-group">
                <button type="submit" value="submit" class="btn_3">
                  log in
                </button>
                <div class="creat_account">
                  <input type="checkbox" id="f-option" name="selector" />
                  <label for="f-option">Remember me</label>
                </div>
                <a class="lost_pass" href="#">Lost your password?</a>
              </div>
            </form>
          </div>
          <div class="cupon_area">
            <div class="check_title">
              <h2>
                Have a coupon?
              </h2>
            </div>
            <input type="text" placeholder="Enter coupon code" />
            <a class="tp_btn" href="#">Apply Coupon</a>
          </div>
          <div class="billing_details">
            <div class="row">
              <div class="col-lg-8">
                <h3>Shipping Details</h3>
                <form class="row contact_form" action="#" method="post" novalidate="novalidate">
                <div class="col-md-12 form-group">
                    <input type="text" class="form-control" id="zip" name="zip" placeholder="Postcode/ZIP" value={pincode} onChange={handleChange("pincode")} />
                  </div>
                  <div class="col-md-12 form-group p_star">
						<div class="form-select" id="default-select">
							<select class="form-control" placeholder="Town/City" value={town} onChange={handleChange("town")}>
								<option value="" hidden onChange={handleChange("village")}>Town/City</option>
								{pincodeData.map((city,index)=>(
                                <option value={city.Name} key={index}>{city.Name}</option>
                                ))}

							</select>
						</div>
                  </div>
                  <div class="col-md-12 form-group">
                  <input type="text" placeholder="State" class="form-control"  name="state" value={state} onChange={handleChange("state")}/>
                    </div>

                  <div class="col-md-12 form-group">
                  <input type="text" placeholder="District" class="form-control"  name="district" value={district} onChange={handleChange("district")}/>
                    </div>
                  <div class="col-md-12 form-group">
                    <input type="text" class="form-control" id="add1" name="address1" placeholder="Address line 01" value={address1} onChange={handleChange("address1")}/>
                  </div>
                  <div class="col-md-12 form-group">
                    <input type="text" class="form-control" id="add2" name="address2" placeholder="Address line 02" value={address2} onChange={handleChange("address2")}/>
                  </div>
                  <div class="col-md-6 form-group">
                  <input type="text" class="form-control" id="first" name="fname" placeholder="First name" value={fname} onChange={handleChange("fname")}/>
                </div>
                <div class="col-md-6 form-group">
                  <input type="text" class="form-control" id="last" name="lname" placeholder="Last name" value={lname} onChange={handleChange("lname")}/>
                </div>
                <div class="col-md-6 form-group">
                  <input type="text" class="form-control" id="number" placeholder="Phone number" name="phone" value={phone} onChange={handleChange("phone")} />
                </div>
                <div class="col-md-6 form-group">
                  <input type="text" class="form-control" placeholder="Email Address" id="email" name="email"  value={email} onChange={handleChange("email")}/>
                </div>
                 
                  <div class="col-md-12 form-group">
                    <div class="creat_account">
                      <input type="checkbox" id="f-option2" name="selector" />
                      <label for="f-option2">Create an account?</label>
                    </div>
                  </div>
                  <div class="col-md-12 form-group">
                    <textarea class="form-control" name="message" id="message" rows="1"
                      placeholder="Order Notes" value={notes} onChange={handleChange("notes")}></textarea>
                  </div>
                </form>
              </div>
              <div class="col-lg-4">
                <div class="order_box">
                  <h2>Your Order</h2>
                  <ul class="list">
                    <li>
                      <a>Product <span>Total</span>
                      </a>
                    </li>
                    {loadAllProducts()}
                  </ul>
                  <ul class="list list_2">
                    <li>
                      <a>Subtotal
                        <span>{RUPPEE}{getTotalPrice()}.00</span>
                      </a>
                    </li>
                    <li>
                      <a>Shipping
                        <span class="text-warning">Flat rate: {PLUS}{RUPPEE}{getDeliveryPrice()}.00</span>
                      </a>
                    </li>
                    <li>
                    <a>Coupon applied
                      <span class="text-success">Flat discount: {MINUS}{RUPPEE}{getDiscountPrice()}.00</span>
                    </a>
                    </li>
                    <li>
                      <a>Total
                        <span class="text-primary">{EQUAL}{RUPPEE}{getFinalPrice()}.00</span>
                      </a>
                    </li>
                  </ul>
                  <div class="payment_item">
                    <div class="radion_btn">
                      <input type="radio" id="f-option5" name="paymentselect" onChange={orderTypeChange("cash")} defaultChecked/>
                      <label for="f-option5">Cash on Delivery</label>
                      <div class="check"></div>
                    </div>
                    <p>
                      Please send a check to Store Name, Store Street, Store Town,
                      Store State / County, Store Postcode.
                    </p>
                  </div>
                  <div class="payment_item active">
                    <div class="radion_btn">
                      <input type="radio" id="f-option6" name="paymentselect" onChange={orderTypeChange("online")} />
                      <label for="f-option6">Online Payment </label>
                      <img src="img/product/single-product/card.jpg" alt="" />
                      <div class="check"></div>
                    </div>
                    <p>
                      Please send a check to Store Name, Store Street, Store Town,
                      Store State / County, Store Postcode.
                    </p>
                  </div>
                  <div class="creat_account">
                    <input type="checkbox" id="f-option4" name="selector" />
                    <label for="f-option4">I’ve read and accept the </label>
                    <a href="#">terms & conditions*</a>
                  </div>
                  {!orderType?(<div class="row">
                          <div class="col-md-12 text-center">
                            <Paymentb products={products} address={address} finalamount={getFinalPrice()}/>
                          </div>
                           </div>):(<div class="row">
                           <div class="col-md-12 text-center">
                               <p><PaymentCash products={products} address={address} finalamount={getFinalPrice()} /></p>
                           </div>
                       </div>)} 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </Base>
    )
}


export default Checkout;