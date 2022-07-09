//grabbing required variables
//carts
const cartBtn=document.querySelector('.cart-btn');
const clearCartBtn=document.querySelector('.clear-cart');
const cartDOM=document.querySelector('.cart');
const cartOverlay=document.querySelector('.cart-overlay');
//cart items
const cartItems=document.querySelector('.cart-item');
const cartTotal=document.querySelector('.cart-total');
const cartContent=document.querySelector('cart-content');
const productDOM=document.querySelector('.product-center');
//cart
let cart=[]
// getting the product
class Products{
 async getProducts(){
    try{
        let result=await fetch("product.json");
        let data= await result.json();
        let products=data.items;
        products=products.map(item=>{
          const {title,price}  =item.fields;
          const {id}=item.sys;
          const image=item.fields.image.fields.file.url;
          return {title,price,id,image}
        })
        return products
    }
    catch(error){

    }
}
}
//display products
class UI{
displayProducts(products){
let result='';
products.forEach(product=> {
    result +=`<article class="product">
                <div class="image-container">
                    <img src=${product.image} alt="product" class="product-img">
                    <button class="bag-btn" data-id=${product.id}>
                        <i class="fa-solid fa-cart-arrow-down"></i>Add to cart
                    </button>
                </div>
                <h3>${product.title}</h3>
                <h4>$${product.price}</h4>

            </article>`;
})
productDOM.innerHTML=result
}}
//local storage
class Storage{
static saveProducts(products){
    localStorage.setItem("products",JSON.stringify(products))
}
}
document.addEventListener("DOMContentLoaded",()=>{
    //instance for classes
   const ui= new UI();
   const products=new Products()
   //get all products
   products.getProducts().then(products=>{ui.displayProducts(products)
      Storage.saveProducts(products);})

})