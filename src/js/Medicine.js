export class Medicine {
  constructor(name, manufacturer, expirationDate, quantity) {
    this.id = 'MED-' + Date.now();
    this.name = name;
    this.manufacturer = manufacturer;
    this.expirationDate = new Date(expirationDate).toISOString();
    this.quantity = quantity;
  }
}
