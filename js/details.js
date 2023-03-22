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
<a href="../contact.html" class="cta cta-large">Contact Us</a>
</section>`;
