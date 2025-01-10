import { Product } from '../../ts/Product';

export function createSortFilter(): HTMLElement {
  const sortFilterContainer = document.createElement('div');
  sortFilterContainer.id = 'sort-filter-container';
  sortFilterContainer.innerHTML = `
    <div class="custom-select">
      <div class="select-selected">Ordenar por: <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 10L13 1.00935" stroke="#666666" stroke-linecap="round"/></svg></div>
      <div class="select-items select-hide">
        <div data-value="low-to-high">Menor preço</div>
        <div data-value="high-to-low">Maior preço</div>
      </div>
    </div>
  `;
  return sortFilterContainer;
}