import { API } from "../../backend";


/*
------------------------------------------------------
 CATEGORY CATEGORY CATEGORY CATEGORY CATEGORY CATEGORY
------------------------------------------------------           
*/

//create a category 
export const createCategory=(userId,token,category)=>{
    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
       headers:{
        Accept:"application/json",
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
       },
       body: JSON.stringify(category)
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err));
}

//get all category
export const getCategories=()=>{
    return fetch(`${API}/categories`,{
        method:"GET",
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err));  
}
//get a category
export const getCategory=(categoryId)=>{
    return fetch(`${API}/category/${categoryId}`,{
        method:"GET",
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err));  
}
//get varients of a category

export const getVarientsByCategory=(categoryId)=>{
    return fetch(`${API}/category/${categoryId}/varients`,{
        method:"GET",
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err));  
}
//delete a category
export const deleteCategory=(categoryId,userId,token)=>{
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"DELETE",
        headers:{
         Accept:"application/json",
         Authorization:`Bearer ${token}`
        }
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err));  
}

//update a category
export const updateCategory=(categoryId,userId,token,category)=>{
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
           },
           body: JSON.stringify(category)
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err));  
}

/*
------------------------------------------------------------
 SUBCATEGORY SUBCATEGORY SUBCATEGORY SUBCATEGORY SUBCATEGORY
------------------------------------------------------------           
*/

export const createSubCategory=(userId,token,subcategory)=>{
    return fetch(`${API}/subcategory/create/${userId}`,{
        method:"POST",
       headers:{
        Accept:"application/json",
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
       },
       body: JSON.stringify(subcategory)
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err));  
}

//get all subcategory by category
export const getSubCategoriesByCategory=(categoryId)=>{
    return fetch(`${API}/category/${categoryId}/subcategories`,{
        method:"GET",
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err));  
}

//get a subcategory
export const getSubCategory=(subcategoryId)=>{
    return fetch(`${API}/subcategory/${subcategoryId}`,{
        method:"GET",
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err));  
}


//update a subcategory
export const updatePropertyOfSubCategory=(subcategoryId,userId,token,properties)=>{
    return fetch(`${API}/subcategory/${subcategoryId}/properties/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
           },
           body: JSON.stringify(properties)
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err));  
}

//create a product
// export const createProduct=(userId,token,product)=>{
//     return fetch(`${API}/product/create/${userId}`,{
//         method:"POST",
//        headers:{
//         Accept:"application/json",
//         Authorization:`Bearer ${token}`
//        },
//        body: product
//     })
//     .then(response=>{
//         return response.json();
//     })
//     .catch(err=>console.log(err));  
// }
export const createProduct=(userId,token,product)=>{
    return fetch(`${API}/product/create/${userId}`,{
        method:"POST",
       headers:{
       Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
       },
       body: JSON.stringify(product)
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err));  
}

//get all product
export const getProducts=()=>{
    return fetch(`${API}/products`,{
        method:"GET",
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err));  
}

//delete a product
export const deleteProduct=(productId,userId,token)=>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"DELETE",
        headers:{
         Accept:"application/json",
         Authorization:`Bearer ${token}`
        }
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err));  
}

//get a product 
export const getProduct=(productId)=>{
    return fetch(`${API}/product/${productId}`,{
        method:"GET",
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err));  
}


//update a product
export const updateProduct=(productId,userId,token,product)=>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"PUT",
       headers:{
        Accept:"application/json",
        Authorization:`Bearer ${token}`
       },
       body: product
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err));  
}