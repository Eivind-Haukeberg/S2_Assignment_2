function showMessage(message, type = 'success') {
  const messageElement = document.getElementById('form-message');
  messageElement.textContent = message;
  messageElement.className = 'pharmacy-inventory__form-message';

  if (type === 'error') {
    messageElement.classList.add('pharmacy-inventory__form-message--error');
  } else {
    messageElement.classList.add('pharmacy-inventory__form-message--success');
  }

  setTimeout(() => {
    messageElement.textContent = '';
    messageElement.className = 'pharmacy-inventory__form-message';
  }, 3000);
}

import { Medicine } from './Medicine.js';
import { selectors } from './domSelectors.js';

let editingId = null;

export function setupFormListeners(inventory) {
  selectors.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = selectors.nameInput.value.trim();
    const manufacturer = selectors.manufacturerInput.value.trim();
    const expiration = selectors.expirationInput.value;
    const quantity = selectors.quantityInput.value;

    if (!name || !manufacturer || !expiration || !quantity) {
      showMessage('All fields are required.', 'error');
      return;
    }

    if (editingId) {
      // Edit mode: update existing item
      inventory.editMedicine(editingId, {
        name,
        manufacturer,
        expirationDate: new Date(expiration).toISOString(),
        quantity,
      });
      editingId = null;
      showMessage('Medicine updated successfully!');
    } else {
      const newMed = new Medicine(name, manufacturer, expiration, quantity);
      inventory.addMedicine(newMed);
      showMessage('Medicine added successfully!');
    }

    selectors.form.reset();
  });

  document
    .querySelector(selectors.tableBodySelector)
    .addEventListener('click', (e) => {
      const id = e.target.dataset.id;

      if (e.target.classList.contains('pharmacy-inventory__button-delete')) {
        inventory.deleteMedicine(id);
        showMessage('Medicine deleted successfully!');
      }

      if (e.target.classList.contains('pharmacy-inventory__button-edit')) {
        const med = inventory.medicines.find((m) => m.id === id);
        if (med) {
          selectors.nameInput.value = med.name;
          selectors.manufacturerInput.value = med.manufacturer;
          selectors.expirationInput.value = med.expirationDate.split('T')[0];
          selectors.quantityInput.value = med.quantity;
          editingId = id;
        }
      }
    });
}
