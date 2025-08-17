let cart = [];
let subtotal = 0;

function addToCart(name, price) {
  cart.push({ name, price });
  subtotal += price;
  updateCart();
  // Auto open cart on first add
  if (document.getElementById("cart-panel").classList.contains("hidden")) {
    toggleCart();
  }
}

function updateCart() {
  document.getElementById("cart-count").textContent = cart.length;
  document.getElementById("cart-subtotal").textContent = subtotal.toString();
  const items = document.getElementById("cart-items");
  items.innerHTML = "";
  cart.forEach((item, idx) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name}</span>
      <span>R ${item.price}</span>
    `;
    items.appendChild(li);
  });
}

function toggleCart() {
  document.getElementById("cart-panel").classList.toggle("hidden");
}

function scrollToShop() {
  document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
}

document.getElementById("year").textContent = new Date().getFullYear();