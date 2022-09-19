const cart = [] ; 

ItemsCache()
cart.forEach((item) => showItem(item)) 
console.log (cart)
function ItemsCache() {
    const numberOfItems = localStorage.length
    for (let i = 0; i < numberOfItems; i++) {
        const item = localStorage.getItem(localStorage.key(i)) || ""
        console.log("objet en position ", i, "et" , item)
        const itemObjet = JSON.parse(item)
        cart.push(itemObjet)
    }
}
function showItem(item) {
    const article = constructArticle(item)
    const imageDiv = constructImage(item)
    article.appendChild(imageDiv)

    const cardItemContent = constructCartContent(item)
    article.appendChild(cardItemContent)
    showTotalPrice(item)
    showTotalQuantity(item)
    displayArticle(article)  

}
function showTotalQuantity(item) {
    let total = 0
    const TotalQuantity = document.querySelector("#totalQuantity")
    cart.forEach((item) => {
        const totalUniteQuantity = item.quantity
        total += totalUniteQuantity
        TotalQuantity.textContent = total
   })
}
function showTotalPrice(item) {
    let total = 0
    const totalPrice = document.querySelector("#totalPrice")
    cart.forEach((item) => {
        const totalUnitePrice = item.price * item.quantity
        total += totalUnitePrice
        totalPrice.textContent = total
    })
    
}
function constructCartContent(item) {
    const cardItemContent = document.createElement("div")
    cardItemContent.classList.add("cart__item__content")

    const description = constructDescription(item)
    const settings = constructSettings(item)

    cardItemContent.appendChild(description)
    cardItemContent.appendChild(settings)
    return cardItemContent
   
}
function constructSettings(item) {
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    quantitySettings(settings,item)
    deleteSettings(settings,item)
    
    return settings
}
function deleteSettings(settings,item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => itemDelete(item))
    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)

}
function itemDelete(item) {
    const deleteToItem = cart.findIndex(
    (product) => product.id === item.id && product.color === item.color
    )
cart.splice(deleteToItem,1)
console.log(cart)
showTotalQuantity()
showTotalPrice()
deleteDataToCache(item)
deleteArticle(item)

}
function deleteDataToCache(item) {
    const newKey = `${item.id}-${item.color}`
    localStorage.removeItem(newKey)
}
function deleteArticle(item) {
    const articleDelete = document.querySelector ( 
       `article[data-id="${item.id}"][data-color="${item.color}"]` 
       )
       articleDelete.remove()

}
function quantitySettings(settings,item) {
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")

    const p = document.createElement("p")
    p.textContent = "Qté : "
    quantity.appendChild(p)
    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    input.addEventListener("input", () => updatePriceAndQuantity(item.id, input.value, item))
    
    quantity.appendChild(input)
    settings.appendChild(quantity)

}
function updatePriceAndQuantity(id, newValue, item) {
    console.log(id)
    const itemToUpdate = cart.find(item => item.id === id)
    console.log ( "itemToUpdate", itemToUpdate)
    console.log ("newValue", newValue)
    item.quantity = itemToUpdate.quantity

    itemToUpdate.quantity = Number(newValue)
    showTotalQuantity()
    showTotalPrice()
    saveNewDataToCache(item)


}
function  saveNewDataToCache(item) {
    const dataToSave = JSON.stringify((item))
    const newKey =`${item.id}-${item.color}`
    localStorage.setItem(newKey, dataToSave)
}


function constructDescription(item) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.textContent = item.name;
    const p = document.createElement("p")
    p.textContent = item.color;
    const p2 = document.createElement("p")
    p2.textContent = item.price + " €" 

    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    return description

}
function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

function constructArticle(item) {
    const article = document.createElement("article")
    article.classList.add("card__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}
function constructImage(item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__img")

    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}