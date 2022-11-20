const queryString=document.location.search;
const params=newURLSearchParams(queryString);
const productId=params.get("id");
const productContainer=document.querySelector(".product-specific");

constproduct=products.find(({id })=>id==productId);

productContainer.innerHTML=`<section>
<img src="${product.image}" alt="${product.name}" class="product-image" />
<div class="product-image_thumbnails">
  <div>
    <img src="../images/product-specific.jpg" alt="product3" class="product-image" />
  </div>
  <div>
    <img src="../images/product-specific.jpg" alt="product3" class="product-image" />
  </div>
  <div>
    <img src="../images/product-specific.jpg" alt="product3" class="product-image" />
  </div>
  <div>
    <img src="../images/product-specific.jpg" alt="product3" class="product-image" />
  </div>
</div>
</section>
<section class="product-specific__details">
<h1>${product.name}</h1>
${product.description}
<p class="product-specific__price">${product.price}</p>
<a href="../contact.html" class="cta cta-large">Contact Us</a>
</section>`