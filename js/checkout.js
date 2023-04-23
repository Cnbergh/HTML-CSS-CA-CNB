let checkoutForm = document.querySelector("#checkout-form");
const cartlistEl = document.querySelector("#checkout-items");
const totalPriceEl = document.querySelector("#js-cart-total-price");
const totalItemsEl = document.querySelector("#js-cart-total-items");

let cartList = JSON.parse(localStorage.getItem("cart_list")) || [];

function createCartItemHTML(item) {
  return `
    <div class="c-cart-list_item">
      <h4>Name: <strong>${item.name}</strong><h4>
      <p>Price <strong>${item.prices.price / 100}</strong><p>
    </div>
  `;
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

checkoutForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = event.target.name.value;
  const email = event.target.email.value;
  const address = event.target.address.value;

  if (!name || !email || !address) {
    alert("Please fill in all fields.");
    return;
  }

  const order = {
    name,
    email,
    address,
    items: cartList,
  };

  const rainyCloudContainer = document.querySelector(".rainy-cloud-container");
  rainyCloudContainer.style.display = "flex";

  setTimeout(() => {
    try {
      console.log("Order:", order);

      localStorage.removeItem("cart_list");
      cartList = [];
      updateCart();

      const modal = document.getElementById("checkout-modal");
      const modalMessage = document.getElementById("modal-message");
      const modalClose = document.getElementById("modal-close");

      modalMessage.innerText = "Thank you for your purchase!";
      modal.style.display = "flex";

      modalClose.addEventListener("click", () => {
        modal.style.display = "none";
      });
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again.");
    } finally {
      rainyCloudContainer.style.display = "none";
    }
  }, 2000);
});

updateCart();
