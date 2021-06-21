import { ICar } from "./services/cars";

export function formatAmount(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getFormattedSentence(car: ICar): string {
  return `${car.year} ${car.make} ${car.model} with ${car.mileage} miles available for ${formatAmount(car.price_cents)} listed since ${new Date(car.created_at)}`;
}

export function getMultipleCarsFormattedSentence(len: number): string {
  return len
    ? `There were ${len} founded with your filters`
    : 'There were no cars found with your search filters. Try some different options'
}
