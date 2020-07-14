import React,{useState} from 'react';
import {Link} from "react-router-dom"
import Base from '../core/BaseFolder/Base';
import { signup } from '../auth/helper';
import ReactNotification ,{ store }from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'


const Signup=()=>{



const [values,setValues]=useState({
    name:"",
    email:"",
    password:"",
    phone:"",
    error:"",
    success:false
});

const {name,email,password,phone,error,success}=values;

const handleChange= name=>event=>{
    setValues({...values,error:false,[name]:event.target.value});
}

const onSubmit=event=>{
    event.preventDefault(false)
    setValues({...values,error:false});
    signup({name,email,password,phone}).then(data => {
        if(data.error){
           
            setValues({...values,error:data.error,success:false});  
          
        }
        else{
            setValues({...values,name:"",email:"",password:"",error:"",success:true}); 
        }
    }).catch(err=>{
        console.log(err);
    })
}

    const SignUpForm=()=>{
        return(
            <section className="login_part section_padding ">
           
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                        <div className="login_part_form">
                            <div className="login_part_form_iner">
                            {errorMessage()}
                            {successMessage()}
                                <h3>New to our Shop ! <br />
                                    Please Create an account</h3>
                                <form className="row contact_form">
                                    <div className="col-md-12 form-group p_star">
                                    <input type="text" className="form-control" id="name" name="name" value={name} onChange={handleChange("name")}
                                        placeholder="Username" />
                                    </div>
                                    <div className="col-md-12 form-group p_star">
                                        <input type="text" className="form-control" id="email" name="email" value={email} onChange={handleChange("email")}
                                            placeholder="email address" />
                                    </div>
                                    <div className="col-md-12 form-group p_star">
                                        <input type="password" className="form-control" id="password" name="password" value={password}
                                          onChange={handleChange("password")}  placeholder="Password" />
                                    </div>
                                    <div className="col-md-12 form-group p_star">
                                    <input type="number" className="form-control" id="phone" name="phone" value={phone}
                                      onChange={handleChange("phone")}  placeholder="Phone number" />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <div className="creat_account d-flex align-items-center">
                                            <input type="checkbox" id="f-option" name="selector" onClick={onSubmit}/>
                                            <label >Remember me</label>
                                        </div>
                                        <button type="submit" value="submit" className="btn_3" onClick={onSubmit}>
                                           create an account
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                    <div className="login_part_text text-center">
                        <div className="login_part_text_iner">
                            <h2>Existing Customer?</h2>
                            <p>There are advances being made in science and technology
                                everyday, and a good example of this is the</p>
                            <Link to="/login" className="btn_3">Sign in </Link>
                        </div>
                    </div>
                </div>
                
                    </div>
            </div>
        </section>
        )
    }  


    const successMessage=()=>{
        if(success){
            store.addNotification({
                title: "Your account signed up successfully. check you mail for verification !",
                message: "We sent you a verification code to your mail",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                
              })
        }
    }
    const errorMessage=()=>{
        if(error){
            store.addNotification({
                title: error,
                message: "Account creation failed !",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                
              })
        }
    }

    return (
        <Base title="Sign up Page" description="A page for user to sign up!">
        <ReactNotification />
        {SignUpForm()}
        <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>

    );
}
export default Signup;