const categoryContainer = document.getElementById('category-container ')
const modalContainer = document.getElementById("modal-container")
const cardContainer = document.getElementById('card-container')
const newsDetailsModal = document.getElementById('news-details-modal')

const cartContainer = document.getElementById('cart-container')

let carts =[]
const loadCategory = () => {
fetch("https://openapi.programming-hero.com/api/categories")
.then((res)=> res.json())
.then((data) => {
const categories = data.categories;
showCategory(categories)
})
}

const showCategory =(categories) => {
categories.forEach(category => {
categoryContainer.innerHTML +=`
<h4 id="${category.id}">${category.category_name}</h4>
`
});
categoryContainer.addEventListener("click", (e)=>{
const allLi = document.querySelectorAll('h4')
allLi.forEach(h4 => {
h4.classList.remove("bg-[#15803D]")
})
if(e.target.localName === 'h4'){
showLoading()
loadPlants(e.target.id)
e.target.classList.add("bg-[#15803D]")
}
})
}

const loadAllPlants = () => {
fetch("https://openapi.programming-hero.com/api/plants")
.then((res)=> res.json())
.then((data) => {
showAllPlants(data.plants)
})
}

const showAllPlants = (plants)=>{

plants.forEach(plant =>{
cardContainer.innerHTML +=`
<div id="${plant.id}" class="card bg-white p-3 w-[320px] rounded-lg shadow">
<img class="h-[250px]" src="${plant.image}"/>
<h4 class="font-medium mt-3">${plant.name}</h4>
<p class="text-gray-400 text-sm mt-1">${plant.description}</p>
<div class="flex justify-between items-center mt-2">
<div class="bg-[#DCFCE7] rounded-xl text-[#15803D] p-2 text-sm">${plant.category}</div>
<div class="font-medium">${plant.price}</div>
</div>
<button class="bg-[#15803D] text-white rounded-xl border-none py-2 px-3 w-full">Add to cart</button>
</div>
`
})
}

const loadPlants =(id) => {
fetch(`https://openapi.programming-hero.com/api/category/${id}`)
.then((res)=> res.json())
.then((data)=>{
showPlants((data.plants))
})
}

const showPlants = (plants)=>{
cardContainer.innerHTML =''
plants.forEach(plant =>{
cardContainer.innerHTML +=`
<div id="${plant.id}" class="card bg-white p-3 w-[320px] rounded-lg shadow">
<img class="h-[250px]" src="${plant.image}"/>
<h4 class="font-medium mt-3">${plant.name}</h4>
<p class="text-gray-400 text-sm mt-1">${plant.description}</p>
<div class="flex justify-between items-center mt-2">
<div class="bg-[#DCFCE7] rounded-xl text-[#15803D] p-2 text-sm">${plant.category}</div>
<div class="font-medium">${plant.price}</div>
</div>
<button class="bg-[#15803D] text-white rounded-xl border-none py-2 px-3 w-full">Add to cart</button>
</div>
`
})
}


cardContainer.addEventListener('click',(e) => {

handleViewDetails(e)
}
)

handleViewDetails = (e) => {
if(e.target === e.target.parentNode.children[1]){
const id = e.target.parentNode.id
fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
.then(res=> res.json())
.then(data => {
showDetails(data.plants)
})
}



}

const showDetails = (plant) => {
newsDetailsModal.showModal()
modalContainer.innerHTML =`

<img src="${plant.image}"/>
<h1>${plant.name}</h1>
<p>${plant.description}</p>
<div class="flex justify-between items-center">
<h4>${plant.category}</h4>
<h4>${plant.price}</h4>
</div>
`
}

cardContainer.addEventListener('click', (e) => {
if(e.target.innerText === 'Add to cart'){
handleCarts(e)


}
})

const handleCarts =(e) => {
const title = e.target.parentNode.children[1].innerText
const price = e.target.parentNode.children[3].children[1].innerText
const id = e.target.parentNode.id
carts.push({
title:title,
id:id,
price:price
})
showCarts(carts)
}

const showCarts =(carts)=>{
cartContainer.innerHTML=`
<h2 class="font-semibold p-2 text-lg">Your Cart</h2>
`
let total = 0
carts.forEach(cart=>{
total = total + Number(cart.price)
cartContainer.innerHTML += `

<div class="cart bg-[#F0FDF4] p-2 flex items-center justify-between">
<div>
<h5 class="font-semibold">${cart.title}</h5>
<h6 class="pt-2 text-gray-400">${cart.price}</h6>
</div>
<button onclick="deleteCart('${cart.id}')" class="text-gray-400 hover:bg-red-600"><i class="fa-solid fa-xmark"></i></button>
</div>
<div class="flex justify-between items-center mt-3 border-t-2 border-gray-300">
<h3>Total:</h3>
<h3>${total}</h3>
</div>

`

})

}

const deleteCart =(cartId) =>{
console.log(cartId)
const filteredCart = carts.filter(cart => cart.id !== cartId)
carts = filteredCart
showCarts(carts)
}

const showLoading =() => {
cardContainer.innerHTML =`
<div class="text-red-600 text-3xl"><span class="loading loading-spinner text-error"></span> <h1>Please Wait</h1></div>
`
}
loadCategory()
showCarts(carts)
loadAllPlants()