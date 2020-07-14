import React from 'react';
import { loadNumberOfProductsInCart } from '../helper/CartHelper';
import {Link,withRouter, Redirect} from "react-router-dom"
import {signout, isAuthenticated}  from "../../auth/helper"



const Menu=({history})=>{
    return (
  
        <header>
     
        <div className="header-area">
            <div className="main-header header-sticky">
                <div className="container-fluid">
                    <div className="menu-wrapper">
                        <div className="logo">
                            <Link to="/"><img src="/assets/img/logo/logo.png" alt="" /></Link>
                        </div>
                            <div className="logo  d-lg-none mb-4 text-dark">
                           
                           
                                </div>
                        <div className="main-menu d-none d-lg-block">
                            <nav>                                                
                                <ul id="navigation"> 
                                    <li><Link to="electonics/home">Electronics</Link></li>
                                    <li><a href="shop.html">Tvs & Appliances</a></li>
                                    <li><a href="about.html">Men</a></li>
                                    <li><a href="about.html">Woman</a></li>
                                    <li className="hot"><a href="#">Fashion</a>
                                        <ul className="submenu">
                                            <li><a href="shop.html"> Product list</a></li>
                                            <li><a href="product_details.html"> Product Details</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="blog.html">Sports,Book &more</a>
                                        <ul className="submenu">
                                            <li><a href="blog.html">Sports</a>
                                            </li>
                                            <li><a href="blog-details.html">Book</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="#">Home & Funitures</a>
                                    </li>
                                    <hr className="d-lg-none"></hr>
                                    <form className="d-lg-none">
                                    <input type="text" className="form-control" id="search-input" placeholder="Search product....." /> <br />
                                    <small> <button type="button" className="genric-btn danger"> Search </button></small>
                                </form>
                                    <li className="text-danger d-lg-none"><Link to="/cart"><span className="flaticon-shopping-cart"> [{loadNumberOfProductsInCart()}]</span> </Link></li>
                                    {isAuthenticated()&&isAuthenticated().user.name?(
                                        <li className="text-danger"><Link to="/account">{isAuthenticated().user.name.split(' ').slice(0, 1).join(' ')}'s account <span className="badge badge-danger">1</span> </Link>
                                    <ul className="submenu">
                                            <li><a href="/account">My Profile</a></li>
                                            <li><a href="/plus">Voonkart Plus</a></li>
                                            <li><a href="/account/orders">Orders</a></li>
                                            <li><a href="/wishlist">Wishlist [0]</a></li>
                                            <li><a href="/account/coupons">Coupons</a></li>
                                            <li><a onClick={()=>{
                                                signout(()=>{
                                                    history.push("/");
                                                })
                                            }}>Logout</a></li>
                                        </ul>
                                    </li>
                                    ):(
                                        <li className="text-danger"><Link to="#">Your Account</Link>
                                        <ul className="submenu">
                                            <li><Link to="/signin">Signin</Link></li>
                                            <li><Link to="/signup">Sign up</Link></li>
                                        </ul>
                                        
                                        </li>
                                    )}
                                    
                                </ul>
                                
                            </nav>
                        </div>
                       
                        <div className="header-right d-none d-lg-block">
                            <ul>
                                <li>
                                    <div className="nav-search search-switch">
                                        <span className="flaticon-search"></span>
                                    </div>
                                </li>
                                <li><a href="/cart"><span className="flaticon-shopping-cart"> [{loadNumberOfProductsInCart()}]</span> </a> </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mobile_menu d-block d-lg-none"></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="search-model-box">
        <div className="h-100 d-flex align-items-center justify-content-center">
            <div className="search-close-btn">+</div>
            <form className="search-model-form">
                <input type="text" id="search-input" placeholder="Searching key....." />
            </form>
        </div>
    </div>
    </header>
    )
}


export default withRouter(Menu)