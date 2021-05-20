import { roundTo, convertAmount } from "@/utils/numbers";
import MOCK_API_RESPONSE from "@/data/example-api-response.json";
import APIResponse from "@/models/ApiResponse";
import Rates from "@/models/Rates";

const data: APIResponse = MOCK_API_RESPONSE;
const rates: Rates = data.rates;

test("convert amount using conversion rate", () => {
  expect(convertAmount(10, rates.GBP)).toBe(8.61);
  expect(convertAmount(100, rates.USD)).toBe(122.2);
  expect(convertAmount(5.52, rates.USD)).toBe(6.75);
  expect(convertAmount(-12, rates.USD)).toBe(-14.66);
})

test("round numbers", () => {
  expect(roundTo(1.005, 2)).toBe(1.01);
  expect(roundTo(2.175, 2)).toBe(2.18);
  expect(roundTo(1.015, 2)).toBe(1.02);
  expect(roundTo(-1.005, 2)).toBe(-1.01);
  expect(roundTo(-2.175, 2)).toBe(-2.18);
  expect(roundTo(-1.015, 2)).toBe(-1.02);
  expect(roundTo(130000000.01572123, 2)).toBe(130000000.02);
});
