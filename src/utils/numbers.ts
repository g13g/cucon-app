import { CURRENCY_TO_CODE } from "@/utils";
import { InputPair, Rates } from "@/models";

export const convertFromInputs = (
  source: InputPair,
  targetCurrencyName: string,
  rates: Rates
): number => {
  const sourceCurrencyCode = CURRENCY_TO_CODE[source.currency];
  const targetCurrencyCode = CURRENCY_TO_CODE[targetCurrencyName];
  const sourceRate = rates[sourceCurrencyCode];
  const targetRate = rates[targetCurrencyCode];
  const newTargetAmount = convertFromSourceToTarget(
    source.amount,
    sourceRate,
    targetRate
  );
  return roundTo(newTargetAmount, 2);
};

export const convertFromSourceToTarget = (
  amount: number,
  rateFrom: number,
  rateTo: number
): number => {
  const euroAmount = convertToEuro(amount, rateFrom);
  return convertFromEuro(euroAmount, rateTo);
};

export const convertFromEuro = (amount: number, rate: number): number => {
  return amount * rate;
};

export const convertToEuro = (amount: number, rate: number): number => {
  if (amount === 0) return amount;
  return amount / rate;
};

// source: https://www.delftstack.com/howto/javascript/javascript-round-to-2-decimal-places/#use-double-rounding-to-round-a-number-to2-decimal-places-in-javascript
export const roundTo = (num: number, places: number): number => {
  const factor = 10 ** places;
  const m = Number((Math.abs(num) * factor).toPrecision(15));
  return (Math.round(m) / factor) * Math.sign(num);
};
