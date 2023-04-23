const productsContainer = document.querySelector(".product-list");
const productContainer = document.querySelector(".product-specific");
let url = new URL(document.location);
let searchParams = new URLSearchParams(url.search);
const productId = searchParams.get("id");

let products = [];

/* const apiUrl = "https://coffeemeup.local/wp-json/wc/store/products"; */

async function fetchProducts() {
  try {
    const response = await fetch(
      "https://coffeemeup.local/wp-json/wc/store/products"
    );
    const productsRaw = (await response.json()) || [];

    products = productsRaw.map((product) => {
      return {
        ...product,
        name: product.name,
        price: product.prices,
        image: product.images[0],
        id: product.id,
        description: product.description,
        featured: false,
        sales: false,
      };
    });

    renderProducts();
    renderProduct();

    console.log(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

fetchProducts();

function renderProducts() {
  if (productsContainer) {
    productsContainer.innerHTML = "";

    console.log("console.log(products);", products);

    if (products.length) {
      products.forEach(function (product) {
        let productLink = `<a href="product.html?id=${product.id}" class="cta cta-small">View</a>`;
        if (product.on_sale === true) {
          productLink = `<a href="product.html?id=${product.id}" class="cta cta-small cta-sale">On Sale</a>`;
        }

        productsContainer.innerHTML += `<li class="products">
                <img src="${product.images[0].thumbnail}" alt="${
          product.name
        }" />
                <h2>${product.name}</h2>
                <p>${product.prices.currency_symbol}${(
          product.prices.price / 100
        ).toFixed(2)}</p>
                ${productLink}
              </li>`;
      });
    }
  }
}

function renderProduct() {
  const product = products?.find(({ id }) => id == productId) || [];

  if (productContainer) {
    productContainer.innerHTML = `<section>
    <img src="${product.images[0].src}" alt="${
      product.name
    }" class="product-image" />
    </section>
    <section class="product-specific__details">
    <h1>${product.name}</h1>
    ${product.description}
    <p class="product-specific__price">${product.prices.currency_symbol}${
      product.prices.price / 100
    }</p>
    <button onclick="addToCart()">Add to cart</button>
    </section>`;
  }
}

function addToCart() {
  const product = products?.find(({ id }) => id == productId) || [];
  cartList.push(product);
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

const addToCartBtn = document.querySelector("add-to-cart");
addToCartBtn.addEventListener("click", () => addToCart());

// const featuredProductContainer = document.querySelector(".featured");

// for (var i = 0; i < products.length; i++) {
//   if (products[i].featured === true) {
//     let productLink = `<a href="product.html?id=${products[i].id}" class="cta cta-small">View</a>`;
//     if (products[i].sales === true) {
//       productLink = `<a href="product.html?id=${products[i].id}" class="cta cta-small cta-sale">On Sale</a>`;
//     }
//     featuredProductContainer.innerHTML += `<div class="products">
//         <img src="${products[i].image}" alt="${products[i].name}" />
//         <h3>${products[i].name}</h3>
//         <p>${products[i].price}</p>
//         ${productLink}
//       </div>`;
//   }
// }
