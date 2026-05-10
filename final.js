const headerCont = document.getElementsByClassName("headerCont")[0];
const navCont = document.getElementsByClassName("navCont")[0];

const mainCont = document.getElementsByClassName("mainCont")[0];

const productsContainer = document.getElementById("productsContainer");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");
const sortSelect = document.getElementById("sortSelect");

let products = [];

async function fetchProducts() {

  const response = await fetch("https://fakestoreapi.com/products");

  const data = await response.json();

  products = data;

  displayProducts(products);
}

fetchProducts();

function displayProducts(productsArray) {

  productsContainer.innerHTML = "";

  productsArray.forEach(product => {

    const card = document.createElement("div");

    card.classList.add("card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />

      <h3>${product.title}</h3>

      <p class="price">$${product.price}</p>

      <button onclick="showMore(${product.id})">
        See More
      </button>
    `;
    productsContainer.appendChild(card);
  });
}

async function showMore(id) {

  const response = await fetch(`https://fakestoreapi.com/products/${id}`);

  const product = await response.json();

  modalBody.innerHTML = `
  
    <div class="modal-product">

      <img src="${product.image}" alt="${product.title}" />

      <div class="modal-info">

        <h2>${product.title}</h2>

        <p>${product.description}</p>

        <h3>Price: $${product.price}</h3>

      </div>

    </div>
  `;

  modal.classList.remove("hidden");
}

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", (e) => {

  if(e.target === modal) {
    modal.classList.add("hidden");
  }
});

sortSelect.addEventListener("change", () => {

  let sortedProducts = [...products];

  if(sortSelect.value === "low-high") {

    sortedProducts.sort((a, b) => a.price - b.price);

  } else if(sortSelect.value === "high-low") {

    sortedProducts.sort((a, b) => b.price - a.price);

  }

  displayProducts(sortedProducts);
});