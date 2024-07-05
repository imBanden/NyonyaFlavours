// code to get menu from excel file
import { menuStorage } from './admin.js';

console.log(menuStorage);

let defaultMenu = [
    {
        "name": "Bak Zhang",
        "price": 2,
        "noun": "pc",
        "category": "zhangs",
        "quantity": 1,
        "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, quae. Ad minus numquam in id architecto iste repellat asperiores eveniet?"
    },
    {
        "name": "Zhang",
        "price": 5,
        "noun": "pc",
        "category": "zhangs",
        "quantity": 1,
        "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, quae. Ad minus numquam in id architecto iste repellat asperiores eveniet?"
    },
    {
        "name": "Nyonya Zhang",
        "price": 5,
        "noun": "pc",
        "category": "zhangs",
        "quantity": 1,
        "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, quae. Ad minus numquam in id architecto iste repellat asperiores eveniet?"
    },
    {
        "name": "Nyonya Haebee Sambal Prawn Zhang",
        "price": 5,
        "noun": "pc",
        "category": "zhangs",
        "quantity": 1,
        "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, quae. Ad minus numquam in id architecto iste repellat asperiores eveniet? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, quae. Ad minus numquam in id architecto iste repellat asperiores eveniet?"
    },
    {
        "name": "Nasi",
        "price": 9,
        "noun": "box",
        "category": "rice",
        "quantity": 1,
        "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, quae."
    },
    {
        "name": "Mi Goreng",
        "price": 2,
        "noun": "box",
        "category": "noodles",
        "quantity": 1,
        "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, quae. Ad minus numquam in id architecto iste repellat asperiores eveniet?"
    },
    {
        "name": "Mi Rebus",
        "price": 4,
        "noun": "box",
        "category": "noodles",
        "quantity": 1,
        "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, quae. Ad minus numquam in id architecto iste repellat asperiores eveniet?"
    },
    {
        "name": "Char Kue afkjdkla",
        "price": 3,
        "noun": "box",
        "category": "noodles",
        "quantity": 1,
        "description": "penang food abfldajfkldajfklasdjkfkljsaf"
    },
    {
        "name": "Banana",
        "price": 1,
        "noun": "pc",
        "category": "dessert",
        "quantity": 4,
        "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, quae. Ad minus numquam in id architecto iste repellat asperiores eveniet?"
    },
    {
        "name": "Sugar",
        "price": 9.5,
        "noun": "g",
        "category": "dessert",
        "quantity": 500,
        "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, quae. Ad minus numquam in id architecto iste repellat asperiores eveniet?"
    },
    {
        "name": "Chocolate",
        "price": 1.32,
        "noun": "bar",
        "category": "dessert",
        "quantity": 1,
        "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, quae. Ad minus numquam in id architecto iste repellat asperiores eveniet?"
    },
    {
        "name": "Cake",
        "price": 6,
        "noun": "slice",
        "category": "dessert",
        "quantity": 1,
        "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, quae. Ad minus numquam in id architecto iste repellat asperiores eveniet?"
    },
    {
        "name": "Ice Cream",
        "price": 3,
        "noun": "scoop",
        "category": "dessert",
        "quantity": 2,
        "description": "Lorem ipsum, dolor sit amet consectetur."
    }
]

let menu = {}

if (menuStorage) menu = menuStorage['menu'];
else menu = defaultMenu

console.log(menu[0]);
let prevCategory = "";

// initialise cart especially for new customer
checkCartExist();
cartLength();
updateCart();



function createNewMenuSection(name){
    let newSection = document.createElement("div");
    newSection.innerHTML = `<div class="food-menu-section-container">
                                <div class="food-menu-section-name">${name}</div>
                            </div>`
    return newSection.children[0];
}

function createNewMenuItem(name, price, number, noun, description){
    let newItem = document.createElement('div');
    newItem.innerHTML = `<div class="food-menu-item">
                            <img class="food-menu-item-img" src="Bak Zhang.png">
                            <div class="food-menu-item-text">
                                <div class="food-menu-item-name">${name}</div>
                                <div class="food-menu-item-price">
                                    <div class="food-menu-item-price-number">£${parseFloat(price).toFixed(2)}</div>
                                    <div class="food-menu-item-price-noun">/${number}${noun}</div>
                                </div>
                                <div class="food-menu-item-description">${description}</div>
                            </div>
                        </div>`
    return newItem.children[0];
}

