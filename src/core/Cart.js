import React,{useState, useEffect} from 'react';
import Base from '../core/BaseFolder/Base';
import { noProductInCart } from './Error';
import { loadNumberOfProductsInCart } from './helper/CartHelper';
import { loadCart } from './helper/CartHelper';
import { Link } from 'react-router-dom';
import ProductInCart from './ProductInCart';
import { RUPPEE } from '../backend';


const Cart=()=>{

    const [products,setProducts]=useState([])
    const [reload,setReload]=useState(false)

    useEffect(()=>{
        setProducts(loadCart);
    },[reload])

    const loadAllProducts=()=>{
        return (
            <div>
             {products.map((product,index)=>{
                 return (
                 <ProductInCart key={index} product={product} RemoveFromCart={true} AddToCart={false} setReload={setReload} reload={reload}/>
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
 
    const showCartData=()=>{
        return (
            <section class="cart_area section_padding">
            <div class="container">
              <div class="cart_inner">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                    {products.map((product,index)=>{
                        return (
                        <ProductInCart key={index} product={product} RemoveFromCart={true} AddToCart={false} setReload={setReload} reload={reload}/>
                        )
                    })}
                  <tr>
                        <td></td>
                        <td></td>
                        <td>
                          <h5>Subtotal</h5>
                        </td>
                        <td>
                          <h5>{RUPPEE}{getTotalPrice()}.00</h5>
                        </td>
                      </tr>
                      <tr class="shipping_area">
                        <td></td>
                        <td></td>
                        <td>
                          <div class="shipping_box">
                            <ul class="list">
                              <li>
                                4 hour Delivery Rate: {RUPPEE}25.00
                                <input type="radio" aria-label="Radio button for following text input" />
                              </li>
                              <li class="active">
                                Free Delivery
                                <input type="radio" aria-label="Radio button for following text input" />
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="checkout_btn_inner float-right">
                    <Link class="btn_1" to="/">Continue Shopping</Link> &nbsp;
                    <Link class="btn_1 checkout_btn_1" to="/checkout">Proceed to checkout</Link>
                  </div>
                </div>
              </div>
              </div>
          </section>
           
        )
    }






    return (
        <Base title="Profile page">
        {loadNumberOfProductsInCart()===0? noProductInCart():
            showCartData()}
        </Base>
    )
}


export default Cart;