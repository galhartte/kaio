let cart = [];

function addToCart(item, price) {
  cart.push({ item, price });
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById('cart-items');
  const totalSpan = document.getElementById('total');
  cartList.innerHTML = '';
  let total = 0;

  cart.forEach(prod => {
    const li = document.createElement('li');
    li.textContent = `${prod.item} - R$ ${prod.price.toFixed(2)}`;
    cartList.appendChild(li);
    total += prod.price;
  });

  totalSpan.textContent = total.toFixed(2);
}

function finalizeOrder() {
  if (cart.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }

  const message = cart
    .map(p => `🍔 ${p.item} - R$ ${p.price.toFixed(2)}`)
    .join('%0A');
  const total = cart.reduce((sum, p) => sum + p.price, 0).toFixed(2);

  const phone = ''; // <- coloque seu número aqui, ex: '5599999999999'
  const url = `https://wa.me/${phone}?text=📦 Pedido:%0A${message}%0A%0ATotal: R$ ${total}`;
  window.open(url, '_blank');
}
