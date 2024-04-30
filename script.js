import { menuArray } from "./data.js";

const cartTotalEl = document.getElementById("cart-total-amount");
const completeOrderBtnEl = document.getElementById("complete-order-btn");
const paymentPopUpEl = document.getElementById("payment-popup");

let totalPrice = 0;

// Render menu items to DOM
function renderMenu() {
  let menuHtml = "";
  menuArray.forEach((item) => {
    menuHtml += `
        <div class="menu-item">
            <div class="menu-item-main">
                <span class="menu-item-emoji">${item.emoji}</span>
                <div class="menu-item-details">
                    <span class="menu-item-name">${item.name}</span>
                    <span class="menu-item-ingredients">${item.ingredients}</span>
                    <span class="menu-item-price">£${item.price}</span>
                </div>
            </div>
            <i class="fa-regular fa-square-plus menu-item-icon" data-id="${item.id}"></i>
        </div>

        `;
  });
  document.querySelector(".menu").innerHTML = menuHtml;
}

renderMenu();

// On click event for add to cart button

document.querySelector(".menu").addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("fa-square-plus")) {
    const itemId = +target.getAttribute("data-id");
    addToCart(itemId);
  }
});

function addToCart(id) {
  menuArray.forEach((item) => {
    if (item.id === id) {
      document.querySelector(".cart-items").innerHTML += `
        <div class="cart-item">
            <span class="cart-item-name">${item.name}<span class="remove-btn">remove</span></span>
            <span class="cart-item-price">£${item.price}</span>
        </div>
        `;
    }
  });
  getTotalPrice(id);
  renderTotalPrice(totalPrice);

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", removeCartItem);
  });
}

function removeCartItem() {
  const cartItemDiv = event.target.closest(".cart-item");
  const priceString = cartItemDiv.querySelector(".cart-item-price").textContent;
  const price = parseFloat(priceString.replace("£", ""));

  cartItemDiv.remove();

  totalPrice -= price;

  renderTotalPrice(totalPrice);
}

// Funtion to delete item from cart and the item price span using the remove-btn

function getTotalPrice(id) {
  menuArray.forEach((item) => {
    if (item.id === id) {
      totalPrice += item.price;
    }
  });
  return totalPrice;
}

function renderTotalPrice(price) {
  cartTotalEl.innerHTML = price;
}

completeOrderBtnEl.addEventListener("click", () => {
  paymentPopUpEl.style.display = "flex";
});
