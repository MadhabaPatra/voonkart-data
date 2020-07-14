import React,{useState, useEffect} from 'react';
import Base from '../../core/BaseFolder/Base';
import { isAuthenticated } from '../../auth/helper';
import { Link } from 'react-router-dom';
import {getCategories,  createSubCategory ,getSubCategory,updatePropertyOfSubCategory} from '../admin-helper/adminapicall';
var randomstring = require("randomstring");


const UpdateSubCategory=({match})=>{

/*This Function is to add properties like 
For an example
Mobile
1.RAM
2.BRAND
3.CUSTOMER RATING (DEFAULT)
4.INTERNAL STORAGE
5.BATTERY CAPACITY
6.OPERATING SYSTEM
7.NETWORK TYPE
8.SCREEN SIZE
9.SIM TYPE
10.PRIMARY CAMERA 
11.SECONDARY CAMERA
12.PROCESSOR BRAND
13.RESOLUTION TYPE
14.BUDJECT 
15.CERTIFIED (DEFAULT)
*/

/*
Property fields
value:got value of that property
label:name of property
type: type of property (color,size,ram,normal)
*/
    const AddProperty=(event)=>{
        event.preventDefault();
        const id=randomstring.generate({
          length: 24,
          charset: 'alphabetic'
        });
        propertyData.push({value:propertyValue,label:propertyLabel,id:id})
        properties.map((prop,i)=>{
            if(prop.id===propertyId){
           prop.propertyData=propertyData;
            }
        })
        console.log(properties)
        updatePropertyData()
            } 

      const updatePropertyData=()=>{
        updatePropertyOfSubCategory(match.params.subcategoryId,user._id,token,{properties})
      .then(data=>{
        if(data.error){
          setValues({...values,error:data.error});
        }
        else{
          setValues({...values,error:"",propertyValue:"",propertyLabel:""});
          preload(match.params.subcategoryId)
        }
    })
    }   
 const deleteThisProperty=dataId=>{
    propertyData.map((data,i)=>{
          if(data.id===dataId){
            propertyData.splice(i,1)
          }
        })
        updatePropertyData()
    }     
    const {user,token}=isAuthenticated();
 
    const [values,setValues]=useState({
        name:"",
        photo:"",
        properties:[],
        propertyData:[],
        propertyValue:"",
        propertyLabel:"",
        propertyName:"",
        propertyId:"",
        loading:false,
        error:"",
        getaRedirect:false,
        formData:""
    })

    const {name, photo,categories,category,loading,error,createdSubCategory,createdSubcategoryId,getaRedirect,formData}=values;

    const {properties,propertyName,propertyId, propertyData,propertyLabel,propertyValue}=values;

    

    const preload=(subcategoryId)=>{
        getSubCategory(subcategoryId).then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }else{
             
                setValues({...values,
                        name:data.name,
                        properties:data.properties,
                        category:data.category
                    })
                    
            }
        })

        
    
    }
    useEffect(()=>{
    preload(match.params.subcategoryId)
    },[]);

    const onSubmit=(event)=>{
        event.preventDefault();
        setValues({...values,error:"",loading:true})
        createSubCategory(user._id,token,{name,photo,category,properties})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{
                setValues({...values, 
                name:"",
                photo:"",
                loading:false,
                createdSubCategory:data.name,
                createdSubcategoryId:data._id
            })
            }
        })
        .catch()
            }

    const handleChange=name=>event=>{
        setValues({...values,error:false,[name]:event.target.value});
        if(name==="property"){
          properties.map((prop,i)=>{
              if(prop.id===event.target.value){
                setValues({...values,propertyId:prop.id,propertyName:prop.propertyName,propertyData:prop.propertyData})
                console.log(values)
              }
          })
        }
       
    }

    const successMessage=()=>(
        <div className="alert alert-success mt-3" style={{display:1>2?"":"none"}}>
        </div>
    )
    const errorMessage=()=>(
        <div className="alert alert-danger mt-3" style={{display:error?"":"none"}}>
        <h4>{error}</h4>
        </div>
    )   
    const mySubCategoryForm=()=>(
        <form>
        <div className="form-group">
        <p className="lead">Enter the sub-category</p>
        <input type="text" className="form-control my-3" autoFocus required placeholder="For Ex. Summer" onChange={handleChange("name")} value={name} />
        </div>
        <div className="form-group">
        <select
          onChange={handleChange("property")}
          className="form-control"
          placeholder="property"
        >
          <option>Select Property</option>
         {properties && 
            properties.map((prop,index)=>(
            <option key={index} value={prop.id}>{prop.propertyName}</option>
        ))
        }
        </select>
      </div>
      <button className="btn btn-outline-info" onClick={onSubmit}>Create Sub Category</button>
        </form>
    );

    const SubCategoryAddtionalForm=()=>(

        <ul class="list-group accordion" id="accordionExample">
      <li class="list-group-item d-flex justify-content-between align-items-center text-primary" data-toggle="collapse" data-target="#color" aria-expanded="true" aria-controls="color">
      {propertyName} Data
        <span class="badge badge-danger badge-pill mr-2">{propertyData?propertyData.length:0}</span>
      </li>
      <div id="color" class="collapse show"  data-parent="#accordionExample">
      {SubCategorypropertyForm()} 
        </div>
    
     
    </ul>
        )

 const SubCategorypropertyForm=()=>(
        <div className="p-5 bg-secondary">
        {propertyData && 
            propertyData.map((data,i)=>(
            <div className="row" key={i}>
            <div className="form-group col-4">
            <input type="text" className="form-control" value={data.label}  disabled/>
            </div>
            <div className="form-group col-4">
            <input type="text" className="form-control" value={data.value}  />
            </div>
            <div className="col-4">
           <button className="btn btn-danger" onClick={()=>{deleteThisProperty(data.id)}}>Delete This</button>
            </div>
            </div>
          ))
          }

        <div className="row">
        <div className="form-group col-4">
        <input type="text" className="form-control" value={propertyLabel} onChange={handleChange("propertyLabel")}/>
        </div>
        <div className="form-group col-4">
        <input type="text" className="form-control" value={propertyValue}  onChange={handleChange("propertyValue")}/>
        </div>
         <div className="col-2">
       <button className="btn btn-warning" onClick={AddProperty} disabled={propertyLabel?false:true}>Add To </button>
        </div>
        </div>
        </div>
    )
return ( 
    <Base title="Add a productchere!" description="welcome to product creation section" className="container bg-info p-4">
            <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">Admin Home</Link>
    
            <div className="row bg-dark text-white rounded">
            <div className="col-md-8 offset-md-2 p-5">
            {successMessage()}
            {errorMessage()}
          {mySubCategoryForm()}
          {SubCategoryAddtionalForm()}
        
            </div>
            </div>
            </Base>
            );
}

export default UpdateSubCategory;
