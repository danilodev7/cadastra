import { setupCart } from "../components/setupCart";
import { renderProducts } from '../components/renderProducts';
import { setupFilters } from '../components/setupFilters';
import { setupCartModal } from "../components/setupCartModal";
import { setupFilterModal } from "../components/setupFilterModal";
import { setupSortModal } from "../components/setupSortModal";
import { fetchProducts } from './api';

let currentPage = 1;

function main() {
  fetchProducts().then(products => {
    console.log('Carregando Produtos...'); 
    renderProducts(products);
    setupFilters(products);
    setupFilterModal(products);
    setupCartModal();
    setupSortModal(products);
    setupCart();
  });
  

  document.getElementById('load-more')?.addEventListener('click', () => {
    currentPage++;
    fetchProducts(currentPage).then(products => {
      console.log('Carregando mais produtos:', products);
      renderProducts(products, true);
    });
  });
}

document.addEventListener("DOMContentLoaded", main);