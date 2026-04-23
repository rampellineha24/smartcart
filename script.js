let products = [

  {name:"Phone", price:40000, img:"images/phone.jpg", category:"electronics"},
  {name:"Laptop", price:65000, img:"images/laptop.jpg", category:"electronics"},
{name:"Headphones", price:1500, img:"images/headphones.jpg", category:"electronics"},
{name:"Smart Watch", price:4500, img:"images/watch.jpg", category:"electronics"},

  {name:"Shoes", price:3000, img:"images/shoes.jpg", category:"fashion"},
  {name:"Dress", price:1500, img:"images/dress.jpg", category:"fashion"},
  {name:"T shirt", price:1500, img:"images/tshirt.jpg", category:"fashion"},
  {name:"Jeans", price:1500, img:"images/jeans.jpg", category:"fashion"},


  {name:"Lipstick", price:500, img:"images/lipstick.jpg", category:"beauty"},
  {name:"Face Cream", price:800, img:"images/cream.jpg", category:"beauty"},
  {name:"Foundation", price:1500, img:"images/foundation.jpg", category:"beauty"},
  {name:"Eyeliner", price:950, img:"images/liner.jpg", category:"beauty"},

  {name:"Rice", price:1200, img:"images/rice.jpg", category:"grocery"},
  {name:"Fruits", price:600, img:"images/fruits.jpg", category:"grocery"},
{name:"vegatables", price:200, img:"images/vegetables.jpg", category:"grocery"},
{name:"Milk Packet", price:60, img:"images/milk.jpg", category:"grocery"}

];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let user = localStorage.getItem("user");
if(user && document.getElementById("welcome")){
  document.getElementById("welcome").innerText = "Hey " + user;
}

function display(data){
  let html="";
  data.forEach(p=>{
    html+=`
    <div class="card">
      <img src="${p.img}">
      <h3>${p.name}</h3>
      <p>\u20B9${p.price}</p>
      <button onclick='addCart(${JSON.stringify(p)})'>Add to Cart</button>
    </div>`;
  });

  if(document.getElementById("products")){
    document.getElementById("products").innerHTML=html;
  }
}

if(document.getElementById("products")){
  display(products);
}

function searchProduct(){
  let val = document.getElementById("search").value.toLowerCase();
  let filtered = products.filter(p => p.name.toLowerCase().includes(val));
  display(filtered);
  document.getElementById("categorySection").style.display = "none";
}

function openCategory(cat){
  let filtered = products.filter(p => p.category === cat);
  display(filtered);
  document.getElementById("categorySection").style.display = "none";
}

function showAll(){
  display(products);
  document.getElementById("categorySection").style.display = "block";
}

function addCart(product){
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCount();
  alert("Added to Cart!");
}

function updateCount(){
  if(document.getElementById("count")){
    document.getElementById("count").innerText = cart.length;
  }
}
updateCount();

/* CART PAGE */
if(document.getElementById("cartItems")){
  let html="";
  let total=0;

  cart.forEach((p,index)=>{
    total += p.price;
    html+=`
    <div>
      ${p.name} - \u20B9${p.price}
      <button onclick="removeItem(${index})">❌</button>
    </div>`;
  });

  document.getElementById("cartItems").innerHTML=html;
  document.getElementById("total").innerText=total;
}

function removeItem(i){
  cart.splice(i,1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function placeOrder(){
  let order = {
    items: cart,
    total: cart.reduce((sum,p)=>sum+p.price,0),
    date: new Date().toLocaleString()
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);

  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.removeItem("cart");

  alert("Order Placed!");
  window.location.href="orders.html";
}

/* ORDERS PAGE */
if(document.getElementById("orders")){
  let html="";
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  if(orders.length===0){
    html="<h3>No Orders Yet</h3>";
  } else {
    orders.forEach(order=>{
      html+=`
      <div style="background:white;padding:15px;margin:10px;border-radius:10px;">
        <h3>${order.date}</h3>
      `;

      order.items.forEach(item=>{
        html+=`<p>${item.name} - \u20B9${item.price}</p>`;
      });

      html+=`<h4>Total: \u20B9${order.total}</h4></div>`;
    });
  }

  document.getElementById("orders").innerHTML=html;
}

