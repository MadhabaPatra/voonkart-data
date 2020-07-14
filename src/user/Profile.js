import React,{useEffect} from 'react';
import { isAuthenticated } from '../auth/helper';
import { getUserData } from './helper/userapicalls';
import Base from '../core/BaseFolder/Base';
import Avatar from 'react-avatar';
import {Link} from "react-router-dom"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Profile=({setReload=f=>f,
    //function(f){return f}
    reload=undefined
  })=>{
    useEffect(()=>{
        preload()
        },[reload]);
    
        const {user,token}=isAuthenticated();
    const {_id,name,email,phone,addresses,purchases,coupons}=user;
    const preload=()=>{
      getUserData(user._id,token).then(data=>{
    console.log(data)
      })
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
<div class="container">
<div class="row">

    <div class="col-md-6 col-xs-12 mb-3">
    <div class="card">
    <div class="card-body text-center bg-secoundary">
    <span>Voonkart Plus</span>
    <p class="text-right"> $0 </p>
    <hr />
    <span class="text-right text-primary">
    <a href="/plus" class="text-primary">VIEW PLUSZONE</a>
    </span>
    </div>
    </div>
    </div>

    <div class="col-md-6 col-xs-12 mb-3">
    <div class="card">
    <div class="card-body text-center bg-secoundary">
    <span>My Orders</span>
    <hr />
    <span class="text-right text-primary">
    <a href="/account/orders" class="text-primary">VIEW ALL ORDERS</a>
    </span>
    </div>
    </div>
    </div>

    <div class="col-md-6 col-xs-12 mb-3">
    <div class="card">
    <div class="card-body text-center bg-secoundary">
    <span>My Cards & Wallet</span>
    <hr />
    <span class="text-right text-primary">
    <a href="/plus" class="text-primary">VIEW DETAILS</a>
    </span>
    </div>
    </div>
    </div>

    <div class="col-md-6 col-xs-12 mb-3">
    <div class="card">
    <div class="card-body text-center bg-secoundary">
    <span>My Addresses</span>
    <hr />
    <span class="text-right text-primary">
    <a href="/plus" class="text-primary">VIEW MORE</a>
    </span>
    </div>
    </div>
    </div>

    </div>
    <div class="row text-center">
    
    </div>
</div>


        <div class="card">
        <div class="card-body">
        <h5 class="text-danger">Personal Information</h5>
        <form>
        <div class="col-md-12 form-group p_star">
        <input type="text" class="form-control" id="name" name="name" value={name}
            placeholder="Username" />
        </div>
        <div class="col-md-12 form-group p_star">
            <input type="text" class="form-control" id="email" name="email" value={email} 
                placeholder="email address" />
        </div>
        <div class="col-md-12 form-group p_star">
        <input type="number" class="form-control" id="phone" name="phone" value={phone}
            placeholder="Phone number" />
        </div>
        <div class="col-md-12 form-group">
            <button type="submit" value="submit" class="btn button-danger" on>
              Update Information
            </button>
        </div>
    </form>
        </div>
      </div>
      </Base>
    )
}


export default Profile;