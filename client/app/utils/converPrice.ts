export const converPrice = (price: number) => {
    const dolar = price / 100
    return dolar.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}