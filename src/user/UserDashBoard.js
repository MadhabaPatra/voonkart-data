import React,{useEffect} from 'react';
import { isAuthenticated } from '../auth/helper';
import { PLUS } from '../backend';
import { Link } from 'react-router-dom';
import { getUserData } from './helper/userapicalls';
import UserBase from './UserBase';

const UserDashboard=(	{setReload=f=>f,
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
    const ProfileInforamtion=()=>(
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
    )
    const ManageAddress=()=>(
        <div class="card">
        <div class="card-body">
        <h5 class="text-danger">Manage Addresses</h5>
        <div class="card"><div class="card-body">
         <Link class="genric-btn primary" to="/account/address/new">{PLUS} ADD A NEW ADDRESS </Link>
        </div></div>

        <div class="my-4">
        {addresses?(addresses.map((address,index)=>(
            <div class="card" key={index}><div class="card-body">
            <h5><span class="badge badge-info">{address.pincode}</span></h5>
            <h5>{address.fname} {address.lname} {address.phone}</h5>
            <span>{address.address1},{address.address2},{address.town},{address.district},{address.state}</span>
            <br />
            <button class="genric-btn info " role="button" onClick={EditAddress(address.id)}> Edit</button>
             <button class="genric-btn danger " role="button" onClick={() => {DeleteAddress(address.id);
            	setReload(!reload)
              }}> Delete</button>
           </div></div>  
        ))):
        ("")}
        </div>
       
    
        </div>
        </div>
    )
    const EditAddress=()=>(
        <div>
        </div>
    )
    const DeleteAddress=(addressId)=>{

    }
    const AddAddress=()=>(
        <div>
        </div>
    )
    const MyCoupons=()=>(
        <div>
        this is coupons content
        </div>
    )
    const data=()=>( <div class="col-lg-8 col-md-8 col-xs-12 p-2">
    <div class="tab-content" id="nav-tabContent">
      <div class="tab-pane fade" id="data-profile" role="tabpanel" aria-labelledby="button-profile-information">
      {ProfileInforamtion()}
      </div>
      <div class="tab-pane fade  show active" id="data-address" role="tabpanel" aria-labelledby="button-manage-addresses">
     {ManageAddress()}
      </div>
      <div class="tab-pane fade" id="data-coupons" role="tabpanel" aria-labelledby="button-my-coupons">
      {MyCoupons()}
      </div>
    </div>
  </div>
)
    return (
      <UserBase >
      
      </UserBase>
    )
}


export default UserDashboard;