const queryString = document.location.search;
let url = new URL(document.location);
let searchParams = new URLSearchParams(url.search);
const productId = searchParams.get("id");
const productContainer = document.querySelector(".product-specific");

const product = products.find(({ id }) => id == productId);

productContainer.innerHTML = `<section>
<img src="${product.image}" alt="${product.name}" class="product-image" />
</section>
<section class="product-specific__details">
<h1>${product.name}</h1>
${product.description}
<p class="product-specific__price">${product.price}</p>
<button data-item="${productId}">Add to cart</button>
</section>`;

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
      <p>Price <strong>${item.price}</strong><p>
    </div>
  `;
}

function addToCart(button) {
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
    (total, item) => total + item.price,
    0
  );

  const cartItemCount = document.querySelector(".cart-item-count");
  if (cartList.length > 0) {
    cartItemCount.innerHTML = cartList.length;
    cartItemCount.style.display = "flex";
  } else {
    cartItemCount.style.display = "none";
  }
}

function clearCart() {
  localStorage.removeItem("cart_list");
  cartList = [];
  updateCart();
}

const addToCartBtn = document.querySelector("[data-item]");
addToCartBtn.addEventListener("click", () => addToCart(addToCartBtn));

document
  .getElementById("js-checkout")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const cartListEncoded = encodeURIComponent(JSON.stringify(cartList));
    location.href = `checkout.html?cart=${cartListEncoded}`;
  });