function createNewMenuContainer(){
    let newContainer = document.createElement("div");
    newContainer.innerHTML = `<div class="food-menu-container"><div>`;

    return newContainer.children[0];
}


let menuBox = document.querySelector(".food-menu-box");
let container;

for (let i = 0; i < menu.length; i++){
    let currItem = menu[i];
    let currCategory = currItem['category'][0].toUpperCase() + currItem['category'].slice(1);

    if (prevCategory != currCategory){
        prevCategory = currCategory;
        if(container){
            menuBox.appendChild(container);
        }
        menuBox.appendChild(createNewMenuSection(currCategory));
        container = createNewMenuContainer();
        container.removeChild(container.firstChild);
    }

    let itemQuantity = currItem['quantity'];

    if (itemQuantity === 1){
        itemQuantity = "";
    }
    container.appendChild(createNewMenuItem(currItem["name"], currItem["price"], itemQuantity, currItem["noun"], currItem["description"]));
}

menuBox.appendChild(container);



//code to make pop-up box appear when clicked
document.querySelectorAll(".food-menu-item").forEach(function(item){
    item.addEventListener("click", function(){
        let itemName = item.children[1].children[0].innerText;

        menuItemPopUp(itemName, "flex", "hidden");
    
    });
});

// code to make pop-up box dissapear when click the closed button
document.querySelector(".menu-item-pop-up-close-button").addEventListener("click", function(){
    menuItemPopUp("", "none", "auto");

    let itemQuantity = document.querySelector(".menu-item-pop-up-quantity");
    itemQuantity.innerText = "1";
});

function menuItemPopUp(name, display, overflowY){
    let popUpBox = document.querySelector(".menu-item-pop-up-background");
    let popUpBoxContainer = document.querySelector(".menu-item-pop-up-container");

    let popUpBoxName = document.querySelector(".menu-item-pop-up-name");
    let popUpBoxDescription = document.querySelector(".menu-item-pop-up-description");
    let popUpBoxPrice = document.querySelector(".menu-item-pop-up-add-button");

    for (let i=0; i<Object.keys(menu).length; i++){
        if (name === menu[i]["name"]){
            popUpBoxName.innerText = menu[i]["name"];
            popUpBoxDescription.innerText = menu[i]["description"];
            popUpBoxPrice.innerText = `Add for £${parseFloat(menu[i]["price"]).toFixed(2)}`;
            break;
        }
    }

    document.body.style.overflowY = overflowY;
    popUpBox.style.display = display;
    popUpBox.classList.toggle("animation-fade-in");
    popUpBoxContainer.classList.toggle("animation-slide-up");
}



// function, so when shopping cart appears when clicked upon shopping cart button
document.querySelector(".header-shopping-cart-button").addEventListener("click", function(){
    let shoppingCartSliderBG = document.querySelector(".shopping-cart-slider-background");
    let shoppingCartSliderContainer = document.querySelector(".shopping-cart-slider-container");

    document.body.style.overflowY = "hidden";
    shoppingCartSliderBG.style.display = "flex";
    shoppingCartSliderBG.classList.toggle("animation-fade-in");
    shoppingCartSliderContainer.classList.toggle("animation-slide-left");
});

// function, so when shopping cart closed when clicked upon close button
document.querySelector(".shopping-cart-slider-close-button").addEventListener("click", function(){
    let shoppingCartSlider = document.querySelector(".shopping-cart-slider-background");
    let shoppingCartSliderContainer = document.querySelector(".shopping-cart-slider-container");
    
    document.body.style.overflowY = "auto";
    shoppingCartSlider.classList.toggle("animation-fade-in");
    shoppingCartSlider.style.display = "none";
    shoppingCartSliderContainer.classList.toggle("animation-slide-left");
});

