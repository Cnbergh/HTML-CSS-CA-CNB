const jacketsContainer = document.querySelector(".product-list");

for (var i = 0; i < products.length; i++) {
  let productLink = `<a href="product.html?id=${products[i].id}" class="cta cta-small">View</a>`;
  if (products[i].sales === true) {
    productLink = `<a href="product.html?id=${products[i].id}" class="cta cta-small cta-sale">On Sale</a>`;
  }
  jacketsContainer.innerHTML += `<li class="products">
    <img src="${products[i].image}" alt="${products[i].name}" />
    <h2>${products[i].name}</h2>
    <p>${products[i].price}</p>
    ${productLink}
  </li>`;
}
