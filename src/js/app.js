import { Inventory } from './Inventory.js';
import { selectors } from './domSelectors.js';
import { setupFormListeners } from './formHandlers.js';

const inventory = new Inventory(selectors.tableBodySelector);
setupFormListeners(inventory);
