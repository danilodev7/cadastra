import { Product } from '../../ts/Product';

export function createPriceFilter(): HTMLElement {
  const priceFilterContainer = document.createElement('div');
  priceFilterContainer.id = 'price-filter-container';
  priceFilterContainer.innerHTML = `
    <h3 class="mobile-hidden">Faixa de Preço</h3>
    <label class="filter-label">
      <input type="checkbox" name="price" value="0-50" class="filter-input">
      <span>de R$0 até R$50</span>
    </label>
    <label class="filter-label">
      <input type="checkbox" name="price" value="51-150" class="filter-input">
      <span>de R$51 até R$150</span>
    </label>
    <label class="filter-label">
      <input type="checkbox" name="price" value="151-300" class="filter-input">
      <span>de R$151 até R$300</span>
    </label>
    <label class="filter-label">
      <input type="checkbox" name="price" value="200-500" class="filter-input">
      <span>de R$301 até R$500</span>
    </label>
    <label class="filter-label">
      <input type="checkbox" name="price" value="500" class="filter-input">
      <span>apartir de R$500</span>
    </label>
  `;
  return priceFilterContainer;
}