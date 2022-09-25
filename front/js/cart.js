const cart = []  

ItemsCache()
cart.forEach((item) => showItem(item)) 
function ItemsCache() {
    const numberOfItems = localStorage.length
    for (let i = 0; i < numberOfItems; i++) {
        const item = localStorage.getItem(localStorage.key(i)) || ""
        const itemObjet = JSON.parse(item)
        cart.push(itemObjet)
    }
}
function showItem(item) {
    const article = constructArticle(item)
    const imageDiv = constructImage(item)
    article.appendChild(imageDiv)

    const contentItem = constructCartContent(item)
    article.appendChild(contentItem)
    showTotalPrice()
    showTotalQuantity()
    showArticle(article)  

}
function showTotalQuantity() {
    const totalQuantity = document.querySelector("#totalQuantity")
    const total = cart.reduce((total, item) => total + item.quantity, 0)
    totalQuantity.textContent = total
    console.log(total)
}
function showTotalPrice() {
    const totalPrice = document.querySelector("#totalPrice")
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    totalPrice.textContent = total
  }
function constructCartContent(item) {
    const contentItem = document.createElement("div")
    contentItem.classList.add("cart__item__content")

    const description = constructDescription(item)
    const settings = constructSettings(item)

    contentItem.appendChild(description)
    contentItem.appendChild(settings)
    return contentItem
   
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
cart.splice(deleteToItem, 1)
showTotalQuantity()
showTotalPrice()
deleteDataToCache(item)
deleteArticle(item)
}

function deleteDataToCache(item) {
    const key = `${item.id}-${item.color}`
    localStorage.removeItem(key)
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
    const itemToUpdate = cart.find((item) => item.id === id)
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity
    showTotalQuantity()
    showTotalPrice()
    saveNewDataToCache(item)


}
function  saveNewDataToCache(item) {
    const dataToSave = JSON.stringify(item)
    const key =`${item.id}-${item.color}`
    localStorage.setItem(key, dataToSave)
}


function constructDescription(item) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.textContent = item.name
    const p = document.createElement("p")
    p.textContent = item.color
    const p2 = document.createElement("p")
    p2.textContent = item.price + " €" 

    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    return description

}
function showArticle(article) {
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