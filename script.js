let cart = []; // [{name, price, qty}]
let subtotal = 0;

function addToCart(name, price) {
  const existing = cart.find(i => i.name === name && i.price === price);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  recalc();
  updateCart();

  // Auto open cart on first add
  const panel = document.getElementById("cart-panel");
  if (panel.classList.contains("hidden")) toggleCart();
}

function recalc() {
  subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function updateCart() {
  document.getElementById("cart-count").textContent = cart.reduce((n, i) => n + i.qty, 0);
  document.getElementById("cart-subtotal").textContent = subtotal.toString();

  const items = document.getElementById("cart-items");
  items.innerHTML = "";

  cart.forEach((item, idx) => {
    const li = document.createElement("li");

    const left = document.createElement("div");
    left.textContent = item.name;

    const right = document.createElement("div");
    right.className = "cart-row-right";

    // qty controls
    const qc = document.createElement("div");
    qc.className = "q-controls";

    const minus = document.createElement("button");
    minus.className = "q-btn";
    minus.setAttribute("aria-label", "Decrease quantity");
    minus.textContent = "−";
    minus.onclick = () => changeQty(idx, -1);

    const qty = document.createElement("span");
    qty.textContent = item.qty.toString();

    const plus = document.createElement("button");
    plus.className = "q-btn";
    plus.setAttribute("aria-label", "Increase quantity");
    plus.textContent = "+";
    plus.onclick = () => changeQty(idx, +1);

    qc.appendChild(minus);
    qc.appendChild(qty);
    qc.appendChild(plus);

    const priceEl = document.createElement("span");
    priceEl.textContent = `R ${item.price * item.qty}`;

    const remove = document.createElement("button");
    remove.className = "remove-btn";
    remove.textContent = "Remove";
    remove.onclick = () => removeItem(idx);

    right.appendChild(qc);
    right.appendChild(priceEl);
    right.appendChild(remove);

    li.appendChild(left);
    li.appendChild(right);
    items.appendChild(li);
  });
}

function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  recalc();
  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  recalc();
  updateCart();
}

function toggleCart() {
  document.getElementById("cart-panel").classList.toggle("hidden");
}

function scrollToShop() {
  document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
}

document.getElementById("year").textContent = new Date().getFullYear();
