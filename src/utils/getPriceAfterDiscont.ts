const getPriceAfterDiscont = (price: number, discount: number): number => {
  const result = price - ((discount / 100) * price);
  return +result.toFixed(2);
};

export default getPriceAfterDiscont;
