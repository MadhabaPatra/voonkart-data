import { API } from "../../backend";

export const getUserData=(userId,token)=>{
    return fetch(`${API}/user/${userId}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
           }
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err));  
}

export const getOrders=(userId,token)=>{

    return fetch(`${API}/orders/user/${userId}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
           }
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err));  
}