import { Product } from '../../ts/Product';

export function createColorFilter(products: Product[]): HTMLElement {
  const colorFilterContainer = document.createElement('div');
  colorFilterContainer.id = 'color-filter-container';
  colorFilterContainer.innerHTML = `
    <h3 class="mobile-hidden">Cores</h3>
    ${Array.from(new Set(products.map(product => product.color))).map(color => `
      <label class="filter-label">
        <input type="checkbox" name="color" value="${color}" class="filter-input">
        ${color}
      </label>
    `).join('')}
  `;
  return colorFilterContainer;
}