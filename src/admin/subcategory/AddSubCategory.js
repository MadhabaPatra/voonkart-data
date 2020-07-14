import React,{useState, useEffect} from 'react';
import Base from '../../core/BaseFolder/Base';
import { isAuthenticated } from '../../auth/helper';
import { Link } from 'react-router-dom';
import { getCategories, createSubCategory } from '../admin-helper/adminapicall';
var randomstring = require("randomstring");


const AddSubCategory=()=>{

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
        properties.push({propertyData:propertyData,propertyName:propertyName ,id:id,propertyType:propertyType,isMultiple:isMultiple})
        preload()
            } 
 const deleteThisProperty=propId=>{
    properties.map((prop,i)=>{
          if(prop.id===propId){
            properties.splice(i,1)
          }
        })
        preload()
    }     
    const {user,token}=isAuthenticated();
 
    const [values,setValues]=useState({
        name:"Mobiles",
        photo:"",
        categories:[], 
        properties:[],
        propertyName:"",
        propertyType:"text",
        isMultiple:false,
        propertyData:[],
        loading:false,
        error:"",
        createdSubCategory:"",
        createdSubcategoryId:"",
        getaRedirect:false,
        formData:""
    })

    const {name, photo,categories,category,loading,error,createdSubCategory,createdSubcategoryId,getaRedirect,formData}=values;

    const {properties, propertyData,propertyName,propertyType,isMultiple}=values;

 
    const preload=()=>{
        getCategories().then(data=>{
            if(data.error){
                setValues({...values,error:"error"})
            }else{
                setValues({...values,categories:data})
                console.log("cate: ",categories)
            }
        })
    }
    useEffect(()=>{
    preload()
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
    }

    const successMessage=()=>(
        <div className="alert alert-success mt-3" style={{display:createdSubCategory?"":"none"}}>
        <h4>{createdSubCategory} created successfully</h4>
        <Link to={`/admin/subcategory/update/${createdSubcategoryId}`}> update</Link>
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
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
         {categories && 
        categories.map((cate,index)=>(
            <option key={index} value={cate._id}>{cate.name}</option>
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
      Properties
        <span class="badge badge-danger badge-pill mr-2">{properties?properties.length:0}</span>
      </li>
      <div id="color" class="collapse show"  data-parent="#accordionExample">
      {SubCategorypropertyForm()} 
        </div>
    
     
    </ul>
        )

 const SubCategorypropertyForm=()=>(
        <div className="p-5 bg-secondary">
        {properties && 
            properties.map((prop,i)=>(
            <div className="row" key={i}>
            <div className="form-group col-4">
            <input type="text" className="form-control" value={prop.label}  disabled/>
            </div>
            <div className="form-group col-4">
            <input type="text" className="form-control" value={prop.value}  />
            </div>
            <div className="col-4">
           <button className="btn btn-danger" onClick={()=>{deleteThisProperty(prop.id)}}>Delete This</button>
            </div>
            </div>
          ))
          }

        <div className="row">
        <div className="form-group col-2">
        <input type="text" className="form-control" placeholder="For ex: color" value={propertyName} onChange={handleChange("propertyName")} name="propertyName" required/>
        </div>
        Type:
        <div className="form-group col-2">
        <select class="form-control" value={propertyType} onChange={handleChange("propertyType")} name="propertyType" required>
        <option value="" hidden>Select</option>
        <option value="text">text</option>
        <option value="color">Color</option>
        <option value="size">size</option>
        <option value="ram">ram</option>
        </select>
        </div>
        Is Multiple:
        <div className="form-group col-2">
        <select value={isMultiple} onChange={handleChange("isMultiple")} name="isMultiple" required class="form-control">
        <option value="" hidden>Select</option>
        <option value={true}>Yes</option>
        <option value={false}>No</option>
        </select>
        </div>
        <div className="col-2">
       <button className="btn btn-warning" onClick={AddProperty} disabled={propertyName?false:true}>Add More</button>
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

export default AddSubCategory;
