export class Product {
  constructor(name, manufacturer) {
    this.name = name;
    this.manufacturer = manufacturer;
  }

  getSummary() {
    return `${this.name} by ${this.manufacturer}`;
  }
}
