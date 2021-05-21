import { roundTo, convertFromEuro, convertToEuro } from "@/utils";
import MOCK_API_RESPONSE from "@/data/example-api-response.json";
import { APIResponse, Rates } from "@/models";

const data: APIResponse = MOCK_API_RESPONSE;
const rates: Rates = data.rates;

test("convert EURO amount into another currency", () => {
  expect(convertFromEuro(0, rates.GBP)).toBe(0);
  expect(convertFromEuro(10, rates.GBP)).toBe(8.61);
  expect(convertFromEuro(100, rates.USD)).toBe(122.2);
  expect(convertFromEuro(5.52, rates.USD)).toBe(6.75);
  expect(convertFromEuro(-12, rates.USD)).toBe(-14.66);
  expect(convertFromEuro(15000000, rates.USD)).toBe(18330120);
});

test("convert other currency amount into EURO amount", () => {
  expect(convertToEuro(0, rates.USD)).toBe(0);
  expect(convertToEuro(10, rates.GBP)).toBe(11.61);
  expect(convertToEuro(8.61, rates.GBP)).toBe(10);
  expect(convertToEuro(122.2, rates.USD)).toBe(100);
  expect(convertToEuro(6.75, rates.USD)).toBe(5.52);
  expect(convertToEuro(-14.66, rates.USD)).toBe(-12);
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
