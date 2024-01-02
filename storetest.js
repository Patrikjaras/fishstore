if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else{
    ready()
}

function ready(){

    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    console.log(removeCartItemButtons)
    for(var i = 0; i < removeCartItemButtons.length; i++){
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)                    
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for(var i =0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButton = document.getElementsByClassName('shop-item-button')
    for(var i =0; i < addToCartButton.length; i++){
        button = addToCartButton[i]
        button.addEventListener('click', addToCartClicked)
    }
    
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked(){
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSource = shopItem.getElementsByClassName('shop-item-image')[0].src
    
    addItemToCart(title, price, imageSource)
    updateCartTotal()
}

function addItemToCart(title, price, imageSource){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++){
        if (cartItemNames[i].innerText == title){

            alert('The item is alreaddy in the cart')
            return
        }
    }
    var newCartRow = `
    <div class="cart-item cart-column">
                        <IMG class="cart-item-image" src="${imageSource}" width="100" height="100"></IMG>
                        <SPAn class="cart-item-title">${title}</SPAn>
                    </div>
                    <span class="cart-price cart-column">${price}</span>    
                    <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="1">
                    <button class="btn btn-danger" type="button">REMOVE</button>
                    </div>`
    cartRow.innerHTML = newCartRow
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function removeCartItem(event){
    var buttonClicked = event.target
            buttonClicked.parentElement.parentElement.remove()
            updateCartTotal()
}

function quantityChanged(event){
    var input = event.target 
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}
    
    
function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0;

    for(var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]

       var price = parseFloat(priceElement.innerText.replace('$', ''))
       var quantity = quantityElement.value
       total = total + ( price *quantity)
        
    }
    total = Math.round(total * 100) /100
    document.getElementsByClassName('cart-total-price')[0].innerText= '$' +total
   
}



//Fish array, add aditional if in stock.
let albumItems = [
    {
        title: "Discus",
        ImageSrc: "images/fish1.jpg",
        price: "$49.99"
    },
    {
        title: "Siamese Fighting fish",
        ImageSrc: "images/fish2.jpg",
        price: "$9.99"

    },
    {
        title: "Gold Fish",
        ImageSrc: "images/fish3.jpg",
        price: "$5.99"
    },
    {
        title: "Guppy",
        ImageSrc: "images/fish5guppy.jpg",
        price: "$1.99"
    },
    {
        title: "Scalar",
        ImageSrc: "images/fish6Scalar.jpg",
        price: "$7.99"
    },
    {
        title: "Neon Tetra",
        ImageSrc: "images/fish8NeonTetra.png",
        price: "$.59"
    },
    {
        title: "Ancistrus",
        ImageSrc: "images/fish7Ancistrus.jpg",
        price: "$22.99"
    }

];

// Merch array.

let merchItems =[
    {
        title: "Coffe Cup",
        ImageSrc: "images/kaffekopp.jpg",
        price: "$8.99"
    },
    {
        title: "Aquarium",
        ImageSrc: "images/fishtank.webp",
        price: "$159.00"
    }
];

//Creates and ads merch to site.
function displayMerch(){
    var container = document.querySelector(".merch-items");

    for (let i = 0; i < merchItems.length; i++){
        let shopItemDiv =document.createElement("div");
        shopItemDiv.classList.add("shop-item");

        let titleSpan = document.createElement("span");
        titleSpan.classList.add("shop-item-title");
        titleSpan.textContent = merchItems[i].title;

        let image = document.createElement("img");
        image.classList.add("shop-item-image");
        image.src = merchItems[i].ImageSrc;

        let detailsDiv  = document.createElement("div");
        detailsDiv.classList.add("shop-item-details");

        let priceSpan = document.createElement("span");
        priceSpan.classList.add("shop-item-price");
        priceSpan.textContent = merchItems[i].price;

        let button = document.createElement("button");
        button.classList.add("btn", "btn-primary", "shop-item-button");
        button.setAttribute("type", "button");
        button.addEventListener("click", function(){
            addItemToCart(merchItems[i].title, merchItems[i].price, merchItems[i].ImageSrc)
            updateCartTotal()
        }
        )
        button.textContent = "ADD TO CART";

        detailsDiv.appendChild(priceSpan);
        detailsDiv.appendChild(button);
        
        shopItemDiv.appendChild(titleSpan);
        shopItemDiv.appendChild(image);
        shopItemDiv.appendChild(detailsDiv);

        container.appendChild(shopItemDiv)

    }
}


//Creates and ads fish to site.

function displayFish(){
    var container = document.querySelector(".shop-items");

    for (let i = 0; i < albumItems.length; i++){
        let shopItemDiv =document.createElement("div");
        shopItemDiv.classList.add("shop-item");

        let titleSpan = document.createElement("span");
        titleSpan.classList.add("shop-item-title");
        titleSpan.textContent = albumItems[i].title;

        let image = document.createElement("img");
        image.classList.add("shop-item-image");
        image.src = albumItems[i].ImageSrc;

        let detailsDiv  = document.createElement("div");
        detailsDiv.classList.add("shop-item-details");

        let priceSpan = document.createElement("span");
        priceSpan.classList.add("shop-item-price");
        priceSpan.textContent = albumItems[i].price;

        let button = document.createElement("button");
        button.classList.add("btn", "btn-primary", "shop-item-button");
        button.setAttribute("type", "button");
        button.addEventListener("click", function(){
            addItemToCart(albumItems[i].title, albumItems[i].price, albumItems[i].ImageSrc)
            updateCartTotal()
        }
        )
        button.textContent = "ADD TO CART";

        detailsDiv.appendChild(priceSpan);
        detailsDiv.appendChild(button);
        
        shopItemDiv.appendChild(titleSpan);
        shopItemDiv.appendChild(image);
        shopItemDiv.appendChild(detailsDiv);

        container.appendChild(shopItemDiv)

    }

}

function atStartLoad(){
    displayMerch()
    displayFish()
   
}

window.onload = atStartLoad;