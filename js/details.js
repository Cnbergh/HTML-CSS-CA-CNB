const queryString = document.location.search;
let urlSearch = new URL(document.location);
let searchParams2 = new URLSearchParams(urlSearch.search);
const productId2 = searchParams2.get("id");
const specificProductContainer = document.querySelector(".product-specific");

const toggleCartBtn = document.querySelector("#js-toggle-cart");
const closeCartBtn = document.querySelector("#js-close-cart");
const cartlistEl = document.querySelector("#js-cart-list");
const totalItemsEl = document.querySelector("#js-cart-total-items");
const totalPriceEl = document.querySelector("#js-cart-total-price");
const cartSectionEl = document.querySelector("#js-cart-section");
const clearCartEl = document.querySelector("#js-clear-cart");

let cartList = JSON.parse(localStorage.getItem("cart_list")) || [];

toggleCartBtn.addEventListener("click", function () {
  cartSectionEl.classList.toggle("is-open");
});

closeCartBtn.addEventListener("click", function () {
  cartSectionEl.classList.remove("is-open");
});

clearCartEl.addEventListener("click", clearCart);

function createCartItemHTML(item) {
  return `
    <div class="c-cart-list_item">
      <h4>Name: <strong>${item.name}</strong><h4>
      <p>Price <strong>${item.prices.price / 100}</strong><p>
    </div>
  `;
}

function addToCart() {
  const item = product;
  cartList.push(item);
  localStorage.setItem("cart_list", JSON.stringify(cartList));

  updateCart();
}

function updateCart() {
  cartlistEl.innerHTML = "";

  cartList.forEach(function (item) {
    cartlistEl.innerHTML += createCartItemHTML(item);
  });

  totalItemsEl.innerHTML = cartList.length;
  totalPriceEl.innerHTML = cartList.reduce(
    (total, item) => total + item.prices.price / 100,
    0
  );

  const cartItemCount = document.querySelector(".cart-item-count");
  if (cartList.length > 0) {
    cartItemCount.innerHTML = cartList.length;
    cartItemCount.style.display = "flex";
  } else {
    cartItemCount.style.display = "none";
  }

  console.log("cartList", cartList);
}

function clearCart() {
  localStorage.removeItem("cart_list");
  cartList = [];
  updateCart();
}

// const addToCartBtn = document.querySelector("[data-item]");
// addToCartBtn.addEventListener("click", () => addToCart());

document
  .getElementById("js-checkout")
  .addEventListener("click", function (event) {
    event.preventDefault();
    location.href = "/checkout.html";
  });

updateCart();
