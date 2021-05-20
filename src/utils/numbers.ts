export const convertAmount = (amount: number, rate: number): number => {
  const converted = amount * rate;
  return roundTo(converted, 2);
};

// source: https://www.delftstack.com/howto/javascript/javascript-round-to-2-decimal-places/#use-double-rounding-to-round-a-number-to2-decimal-places-in-javascript
export const roundTo = (num: number, places: number): number => {
  const factor = 10 ** places;
  const m = Number((Math.abs(num) * factor).toPrecision(15));
  return (Math.round(m) / factor) * Math.sign(num);
};