document.querySelectorAll(".menu-item-pop-up-plus-minus-button").forEach(function(operator){
    operator.addEventListener("click", function(){
        let itemName = document.querySelector(".menu-item-pop-up-name").innerText;
        let itemQuantity = document.querySelector(".menu-item-pop-up-quantity");
        let itemPrice = document.querySelector(".menu-item-pop-up-add-button");
        let currQuantity = parseInt(itemQuantity.innerText);
        let newQuantity;

        if ((operator.getAttribute('id') === "pop-up-minus") && (currQuantity>1)){
            newQuantity = currQuantity - 1;
        }
        else if ((operator.getAttribute('id') === "pop-up-plus") && (currQuantity<50)){
            newQuantity = currQuantity + 1;
        }
        else{
            newQuantity = currQuantity;
        }

        

        for (let i=0; i<Object.keys(menu).length; i++){
            if (itemName === menu[i]["name"]){
                itemQuantity.innerText = `${newQuantity}`;
                itemPrice.innerText = `Add for £${parseFloat(menu[i]["price"]*newQuantity).toFixed(2)}`;
                break;
            }
        }
    
    });
});


document.querySelector(".menu-item-pop-up-add-button").addEventListener("click", function(){
    let itemQuantity = document.querySelector(".menu-item-pop-up-quantity");
    let itemName = document.querySelector(".menu-item-pop-up-name").innerText;

    let cartList = JSON.parse(localStorage.getItem("cart"))["cartList"];

    let cartItem = {}
    let itemExist = false;

    for (let storageItem of cartList){
        if (itemName === storageItem['item']['name']){
            storageItem['qty'] = storageItem['qty'] + parseInt(itemQuantity.innerText);
            itemExist = true;
            break;
        }
    }

    if (!itemExist){
        for (let i=0; i<Object.keys(menu).length; i++){
            if (itemName === menu[i]["name"]){
                cartItem["item"] = menu[i];
                cartItem["qty"] = parseInt(itemQuantity.innerText);
                cartList.push(cartItem);
                break;
            }
        }
    }
    
    
    localStorage.setItem("cart", JSON.stringify({cartList}));

    cartLength();
    updateCart();
    menuItemPopUp("", "none", "auto");
    itemQuantity.innerText = "1";

});

function checkCartExist(){

    let checkCartArray = [];
    for (let key of Object.entries(localStorage)){
        checkCartArray.push(key[0]);
    }

    if (checkCartArray.includes("cart")){
        console.log("there is cart!");
    }
    else{
        console.log("there is no cart yet, time to initialise");
        localStorage.setItem("cart", JSON.stringify({"cartList":[]}));
    }
}


function cartLength(){
    let number = document.querySelector('.header-shopping-cart-number-icon-number');
    let numberScroll = document.querySelector('.shopping-cart-scrolled-button')
    let background = document.querySelector('.header-shopping-cart-number-icon-background');
    let cartList = JSON.parse(localStorage.getItem("cart"))["cartList"];

    let emptyCartDiv = document.querySelector('.shopping-cart-slider-container-middle-empty-cart');
    let fullCartDiv = document.querySelector('.shopping-cart-slider-container-middle-full-cart');

    if (cartList.length === 0){
        emptyCartDiv.style.display = 'flex';
        fullCartDiv.style.display = 'none';
        background.style.display = 'none';
        numberScroll.innerText = `Cart is empty`
    }
    else{
        emptyCartDiv.style.display = 'none';
        fullCartDiv.style.display = 'flex';
        number.innerText = `${cartList.length}`;
        numberScroll.innerText = `Cart · ${cartList.length} Item(s)`
        background.style.display = 'flex';
    }
};

