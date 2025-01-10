import { Product } from '../ts/Product';

const cart: { [key: string]: { quantity: number, name: string, price: number } } = {};
let totalValue = 0;

export function setupCart() {
  document.body.removeEventListener('click', handleAddToCart); // Remove o evento anterior, se existir
  document.body.addEventListener('click', handleAddToCart);
  updateCartDisplay();
}

function handleAddToCart(event: Event) {
  const target = event.target as HTMLElement;
  if (target.tagName === 'BUTTON' && target.dataset.productId) {
    const productId = target.dataset.productId;
    const productName = target.dataset.productName;
    const productPrice = parseFloat(target.dataset.productPrice || '0');
    if (productId && productName && !isNaN(productPrice)) {
      if (!cart[productId]) {
        cart[productId] = { quantity: 0, name: productName, price: productPrice };
      }
      cart[productId].quantity += 1;
      totalValue += productPrice;
      updateCartDisplay();
    }
  }
}

export function updateCartDisplay() {
  let cartDisplay = document.getElementById('cart-display');
  if (!cartDisplay) {
    cartDisplay = document.createElement('div');
    cartDisplay.id = 'cart-display';
    document.querySelector('.cart-modal-content')?.appendChild(cartDisplay);
  }

  if (Object.keys(cart).length === 0) {
    cartDisplay.innerHTML = `
      <h2>Carrinho</h2>
      <p>Carrinho vazio</p>
    `;
  } else {
    cartDisplay.innerHTML = `
      <h2>Carrinho</h2>
      <ul>
      ${Object.entries(cart).map(([productId, { quantity, name, price }]) => `
        <li>
          <div class="product-info">
            <span class="product-name">${name}</span>
            <span class="product-quantity">Quantidade: ${quantity}</span>
          </div>
          <span class="product-price">${price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
        </li>
      `).join('')}
      </ul>
      <p>Valor total: ${totalValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
    `;
  }

  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    cartCount.textContent = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0).toString();
  }
}