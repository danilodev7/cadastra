import { Product } from '../../ts/Product';

export function createSizeFilter(products: Product[]): HTMLElement {
  const sizeFilterContainer = document.createElement('div');
  sizeFilterContainer.id = 'size-filter-container';
  sizeFilterContainer.innerHTML = `
    <h3 class="mobile-hidden">Tamanhos</h3>
    ${Array.from(new Set(products.flatMap(product => product.size))).map(size => `
      <label class="filter-label">
        <input type="checkbox" name="size" value="${size}" class="filter-input">
        ${size}
      </label>
    `).join('')}
  `;
  return sizeFilterContainer;
}