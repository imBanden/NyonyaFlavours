let cartList = JSON.parse(localStorage.getItem("cart"))["cartList"];

calculateTotalPrice();
updateCart();



function updateCart(){
    let cartContainer = document.querySelector('.cart-container');

    for (let itemInCart of cartList){
        let newItem = document.createElement('div');
        newItem.innerHTML = `<div class="cart-item">
                                <img class="cart-item-img" src="Bak Zhang.png"></img>
                                <div class="cart-item-details">
                                    <div class="cart-item-name">${itemInCart['item']['name']}</div>
                                    <div class="cart-item-qty">Qty: ${itemInCart['qty']}</div>
                                </div>
                                <div class="cart-item-price">£${currencyDP(itemInCart['qty']*itemInCart['item']['price'])}</div>
                            </div>`

        cartContainer.appendChild(newItem);
    }

}



function calculateTotalPrice(discountRate=0){
   

    let subtotalElement = document.querySelector('.subtotal-price-number');
    let discountElementText = document.querySelector('.discount-price-text');
    let discountElementNumber = document.querySelector('.discount-price-number');
    let totalElement = document.querySelector('.total-price-number');
    
    let subtotal = 0;

    for (let itemInCart of cartList){
        subtotal = subtotal + itemInCart['qty']*itemInCart['item']['price'];
    }

    let discount = subtotal * (discountRate/100);

    subtotalElement.innerHTML = `£${currencyDP(subtotal)}`;
    discountElementText.innerHTML = `Discount (${discountRate}%)`;
    discountElementNumber.innerHTML = `-£${currencyDP(discount)}`;
    totalElement.innerHTML = `£${currencyDP(subtotal - discount)}`
}


function currencyDP(price){
    return parseFloat(price).toFixed(2);
}




document.querySelector('.discount-code-gift-card-input-box').addEventListener('input', function(){

    let applyButton = document.querySelector('.discount-code-gift-card-apply-button');
    let inputBox = document.querySelector('.discount-code-gift-card-input-box');
    if (inputBox.value.length === 0){
        applyButton.classList.remove('unlockedButton');
        applyButton.classList.add('lockedButton');
    }
    else{
        applyButton.classList.add('unlockedButton');
        applyButton.classList.remove('lockedButton');
        applyButton.removeAttribute('disabled');
    }
});

document.querySelector('.discount-code-gift-card-apply-button').addEventListener('click', function(){

    let discountInputBox = document.querySelector('.discount-code-gift-card-input-box');
    let discountList = JSON.parse(localStorage.getItem('discountCode'))['discountDat'];
    let popUpMessageBox = document.querySelector('.pop-up-message-container');

    let couponIsValid = false;

    for (let discountCode of discountList){
        if (discountCode['discount code'] === discountInputBox.value){
            console.log('there is discount!');
            popUpMessageBox.classList.add('animation-fadeIn');
            calculateTotalPrice(discountCode['discount rate (%)']);
            couponIsValid = true;
            break;
        };
    }

    let warningMessage = document.querySelector('.discount-code-gift-card-warning-subcontainer');
    let inputBox = document.querySelector('.discount-code-gift-card-input-box');
    let discountCodeLabel = document.querySelector('.discount-price-text-code');

    if (!(couponIsValid)){
        discountCodeLabel.style.display = 'none';
        warningMessage.style.display = 'flex';
        inputBox.style.border = '1px solid hsl(0, 75%, 50%)'
    }
    else{
        discountCodeLabel.style.display = 'flex';
        warningMessage.style.display = 'none';
        inputBox.style.border = '1px solid hsla(210, 0%, 0%, 0.2)'
    }
});


window.addEventListener('resize', function() {
    let screenWidth = window.innerWidth;
    let smallScreenPayButton = document.querySelector('.pay-now-button-small-screen-container');
    let bigScreenPayButton = document.querySelector('.pay-now-button-big-screen-container');
    let orderSummaryDiv = document.querySelector('.order-summary-div');
    
    console.log("Screen width:", screenWidth, "pixels");

    if (screenWidth <= 960){
        orderSummaryDiv.style.display = 'flex';
        smallScreenPayButton.style.display = 'flex';
        bigScreenPayButton.style.display = 'none';
    }
    else{
        orderSummaryDiv.style.display = 'none';
        smallScreenPayButton.style.display = 'none';
        bigScreenPayButton.style.display = 'flex';
    }
});