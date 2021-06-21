import { ICar } from "./services/cars";

export function formatAmount(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

export function getFormattedSentence(car: ICar) {
  return `${car.year} ${car.make} ${car.model} with ${car.mileage} miles available for ${formatAmount(car.price_cents)} listed since ${new Date(car.created_at)}`;
}
