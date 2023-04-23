const featuredProductContainer = document.querySelector(".featured");

for (var i = 0; i < products.length; i++) {
  if (products[i].featured === true) {
    let productLink = `<a href="product.html?id=${products[i].id}" class="cta cta-small">View</a>`;
    if (products[i].sales === true) {
      productLink = `<a href="product.html?id=${products[i].id}" class="cta cta-small cta-sale">On Sale</a>`;
    }
    featuredProductContainer.innerHTML += `<div class="products">
        <img src="${products[i].image}" alt="${products[i].name}" />
        <h3>${products[i].name}</h3>
        <p>${products[i].price}</p>
        ${productLink}
      </div>`;
  }
}
