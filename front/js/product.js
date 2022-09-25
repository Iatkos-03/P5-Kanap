const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
if (id != null) {
    let itemPrice = 0
    let imagUrl, altTexte, articleName
}

fetch(`http://localhost:3000/api/products/${id}`)
.then(response => response.json())
.then (res => operateKanap(res))

function operateKanap(kanap) {
    const altTxt = kanap.altTxt
    const colors = kanap.colors
    const description = kanap.description
    const imageUrl = kanap.imageUrl
    const name = kanap.name
    const price = kanap.price
    const _id = kanap._id
    itemPrice = price
    imagUrl = imageUrl
    altTexte = altTxt
    articleName = name
    makeImage(imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)
}

function makeImage(imageUrl, altTxt) {
   const image = document.createElement("img")
   image.src = imageUrl
   image.alt = altTxt
   const parent = document.querySelector(".item__img")
   if (parent != null) parent.appendChild(image)

}
function makeTitle(name) {
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent= name
    console.log(name)
}

function makePrice(price) {
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
}
function makeDescription(description) {
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}
function makeColors(colors) {
    const select = document.querySelector("#colors")
    if (select !=null) {
        colors.forEach((color) => {
            const option = document.createElement("option")
            option.value = color
            option.textContent= color
            console.log(option)
            select.appendChild(option)
        })
    }
}
const button = document.querySelector("#addToCart")
if (button !=null) {
    button.addEventListener("click",(e) => {
        const color = document.querySelector("#colors").value 
        const quantity = document.querySelector("#quantity").value 
        if (color == "" || quantity == ""|| quantity == 0) {
            alert("Choissez une couleur et une quantité s'il vous plait")
            return
        }
        const fiche = {
            id: id,
            quantity: Number(quantity),
            color: color, 
            price: itemPrice,
            imageUrl: imagUrl,
            altTxt: altTexte,
            name : articleName,
        
        }
        const newKey = `${id}-${color}`
        localStorage.setItem(newKey, JSON.stringify(fiche))
        window.location.href = "cart.html"
    })
}