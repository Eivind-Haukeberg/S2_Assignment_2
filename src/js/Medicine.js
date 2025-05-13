import { v4 as uuidv4 } from 'uuid';

export class Medicine {
  constructor(name, manufacturer, expirationDate, quantity) {
    this.id = uuidv4();
    this.name = name;
    this.manufacturer = manufacturer;
    this.expirationDate = new Date(expirationDate).toISOString();
    this.quantity = quantity;
  }
}
