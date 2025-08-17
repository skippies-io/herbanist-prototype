let cart = [];
let subtotal = 0;

function addToCart(name, price) {
  cart.push({ name, price });
  subtotal += price;
  updateCart();
}

function updateCart() {
  document.getElementById("cart-count").textContent = cart.length;
  document.getElementById("cart-subtotal").textContent = subtotal;
  const items = document.getElementById("cart-items");
  items.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - R ${item.price}`;
    items.appendChild(li);
  });
}

function toggleCart() {
  document.getElementById("cart-panel").classList.toggle("hidden");
}

function scrollToShop() {
  document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
}
