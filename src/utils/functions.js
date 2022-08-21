import { parseNearAmount } from 'near-api-js/lib/utils/format';
import { v4 as uuid4 } from 'uuid';

const GAS = 100000000000000;

export function addQuote(quote) {
  quote.id = uuid4();
  // convert the price to the correct format
  quote.price = parseNearAmount(quote.price + '');
  return window.contract.addQuote({ quote });
}

export function getQuotes() {
  return window.contract.getQuotes();
}

export function getUserQuotes() {
  return window.contract.getUserQuotes();
}

export async function likeQuote({ id, price }) {
  await window.contract.likeQuote({ quoteId: id }, GAS, price);
}
