import { roundTo, convertFromEuro, convertToEuro, convertFromInputs } from "@/utils";
import MOCK_API_RESPONSE from "@/data/example-api-response.json";
import { APIResponse, Rates, InputPair } from "@/models";
import { CURRENCIES } from "@/utils";

const data: APIResponse = MOCK_API_RESPONSE;
const rates: Rates = data.rates;

test("convert from source and target inputs", () => {
  let source: InputPair = { amount: 10, currency: CURRENCIES.USD };
  let targetCurrency: string = CURRENCIES.GBP;
  expect(convertFromInputs(source, targetCurrency, rates)).toBe(7.05);

  source = { amount: 100, currency: CURRENCIES.CAD };
  targetCurrency = CURRENCIES.AUD;
  expect(convertFromInputs(source, targetCurrency, rates)).toBe(106.71);

  source = { amount: 0, currency: CURRENCIES.CAD };
  targetCurrency = CURRENCIES.AUD;
  expect(convertFromInputs(source, targetCurrency, rates)).toBe(0);
});

test("convert EURO amount into another currency", () => {
  expect(convertFromEuro(0, rates.GBP)).toBe(0);
  expect(convertFromEuro(10, rates.GBP)).toBe(8.61332);
  expect(convertFromEuro(100, rates.USD)).toBe(122.2008);
  expect(convertFromEuro(5.52, rates.USD)).toBe(6.745484159999999);
  expect(convertFromEuro(-12, rates.USD)).toBe(-14.664096);
  expect(convertFromEuro(15000000, rates.USD)).toBe(18330120);
});

test("convert other currency amount into EURO amount", () => {
  expect(convertToEuro(0, rates.USD)).toBe(0);
  expect(convertToEuro(10, rates.GBP)).toBe(11.609925092763302);
  expect(convertToEuro(8.52, rates.GBP)).toBe(9.891656179034333);
  expect(convertToEuro(-14.66, rates.USD)).toBe(-11.996648139783046);
});

test("round numbers", () => {
  expect(roundTo(1.005, 2)).toBe(1.01);
  expect(roundTo(2.175, 2)).toBe(2.18);
  expect(roundTo(1.015, 2)).toBe(1.02);
  expect(roundTo(-1.005, 2)).toBe(-1.01);
  expect(roundTo(-2.175, 2)).toBe(-2.18);
  expect(roundTo(-1.015, 2)).toBe(-1.02);
  expect(roundTo(130000000.01572123, 2)).toBe(130000000.02);
});
