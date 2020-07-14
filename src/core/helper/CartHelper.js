export const addItemToCart=(item,next)=>{
    let cart=[]
if(typeof window !==undefined){
    var isInserted=false;
    if(localStorage.getItem("cart")){
        cart=JSON.parse(localStorage.getItem("cart"))
        cart.map((product,i)=>{
            if(product._id===item._id && !isInserted){
                isInserted=true;
                cart.splice(i,1);
                cart.push({...item,count:1,productVariety:[]})
            }
        }) 
        }

       if(!isInserted){
           cart.push({...item,count:1})
       } 
            
    localStorage.setItem("cart",JSON.stringify(cart))
    next();
}
}

export const loadCart=()=>{
    if(typeof window !==undefined){
        if(localStorage.getItem("cart")){
           return JSON.parse(localStorage.getItem("cart"))
        }
    } 
}

export const changeQuantityOfItem=(item,quantity,next)=>{
    let cart=[]
    if(typeof window !==undefined){
        if(localStorage.getItem("cart")){
            cart=JSON.parse(localStorage.getItem("cart"))
        }
        cart.map((product,i)=>{
            if(product._id===item._id){
                cart.splice(i,1,{...item,count:quantity});
            }
        })
        localStorage.setItem("cart",JSON.stringify(cart))
        next();
    }
}
export const changeVarietyOfItem=(item,variety,next)=>{
    let cart=[]
    if(typeof window !==undefined){
        if(localStorage.getItem("cart")){
            cart=JSON.parse(localStorage.getItem("cart"))
        }
        cart.map((product,i)=>{
            if(product._id===item._id){
                cart.splice(i,1,{...item,productVariety:variety});
            }
        })
        localStorage.setItem("cart",JSON.stringify(cart))
        next();
    }
}
export const CheckItemInCart=(productId)=>{
    let checked=false
    let cart=[]
    if(typeof window !==undefined){
        if(localStorage.getItem("cart")){
            cart=JSON.parse(localStorage.getItem("cart"))
        }
        cart.map((product,i)=>{
            if(product._id===productId){
                checked=true
            }
        })
    }
    return checked;
}



export const removeItemToCart=(productId)=>{
    let cart=[]
    if(typeof window !==undefined){
        if(localStorage.getItem("cart")){
            cart=JSON.parse(localStorage.getItem("cart"))
        }
        cart.map((product,i)=>{
            if(product._id===productId){
                cart.splice(i,1)
            }
        })
        localStorage.setItem("cart",JSON.stringify(cart))
        
    }
    return cart;
}

export const loadNumberOfProductsInCart=()=>{
    let number=0
    let cart=[]
    if(typeof window !==undefined){
        if(localStorage.getItem("cart")){
            cart=JSON.parse(localStorage.getItem("cart"))
        }
        cart.map((product,i)=>{
           number++
        })
        localStorage.setItem("cart",JSON.stringify(cart))
        
    }
    return number;
}

export const cartEmpty=next=>{
    if(typeof window !==undefined){
        localStorage.removeItem("cart");
        let cart=[]
        localStorage.setItem("cart",JSON.stringify(cart))

        next()
    }
}