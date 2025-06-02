import { v4 as uuidv4 } from 'uuid';

import { Product } from './Product.js';

export class Medicine extends Product {
  constructor(name, manufacturer, expirationDate, quantity) {
    super(name, manufacturer);
    this.id = uuidv4();
    this.expirationDate = new Date(expirationDate).toISOString();
    this.quantity = quantity;
  }
}
