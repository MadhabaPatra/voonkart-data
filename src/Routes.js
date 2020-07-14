import React from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom";

import AdminRoute from "./auth/helper/AdminRoutes"
import PrivateRoute from "./auth/helper/PrivateRoutes"

//pages
import Home from "./core/Home"
import Cart from './core/Cart'; 
import ProductDetails from "./core/ProductDetails"
import Checkout from './core/Checkout';
import OrderThanks from './core/OrderThanks';
import { pageNotFound,PageError } from './core/Error';

//user acconut
import UserDashboard from "./user/UserDashBoard"
import Profile from './user/Profile';
import Order from './user/Order';

//authentication routes
import Signin from './user/Signin';
import Signup from './user/Signup';


//admin rotes
import AdminDashboard from "./user/AdminDashBoard"
import AddCategory from "./admin/category/AddCategory"
import AddSubCategory from "./admin/subcategory/AddSubCategory"
import UpdateSubCategory from "./admin/subcategory/UpdateSubCategory"


//store pages
import MobileStore from './store/Electronics/Mobiles';
import MobileAccessoriesStore from './store/Electronics/MobileAccessories';
import AddProduct from './admin/product/AddProduct';


const Routes=()=> {
    return (
        <BrowserRouter>
            <Switch>
               
                <Route path="/" exact component={Home} />
                <Route path="/cart" exact component={Cart} />
                <Route path="/product/:productId" exact component={ProductDetails} />


                <Route path="/mobiles" exact component={MobileStore} />
                <Route path="/mobileparts" exact component={MobileAccessoriesStore} />

                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />



                <Route path="/checkout" exact component={Checkout} />
                <Route path="/ordersuccess/:orderId" exact component={OrderThanks} />
                
                

                <PrivateRoute path="/account" exact component={Profile} />
                <PrivateRoute path="/account/editprofile" exact component={Profile} />
                <PrivateRoute path="/account/orders" exact component={Order} />
                <PrivateRoute path="/user/wishlists" exact component={UserDashboard} />
                <PrivateRoute path="/user/addresses" exact component={UserDashboard} />


                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />

                <AdminRoute path="/admin/create/category" exact component={AddCategory} />

                <AdminRoute path="/admin/create/subcategory" exact component={AddSubCategory} />
                <AdminRoute path="/admin/subcategory/update/:subcategoryId" exact component={UpdateSubCategory} />

                <AdminRoute path="/admin/create/product" exact component={AddProduct} />



                <Route path="/failed/:error" exact component={PageError} />
                <Route path="*" component={pageNotFound} />
            </Switch>
        </BrowserRouter>
    );
}
export default Routes;