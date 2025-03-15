export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'NGN'
})

export const discount = (oldPrice: number, price: number) => {
  return Math.round((oldPrice - price) * 100 / oldPrice)
}