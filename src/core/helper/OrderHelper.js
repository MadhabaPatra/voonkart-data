import { API } from "../../backend";


export const createOrder=(userId,token,orderdata)=>{
 return fetch(`${API}/orders/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"Application/json",
            "Content-Type":"Application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({order:orderdata})
    }).then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

//get a order 
export const getAOrder=(orderId,userId,token)=>{
    return fetch(`${API}/order/${orderId}/${userId}`,{
        method:"GET",
        headers:{
            Accept:"Application/json",
            "Content-Type":"Application/json",
            Authorization:`Bearer ${token}`
        },
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err));  
}


