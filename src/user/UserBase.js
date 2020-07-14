import React,{useEffect} from 'react';
import Base from '../core/BaseFolder/Base';
import { isAuthenticated } from '../auth/helper';
import { PLUS } from '../backend';
import { Link } from 'react-router-dom';
import { getUserData } from './helper/userapicalls';

const UserBase=({children,setReload=f=>f,
    //function(f){return f}
    reload=undefined})=>{
    const noContent=()=>(
        <section class="confirmation_part section_padding">
        <div class="container">
              <div class="row">
                <div class="col-lg-12">
                  <div class="confirmation_tittle">
                    <span>Sorry,this content is not available right now.</span>
                  </div>
                </div>
        </div>
        </div>
        </section>
    )

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
        <Base title="UserDashboard page">
        <section class="confirmation_part section_padding px-5">
<div class="containner">
        <div class="row">
  <div class="col-lg-4 col-md-4 col-xs-12">
    <div class="list-group" id="list-tab" role="tablist">
      <a class="list-group-item list-group-item-action" id="button-profile-information" data-toggle="list" href="#data-profile" role="tab" aria-controls="profileinformation">Profile Information</a>
      <a class="list-group-item list-group-item-action active" id="button-manage-addresses" data-toggle="list" href="#data-address" role="tab" aria-controls="manageaddress">Manage Addresses </a> 
      <a class="list-group-item list-group-item-action" id="button-my-coupons" data-toggle="list" href="#data-coupons" role="tab" aria-controls="mycoupons">My Coupons</a> 
      <a class="list-group-item list-group-item-action" id="button-my-coupons" data-toggle="list" href="#data-coupons" role="tab" aria-controls="mycoupons">My Orders</a> 
    </div>
  </div>
  {children?children:noContent()}
</div>
</div>
</section>
       </Base>
    )
}


export default UserBase;