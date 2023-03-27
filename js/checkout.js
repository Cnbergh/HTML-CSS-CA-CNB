const cartlistEl = document.querySelector("#js-cart-list");
const checkoutForm = document.getElementById("checkout-form");

let url = new URL(document.location);
let searchParams = new URLSearchParams(url.search);
let cartList = searchParams.has("cart")
  ? JSON.parse(decodeURIComponent(searchParams.get("cart")))
  : [];

function createCartItemHTML(item) {
  return `
    <div class="c-cart-list_item">
      <h4>Name: <strong>${item.name}</strong></h4>
      <p>Price: <strong>${item.price}</strong></p>
    </div>
  `;
}

function displayCartItems() {
  cartlistEl.innerHTML = "";

  cartList.forEach(function (item) {
    cartlistEl.innerHTML += createCartItemHTML(item);
  });
}

displayCartItems();

checkoutForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = event.target.name.value;
  const email = event.target.email.value;
  const address = event.target.address.value;

  const order = {
    name,
    email,
    address,
    items: cartList,
  };

  const rainyCloudContainer = document.querySelector(".rainy-cloud-container");
  rainyCloudContainer.style.display = "flex";

  setTimeout(() => {
    console.log("Order:", order);

    localStorage.removeItem("cart_list");
    cartList = [];
    updateCart();

    rainyCloudContainer.style.display = "none";

    const modal = document.getElementById("checkout-modal");
    const modalMessage = document.getElementById("modal-message");
    const modalClose = document.getElementById("modal-close");

    modalMessage.innerText = "Thank you for your purchase!";
    modal.style.display = "flex";

    modalClose.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }, 2000);
});

function displayCartItems() {
  cartlistEl.innerHTML = "";

  cartList.forEach(function (item) {
    cartlistEl.innerHTML += createCartItemHTML(item);
  });
}
