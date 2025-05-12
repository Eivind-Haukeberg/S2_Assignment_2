export class Inventory {
  constructor(tableBodySelector) {
    this.medicines =
      JSON.parse(localStorage.getItem('pharmacy-inventory')) || [];
    this.tableBody = document.querySelector(tableBodySelector);
    this.display();
  }

  addMedicine(medicine) {
    this.medicines.push(medicine);
    this.save();
    this.display();
  }

  deleteMedicine(id) {
    this.medicines = this.medicines.filter((m) => m.id !== id);
    this.save();
    this.display();
  }

  editMedicine(id, updatedData) {
    const index = this.medicines.findIndex((m) => m.id === id);
    if (index !== -1) {
      this.medicines[index] = { ...this.medicines[index], ...updatedData };
      this.save();
      this.display();
    }
  }

  save() {
    localStorage.setItem('pharmacy-inventory', JSON.stringify(this.medicines));
  }

  display() {
    this.tableBody.innerHTML = '';

    this.medicines.forEach((med) => {
      const row = document.createElement('tr');

      const idCell = document.createElement('td');
      idCell.textContent = med.id;

      const nameCell = document.createElement('td');
      nameCell.textContent = med.name;

      const manufacturerCell = document.createElement('td');
      manufacturerCell.textContent = med.manufacturer;

      const expirationCell = document.createElement('td');
      expirationCell.textContent = med.expirationDate.split('T')[0];

      const quantityCell = document.createElement('td');
      quantityCell.textContent = med.quantity;

      const actionsCell = document.createElement('td');

      const editButton = document.createElement('button');
      editButton.className = 'pharmacy-inventory__button-edit';
      editButton.dataset.id = med.id;
      editButton.textContent = 'Edit';

      const deleteButton = document.createElement('button');
      deleteButton.className = 'pharmacy-inventory__button-delete';
      deleteButton.dataset.id = med.id;
      deleteButton.textContent = 'Delete';

      actionsCell.appendChild(editButton);
      actionsCell.appendChild(deleteButton);

      row.appendChild(idCell);
      row.appendChild(nameCell);
      row.appendChild(manufacturerCell);
      row.appendChild(expirationCell);
      row.appendChild(quantityCell);
      row.appendChild(actionsCell);

      this.tableBody.appendChild(row);
    });
  }
}
