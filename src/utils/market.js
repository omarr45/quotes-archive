import { parseNearAmount } from 'near-api-js/lib/utils/format';
import { v4 as uuid4 } from 'uuid';

const GAS = 100000000000000;

export function createProduct(product) {
  product.id = uuid4();
  // convert the price to the correct format
  product.price = parseNearAmount(product.price + '');
  return window.contract.setProduct({ product });
}

export function getProducts() {
  return window.contract.getProducts();
}

export async function buyProduct({ id, price }) {
  await window.contract.buyProduct({ productId: id }, GAS, price);
}
