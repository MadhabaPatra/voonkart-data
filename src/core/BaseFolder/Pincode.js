
export const getCities=(pincode)=>{
    return fetch(`https://api.postalpincode.in/pincode/${pincode}`,{
        method:"GET"
    })
    .then(response=>{
       
        return response.json();
    })
    .catch(err=>console.log(err));
}

