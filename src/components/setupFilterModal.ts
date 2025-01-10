import { createColorFilter } from '../components/filtersProduct/colorFilter';
import { createSizeFilter } from '../components/filtersProduct/sizeFilter';
import { createPriceFilter } from '../components/filtersProduct/priceFilter';
import { Product } from '../ts/Product';
import { renderProducts } from './renderProducts';
import { applyFilters } from './setupFilters';

export function setupFilterModal(products: Product[]) {
  const filterModal = document.createElement('div');
  filterModal.id = 'filter-modal';
  filterModal.classList.add('filter-modal');

  const filterModalContent = document.createElement('div');
  filterModalContent.classList.add('filter-modal-content');
  filterModal.appendChild(filterModalContent);

  const closeButton = document.createElement('span');
  closeButton.classList.add('close-button');
  closeButton.innerHTML = '&times;';
  filterModalContent.appendChild(closeButton);

  document.body.appendChild(filterModal);

  closeButton.addEventListener('click', () => {
    filterModal.classList.remove('show');
  });

  document.querySelector('#filter-button')?.addEventListener('click', () => {
    filterModal.classList.add('show');
  });

  document.querySelector('#responsive-filter')?.addEventListener('click', () => {
    filterModal.classList.add('show');
  });

  const modalTitle = document.createElement('h2');
  modalTitle.innerText = 'Filtros';
  filterModalContent.appendChild(modalTitle);

  // Criar o accordion
  const accordion = document.createElement('div');
  accordion.classList.add('accordion');

  // Adicionar seções ao accordion
  const sections = [
    { title: 'Cores', content: createColorFilter(products) },
    { title: 'Tamanhos', content: createSizeFilter(products) },
    { title: 'Faixa de Preço', content: createPriceFilter() }
  ];

  sections.forEach(section => {
    const sectionHeader = document.createElement('div');
    sectionHeader.classList.add('accordion-header');
    sectionHeader.innerHTML = `
      ${section.title}
      <svg class="accordion-icon" width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L7 10L13 1.00935" stroke="#666666" stroke-linecap="round"/>
      </svg>
    `;

    const sectionContent = document.createElement('div');
    sectionContent.classList.add('accordion-content');
    sectionContent.appendChild(section.content);

    sectionHeader.addEventListener('click', () => {
      sectionHeader.classList.toggle('active');
      sectionContent.classList.toggle('active');
    });

    accordion.appendChild(sectionHeader);
    accordion.appendChild(sectionContent);
  });

  filterModalContent.appendChild(accordion);

  // Adicionar botões fixos no final do modal
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');

  const applyButton = document.createElement('button');
  applyButton.innerText = 'APLICAR';
  applyButton.classList.add('apply-button');

  const resetButton = document.createElement('button');
  resetButton.innerText = 'LIMPAR';
  resetButton.classList.add('reset-button');

  buttonContainer.appendChild(applyButton);
  buttonContainer.appendChild(resetButton);
  filterModalContent.appendChild(buttonContainer);

  // Evento clique
  applyButton.addEventListener('click', () => {
    filterModal.classList.remove('show');
    applyFilters(products);
  });

  resetButton.addEventListener('click', () => {
    const inputs = filterModal.querySelectorAll('input[type="checkbox"]');
    inputs.forEach(input => {
      (input as HTMLInputElement).checked = false;
      const label = input.parentElement as HTMLLabelElement;
      label.classList.remove('selected');
    });
    filterModal.classList.remove('show');
    renderProducts(products);
  });

  // Adicionar eventos de clique aos inputs e labels dentro do modal
  filterModalContent.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' && (target as HTMLInputElement).type === 'checkbox') {
      const label = target.parentElement as HTMLLabelElement;
      if ((target as HTMLInputElement).checked) {
        label.classList.add('selected');
      } else {
        label.classList.remove('selected');
      }
      applyFilters(products);
    }
  });
}