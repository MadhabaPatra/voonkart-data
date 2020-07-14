import React,{useState, useEffect} from 'react';
import Select from 'react-select';
import Base from '../../core/BaseFolder/Base';
import { isAuthenticated } from '../../auth/helper';
import { Link } from 'react-router-dom';
import { getCategories, createSubCategory, getSubCategoriesByCategory, getSubCategory, createProduct } from '../admin-helper/adminapicall';
var randomstring = require("randomstring");


const AddProduct=()=>{

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
        name:"Redmi Note 7 Pro",
        model:"Model 123",
        description:"screenguard for note7 pro mobile",
        photo:"",
        categories:[], 
        subcategories:[],
        subcateproperties:[],
        propertyName:"",
        propertyType:"text",
        isMultiple:false,
        propertyData:[],
        propertyIndivData:[],
        properties:[],
        loading:false,
        error:"",
        createdProduct:"",
        createdProductId:"",
        getaRedirect:false,
        formData:"",
        success:""
    })

    const {name,model,description, photo,categories,subcategories,category,subcategory,loading,error,createdProduct,createdProductId,getaRedirect,formData}=values;

    const {subcateproperties, propertyData,propertyIndivData,properties,propertyName,propertyType,isMultiple }=values;
    const {success}=values;

    const AddProperty=prop=>event=>{
        const value=event.target.value
        const id=randomstring.generate({
          length: 24,
          charset: 'alphabetic'
        });
        properties.push({propertyData:value,propertyName:prop.propertyName ,id:id,propertyType:prop.propertyType,isMultiple:prop.isMultiple})
           console.log(properties)
    }
    
    const AddMulProperty=prop=>{
        const id=randomstring.generate({
          length: 24,
          charset: 'alphabetic'
        });
        let obj=properties.find(o => o.propertyName === prop.propertyName);
        var findindex = properties.indexOf(obj);
        if(~findindex){
            properties[findindex]={propertyData:propertyIndivData,propertyName:prop.propertyName ,id:id,propertyType:prop.propertyType,isMultiple:prop.isMultiple}
        }
        else{
            properties.push({propertyData:propertyIndivData,propertyName:prop.propertyName ,id:id,propertyType:prop.propertyType,isMultiple:prop.isMultiple}) 
        }
        console.log(properties)
    }

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
        createProduct(user._id,token,{name,category,subcategory,model,description,properties})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{
                setValues({...values, 
                name:"",
                photo:"",
                loading:false,
                createdProduct:data.name,
                createdProductId:data._id
            })
            }
        })
        .catch()
            }

    const handleChange=name=>event=>{
        const value=event.target.value
         if(name==="category"){
            getSubCategoriesByCategory(event.target.value).then(data=>{
                if(data.error){
                    setValues({...values,error:data.error})
                }
                else{
                    setValues({...values,category:value,subcategories:data})
                }
            })
            .catch()
         }
         if(name==="subcategory"){
            getSubCategory(event.target.value).then(data=>{
                if(data.error){
                    setValues({...values,error:data.error})
                }
                else{
                    setValues({...values,subcategory:value,subcateproperties:data.properties})
                }  
            })
           
         }
        setValues({...values,error:false,[name]:event.target.value});
    }

    const handleChangeselect=(selectedOptions)=>{
        setValues({...values,propertyIndivData:selectedOptions})
        console.log(propertyIndivData)
       }
       
    const successMessage=()=>(
        <div className="alert alert-success mt-3" style={{display:createdProduct?"":"none"}}>
        <h4>{createdProduct} created successfully</h4>
        <Link to={`/admin/product/update/${createdProductId}`}> update</Link>
        </div>
    )
    const errorMessage=()=>(
        <div className="alert alert-danger mt-3" style={{display:error?"":"none"}}>
        <h4>{error}</h4>
        </div>
    )   
    const myProductForm=()=>(
        <form>
        <div className="form-group">
        <p className="lead">Enter the Product</p>
        <input type="text" className="form-control my-3" autoFocus required placeholder="For Ex. Summer" onChange={handleChange("name")} value={name} />
        </div>
        <div className="form-group">
        <input type="text" className="form-control my-3" autoFocus required placeholder="For Ex. Summer" onChange={handleChange("model")} value={model} />
        </div>
        <div className="form-group">
        <input type="text" className="form-control my-3" autoFocus required placeholder="For Ex. Summer" onChange={handleChange("description")} value={description} />
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

      <div className="form-group">
      <select
        onChange={handleChange("subcategory")}
        className="form-control"
        placeholder="Category"
      >
        <option>Select</option>
       {subcategories && 
        subcategories.map((subcate,index)=>(
          <option key={index} value={subcate._id}>{subcate.name}</option>
      ))
      }
      </select>
    </div>
     
        </form>
    );

    const ProductAddtionalForm=()=>(

        <ul class="list-group accordion" id="accordionExample">
      <li class="list-group-item d-flex justify-content-between align-items-center text-primary" data-toggle="collapse" data-target="#color" aria-expanded="true" aria-controls="color">
      Properties
        <span class="badge badge-danger badge-pill mr-2">{subcateproperties?subcateproperties.length:0}</span>
      </li>
      <div id="color" class="collapse show"  data-parent="#accordionExample">
      {ProductpropertyForm()} 
        </div>
    </ul>
        )

 const ProductpropertyForm=()=>(
        <div className="p-5 bg-secondary">
        {subcateproperties && 
            subcateproperties.map((prop,i)=>(
            <div className="row" key={i}>
            <div className="form-group col-4">
           <label>{prop.propertyName} {prop.isMultiple?"(Multiple)":""}</label>
            </div>
            <div className="form-group col-4">
            {prop.isMultiple?
                (<Select
                    isMulti
                    value={propertyIndivData}
                    onChange={handleChangeselect}
                    options={prop.propertyData}
                    
                    >
                    </Select>
                    ):
                (<select
                onChange={AddProperty(prop)}
                className="form-control"
                placeholder="Category"
            >
                <option>Select</option>
            {prop.propertyData && 
                prop.propertyData.map((data,d)=>(
                <option key={d} value={data._id}>{data.label}</option>
            ))
            }
            </select>)
            }   
            </div>
            {prop.isMultiple?( <div className="form-group col-4"><button className="btn btn-primary" onClick={AddMulProperty(prop)}>Add this</button></div>):""}
            </div>
            
          ))
          }
        </div>
    )
return ( 
    <Base title="Add a productchere!" description="welcome to product creation section" className="container bg-info p-4">
            <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">Admin Home</Link>
    
            <div className="row bg-dark text-white rounded">
            <div className="col-md-8 offset-md-2 p-5">
            {successMessage()}
            {errorMessage()}
          {myProductForm()}
          {ProductAddtionalForm()}
          <button className="btn btn-outline-info" onClick={onSubmit}>Create This Product</button>
            </div>
            </div>
            </Base>
            );
}

export default AddProduct;
