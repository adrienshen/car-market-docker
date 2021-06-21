import { formatAmount, getFormattedSentence } from "./helpers";

test('formatAmount formats price_cents to readable format', () => {
    const result = formatAmount(999);
    expect(result).toBe('$9.99');

    const result2 = formatAmount(0);
    expect(result2).toBe('$0.00');

    const result3 = formatAmount(2899000);
    expect(result3).toBe('$28,990.00');
});

test('getFormattedSentence gets the correct formatted sentence given ICar', () => {
    const car = {
        "id": "fWI37la",
        "make": "Toyota",
        "model": "Camry",
        "package": "SE",
        "color": "White",
        "year": 2019,
        "category": "Sedan",
        "mileage": 3999,
        "price_cents": 2899000,
        "created_at": "2021-06-20T18:58:46.170Z",
        "updated_at": "2021-06-20T18:58:46.170Z"
    };
    const result = getFormattedSentence(car);
    console.log('result: ', result);
    expect(result).toBe('2019 Toyota Camry with 3999 miles available for $28,990.00 listed since Sun Jun 20 2021 13:58:46 GMT-0500 (Central Daylight Time)');
})
