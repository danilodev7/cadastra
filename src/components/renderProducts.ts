import { Product } from '../ts/Product';

export function renderProducts(products: Product[], append: boolean = false) {
  const productList = document.getElementById('product-list');
  if (productList) {
    const productHTML = products.map(product => `
      <div class="product">
        <img src="${product.image}" alt="${product.name}">
        <h2 class="product-name">${product.name}</h2>
        <p class="product-price">${product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
        <p class="product-payment">${product.parcelamento[0]}x de ${product.parcelamento[1]}</p>
        <button data-product-id="${product.id}" data-product-name="${product.name}" data-product-price="${product.price}">Comprar</button>
      </div>
      `).join('');

      if (append) {
        productList.innerHTML += productHTML;
      } else {
        productList.innerHTML = productHTML;
      }
  }
}