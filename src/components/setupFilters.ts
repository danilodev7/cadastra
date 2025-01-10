import { Product } from '../ts/Product';
import { renderProducts } from '../components/renderProducts';
import { createColorFilter } from '../components/filtersProduct/colorFilter';
import { createSizeFilter } from '../components/filtersProduct/sizeFilter';
import { createPriceFilter } from '../components/filtersProduct/priceFilter';
import { createSortFilter } from '../components/filtersProduct/sortFilter';

export function setupFilters(products: Product[]) {
  const filterForm = document.createElement('form');
  filterForm.id = 'filter-form';

  // Adicionar filtros ao formulário
  filterForm.appendChild(createColorFilter(products));
  filterForm.appendChild(createSizeFilter(products));
  filterForm.appendChild(createPriceFilter());

  const filtersContainer = document.getElementById('filters');
  if (filtersContainer) {
    filtersContainer.appendChild(filterForm);
  } else {
    console.error('Elemento com id "filters" não encontrado.');
  }

  // Filtro de ordenação por preço
  const sortFilterContainer = createSortFilter();
  const productSection = document.querySelector('#products');
  if (productSection) {
    productSection.insertBefore(sortFilterContainer, document.getElementById('product-list'));
  } else {
    console.error('Elemento com id "products" não encontrado.');
  }

  filterForm.addEventListener('input', () => {
    applyFilters(products);
  });

  // Adiciona evento de clique para alternar a seleção
  filterForm.addEventListener('click', (event) => {
    const target = event.target as HTMLInputElement;
    if (target.tagName === 'INPUT' && target.type === 'checkbox') {
      const label = target.parentElement as HTMLLabelElement;
      if (target.checked) {
        label.classList.add('selected');
      } else {
        label.classList.remove('selected');
      }
      filterForm.dispatchEvent(new Event('input'));
    }
  });

  document.querySelectorAll('.select-items div').forEach(item => {
    item.addEventListener('click', (event) => {
      const selectedValue = (event.target as HTMLElement).getAttribute('data-value');
      const selectedText = (event.target as HTMLElement).innerText;
      const selectSelected = document.querySelector('.select-selected');
      if (selectSelected) {
        selectSelected.innerHTML = `${selectedText} <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 10L13 1.00935" stroke="#666666" stroke-linecap="round"/></svg>`;
        // Reatribuir o evento de clique ao ícone de seta para baixo
        const selectArrow = selectSelected.querySelector('svg');
        if (selectArrow) {
          selectArrow.addEventListener('click', (event) => {
            event.stopPropagation(); // Impede que o evento de clique se propague para o pai
            const selectItems = document.querySelector('.select-items');
            if (selectItems) {
              selectItems.classList.toggle('select-hide');
              selectSelected.classList.toggle('select-arrow-active');
            }
          });
        }
      }
      let sortedProducts = [...products];
      if (selectedValue === 'low-to-high') {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (selectedValue === 'high-to-low') {
        sortedProducts.sort((a, b) => b.price - a.price);
      }
      renderProducts(sortedProducts);
    });
  });

  // Adiciona evento para abrir/fechar o dropdown
  const selectSelected = document.querySelector('.select-selected');
  if (selectSelected) {
    selectSelected.addEventListener('click', () => {
      const selectItems = document.querySelector('.select-items');
      if (selectItems) {
        selectItems.classList.toggle('select-hide');
        selectSelected.classList.toggle('select-arrow-active');
      }
    });

    // Adicionar evento de clique no ícone de seta para baixo
    const selectArrow = selectSelected.querySelector('svg');
    if (selectArrow) {
      selectArrow.addEventListener('click', (event) => {
        event.stopPropagation(); // Impede que o evento de clique se propague para o pai
        const selectItems = document.querySelector('.select-items');
        if (selectItems) {
          selectItems.classList.toggle('select-hide');
          selectSelected.classList.toggle('select-arrow-active');
        }
      });
    }
  }

  // Fecha o dropdown se clicar fora dele
  document.addEventListener('click', (event) => {
    if (!(event.target as HTMLElement).matches('.select-selected, .select-selected svg')) {
      const selectItems = document.querySelector('.select-items');
      if (selectItems) {
        selectItems.classList.add('select-hide');
        selectSelected?.classList.remove('select-arrow-active');
      }
    }
  });
}

export function applyFilters(products: Product[]) {
  const selectedColors = Array.from(document.querySelectorAll('input[name="color"]:checked')).map(input => (input as HTMLInputElement).value);
  const selectedSizes = Array.from(document.querySelectorAll('input[name="size"]:checked')).map(input => (input as HTMLInputElement).value);
  const selectedPrices = Array.from(document.querySelectorAll('input[name="price"]:checked')).map(input => (input as HTMLInputElement).value);

  const filteredProducts = products.filter(product => {
    const matchesColor = selectedColors.length === 0 || selectedColors.includes(product.color);
    const matchesSize = selectedSizes.length === 0 || selectedSizes.some(size => product.size.includes(size));
    const matchesPrice = selectedPrices.length === 0 || selectedPrices.some(priceRange => {
      const [min, max] = priceRange.split('até').map(Number);
      return product.price >= min && (max ? product.price <= max : true);
    });

    return matchesColor && matchesSize && matchesPrice;
  });

  renderProducts(filteredProducts);
}