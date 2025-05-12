import { Medicine } from './Medicine.js';
import { selectors } from './domSelectors.js';

export function setupFormListeners(inventory) {
  selectors.form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (
      !selectors.nameInput.value ||
      !selectors.manufacturerInput.value ||
      !selectors.expirationInput.value ||
      !selectors.quantityInput.value
    ) {
      alert('All fields are required.');
      return;
    }

    const newMed = new Medicine(
      selectors.nameInput.value,
      selectors.manufacturerInput.value,
      selectors.expirationInput.value,
      selectors.quantityInput.value
    );

    inventory.addMedicine(newMed);
    selectors.form.reset();
  });

  document
    .querySelector(selectors.tableBodySelector)
    .addEventListener('click', (e) => {
      const id = e.target.dataset.id;

      if (e.target.classList.contains('pharmacy-inventory__button-delete')) {
        inventory.deleteMedicine(id);
      }

      if (e.target.classList.contains('pharmacy-inventory__button-edit')) {
        const med = inventory.medicines.find((m) => m.id === id);
        selectors.nameInput.value = med.name;
        selectors.manufacturerInput.value = med.manufacturer;
        selectors.expirationInput.value = med.expirationDate.split('T')[0];
        selectors.quantityInput.value = med.quantity;
        inventory.deleteMedicine(id);
      }
    });
}