function updateCart(){
    let cartList = JSON.parse(localStorage.getItem("cart"))["cartList"];
    let cartContainer = document.querySelector('.shopping-cart-slider-container-middle-full-cart')
    cartContainer.innerHTML = ``;
    let totalPrice = 0;

    for (let item of cartList){

        let newCartItem = document.createElement('div');
        newCartItem.innerHTML = `<div class="shopping-cart-slider-item-container">
                                    <image class="shopping-cart-slider-item-image" src="bakzhang.jpeg"></image>
                                    <div class="shopping-cart-slider-item-name">${item['item']['name']}</div>
                                    <div class="shopping-cart-slider-item-quantity">
                                        <select class="shopping-cart-slider-item-quantity-drop-down">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                            <option>8</option>
                                            <option>9</option>
                                            <option>10</option>
                                            <option>11</option>
                                            <option>12</option>
                                            <option>13</option>
                                            <option>14</option>
                                            <option>15</option>
                                            <option>16</option>
                                            <option>17</option>
                                            <option>18</option>
                                            <option>19</option>
                                            <option>20</option>
                                        </select>
                                    </div>
                                    <div class="shopping-cart-slider-item-price">£${parseFloat(item['qty']*item['item']['price']).toFixed(2)}</div>
                                    <button class="shopping-cart-slider-item-remove-button">
                                        <image class="shopping-cart-slider-item-remove-icon" src="MaterialSymbolsDeleteOutlineSharp.svg"></image>
                                    </button>
                            </div>`;
        cartContainer.appendChild(newCartItem.children[0]);

        totalPrice = totalPrice + item['qty']*item['item']['price'];
    }

    let i = 0;
    document.querySelectorAll('.shopping-cart-slider-item-quantity-drop-down').forEach(function(item){
        let itemQuantity = cartList[i];
        item.selectedIndex = itemQuantity['qty'] - 1;
        i = i + 1;
    });

    document.querySelector('.shopping-cart-slider-subtotal-number').innerText = `£${parseFloat(totalPrice).toFixed(2)}`;
    
    reinitialiseDeleteButtons();
    reinitialiseDropDownButtons();
}


document.querySelector(".shopping-cart-scrolled-button").addEventListener('click', function(){
    let shoppingCartSliderBG = document.querySelector(".shopping-cart-slider-background");
    let shoppingCartSliderContainer = document.querySelector(".shopping-cart-slider-container");

    document.body.style.overflowY = "hidden";
    shoppingCartSliderBG.style.display = "flex";
    shoppingCartSliderBG.classList.toggle("animation-fade-in");
    shoppingCartSliderContainer.classList.toggle("animation-slide-left");
});






function reinitialiseDeleteButtons(){
    document.querySelectorAll('.shopping-cart-slider-item-remove-button').forEach(function(item){
        item.addEventListener('click', function(){
            let cartList = JSON.parse(localStorage.getItem("cart"))["cartList"];
            let itemToBeDeleted = item.parentElement.children[1].innerText;
    
            for (let itemInList of cartList){
                if (itemInList['item']['name'] === itemToBeDeleted){
                    cartList.splice(cartList.indexOf(itemInList), 1);
                }
            }
    
            localStorage.setItem("cart", JSON.stringify({cartList}));
            updateCart();
            cartLength();
        });
    });
}


document.addEventListener("scroll", function(){
    let header = document.querySelector('.header-container');
    let scrollPosition = window.scrollY;
    let shoppingButtonPosition = header.offsetTop + header.offsetHeight;
    let cartScrolledButton = document.querySelector('.shopping-cart-scrolled-box');

    if (scrollPosition > shoppingButtonPosition){
        cartScrolledButton.classList.add('animation-slide-up');
        cartScrolledButton.classList.remove('animation-slide-down');
    }
    else{ 
        cartScrolledButton.classList.remove('animation-slide-up');
        cartScrolledButton.classList.add('animation-slide-down');
    }
});


function reinitialiseDropDownButtons(){
    document.querySelectorAll('.shopping-cart-slider-item-quantity-drop-down').forEach(function(item){
        item.addEventListener('change', function(){
            let cartList = JSON.parse(localStorage.getItem("cart"))["cartList"];
            let itemToBeChanged = item.parentElement.parentElement.children[1].innerText;
            console.log(itemToBeChanged);
            
            for (let itemInList of cartList){
                if (itemInList['item']['name'] === itemToBeChanged){
                    itemInList['qty'] = item.selectedIndex + 1;
                };
            };
    
    
            localStorage.setItem("cart", JSON.stringify({cartList}));
            updateCart();
            cartLength();
        });
    });
}
