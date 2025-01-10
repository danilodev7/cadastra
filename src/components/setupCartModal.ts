import { setupCart, updateCartDisplay } from './setupCart';

export function setupCartModal() {
  const modal = document.createElement('div');
  modal.id = 'cart-modal';
  modal.classList.add('cart-modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('cart-modal-content');
  modal.appendChild(modalContent);

  const closeButton = document.createElement('span');
  closeButton.classList.add('close-button');
  closeButton.innerHTML = '&times;';
  modalContent.appendChild(closeButton);

  document.body.appendChild(modal);

  closeButton.addEventListener('click', () => {
    modal.classList.remove('show');
  });

  document.querySelector('.cart-icon')?.addEventListener('click', () => {
    modal.classList.add('show');
    updateCartDisplay(); 
  });

  setupCart();
}