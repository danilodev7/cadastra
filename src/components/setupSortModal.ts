import { Product } from "../ts/Product";
import { renderProducts } from './renderProducts';

export function setupSortModal(products: Product[]) {
  const sortModal = document.createElement('div');
  sortModal.id = 'sort-modal';
  sortModal.classList.add('sort-modal');

  const sortModalContent = document.createElement('div');
  sortModalContent.classList.add('sort-modal-content');
  sortModal.appendChild(sortModalContent);

  const closeButton = document.createElement('span');
  closeButton.classList.add('close-button');
  closeButton.innerHTML = '&times;';
  sortModalContent.appendChild(closeButton);

  document.body.appendChild(sortModal);

  closeButton.addEventListener('click', () => {
    sortModal.classList.remove('show');
  });

  document.querySelector('#sort-button')?.addEventListener('click', () => {
    sortModal.classList.add('show');
  });

  document.querySelector('#responsive-sort')?.addEventListener('click', () => {
    sortModal.classList.add('show');
  });

  const modalTitle = document.createElement('h2');
  modalTitle.innerText = 'Ordenar';
  sortModalContent.appendChild(modalTitle);

  // Adicionar filtro de ordenação ao modal
  const sortFilterContainer = document.createElement('div');
  sortFilterContainer.id = 'sort-filter-container';
  sortFilterContainer.innerHTML = `
    <ul class="sort-filter-list">
      <li data-value="most-recent">Mais recente</li>
      <li data-value="high-to-low">Maior preço</li>
      <li data-value="low-to-high">Menor preço</li>
    </ul>
  `;
  sortModalContent.appendChild(sortFilterContainer);

  // Adicionar eventos de clique aos itens de ordenação
  sortFilterContainer.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'LI') {
      const selectedValue = target.getAttribute('data-value');
      let sortedProducts = [...products];
      if (selectedValue === 'most-recent') {
        sortedProducts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      } else if (selectedValue === 'high-to-low') {
        sortedProducts.sort((a, b) => b.price - a.price);
      } else if (selectedValue === 'low-to-high') {
        sortedProducts.sort((a, b) => a.price - b.price);
      }
      renderProducts(sortedProducts);
      sortModal.classList.remove('show');
    }
  });
}