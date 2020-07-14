import React,{useState} from 'react';
import {Link,withRouter, Redirect} from "react-router-dom"
import Base from '../core/BaseFolder/Base';
import ReactNotification ,{ store }from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { signin,authenticate, isAuthenticated } from '../auth/helper';




const Signin=()=>{  

    const [values,setValues]=useState({
        email:"patramadhaba@gmail.com",
        password:"1234",
        error:"",
        loading:false,
        didRedirect:false
    });
    
    const {email,password,error,loading,didRedirect}=values;
    const {user}=isAuthenticated();

    const handleChange= name=>event=>{
        setValues({...values,error:false,[name]:event.target.value});
    }
    
const onSubmit=event=>{
    event.preventDefault(false)
    setValues({...values,error:false,loading:true});
    signin({email,password}).then(data => {
        if(data.error){
            setValues({...values,error:data.error,loading:false});  
        }
        else{
            authenticate(data,()=>{
                setValues({...values,didRedirect:true});  
            })
           
        }
    }).catch(err=>{
    console.log("sign in request failed")
    console.log(err)
    });
}
const performRedirect=()=>{
    if(didRedirect){
        if(user&&user.role===1){
            return <Redirect to="/admin/dashboard" />;
        }
        else{
            return <Redirect to="/user/dashboard" />;
        }
    }
    if(isAuthenticated()){
         return <Redirect to="/" />
        console.log("is authenticated is true")
    }
}

    const SignInForm=()=>{
        return(
            <section class="login_part section_padding ">
            <ReactNotification />
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 col-md-6">
                        <div class="login_part_text text-center">
                            <div class="login_part_text_iner">
                                <h2>New to our Shop?</h2>
                                <p>There are advances being made in science and technology
                                    everyday, and a good example of this is the</p>
                                <Link to="/signup" class="btn_3">Create an Account</Link>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <div class="login_part_form">
                            <div class="login_part_form_iner">
                            {errorMessage()}
                                <h3>Welcome Back ! <br />
                                    Please Sign in now</h3>
                                <form class="row contact_form" novalidate="novalidate">
                                    <div class="col-md-12 form-group p_star">
                                        <input type="text" class="form-control" id="name" name="name" value={email} onChange={handleChange("email")}
                                            placeholder="Username" />
                                    </div>
                                    <div class="col-md-12 form-group p_star">
                                        <input type="password" class="form-control" id="password" name="password" value={password}
                                          onChange={handleChange("password")}  placeholder="Password" />
                                    </div>
                                    <div class="col-md-12 form-group">
                                        <div class="creat_account d-flex align-items-center">
                                            <input type="checkbox" id="f-option" name="selector" />
                                            <label for="f-option">Remember me</label>
                                        </div>
                                        <button type="submit" value="submit" class="btn_3" onClick={onSubmit}>
                                            log in
                                        </button>
                                        <a class="lost_pass" href="#">forget password?</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        )
    }
    const loadingMessage=()=>{
        return (
            <div className="row">
            <div className="col-md-6 offset-sm-3 text-center">
            <div class="alert alert-info" style={{display:loading?"":"none"}} >
           
            </div>
        </div>
    </div>
        )
    }
    const errorMessage=()=>{
        if(error){
            store.addNotification({
                title: error,
                message: email,
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                
              })
        }
    }
    return (
        <Base title="Sign in Page" description="A page for user to sign in!">
        {SignInForm()}
        {performRedirect()}
        <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>

    );
}
export default Signin;
