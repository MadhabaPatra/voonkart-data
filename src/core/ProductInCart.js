import React from 'react';
import { changeQuantityOfItem,removeItemToCart, changeVarietyOfItem} from "./helper/CartHelper";
import { RUPPEE } from '../backend';



const ProductInCart=({
	product,
	setReload=f=>f,
    //function(f){return f}
    reload=undefined
})=>{
    	//fetch details from product
        const productTitle=product? product.name:"product title is not available"
        const productPrice=product? product.price:0
        const productQuantity=product? product.count:0
        const productTotal=product? product.count*product.price:0
        const productVarietyData=product.properties? product.properties:[]
        const productVariety=[]


        const handleChangeSelect=name=>event=>{
          const value=event.target.value;
          let obj=productVariety.find(o => o.name === name);
        var findindex = productVariety.indexOf(obj);
        if(~findindex){
          productVariety[findindex]={name:name,value:value}
        }
        else{
          productVariety.push({name:name,value:value}) 
        } 
        changeVarietyOfItem(product,productVariety,()=>setReload(!reload));
     }
     
        const handleChange=event=>{
             const value=event.target.value;
             console.log(value)
            changeQuantityOfItem(product,value,()=>setReload(!reload));
        }

    return (
        <tr>
        <td>
          <div class="media">
            <div class="d-flex">
              <img src="assets/img/gallery/card1.png" alt="" />
            </div>
            <div class="media-body">
              <p class="mx-1">{productTitle}</p>
              <span>
              Quantity:
              <select value={productQuantity} onChange={handleChange} class="form-control col-md-4  my-1">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
              </span>
              {productVarietyData&&productVarietyData.map((prop,key)=>(
                prop.isMultiple&&
               ( <span>
                {prop.propertyName}: 
                <select value={productVariety.find(o => o.name === prop.propertyName)} onChange={handleChangeSelect(prop.propertyName)} class="form-control col-md-4  my-1">
                <option value="">Select</option>
                 {prop.propertyData&&prop.propertyData.map((data,d)=>(
                  <option value={data.label}>{data.label}</option>
                 ))}
                 </select>
                 </span>)
             ) 
            )
            }
             
              <p>
            <small> <button className="genric-btn danger radius" onClick={() => {removeItemToCart(product._id);
										setReload(!reload)
										}}>Remove from cart</button></small>
            </p>
            </div>
          </div>
        </td>
        <td>
          <h5>{RUPPEE}{productPrice}.00</h5>
        </td>
        <td>
          <h5>{RUPPEE}{productTotal}.00</h5>
        </td>
      </tr>
    )
}


export default ProductInCart;