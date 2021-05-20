// Maps from currency code to name
export const CURRENCIES: { [key: string]: string } = {
  EUR: "Euro",
  GBP: "British Pound",
  HKD: "Hong Kong Dollar",
  IDR: "Indonesian Rupiah",
  ILS: "Israeli New Shekel",
  DKK: "Danish Krone",
  INR: "Indian Rupee",
  CHF: "Swiss Franc",
  MXN: "Mexican Peso",
  CZK: "Czech Koruna",
  SGD: "Singapore Dollar",
  THB: "Thai Baht",
  HRK: "Croatian Kuna",
  MYR: "Malaysian Ringgit",
  NOK: "Norwegian Krone",
  CNY: "Chinese Renminbi",
  BGN: "Bulgarian Lev",
  PHP: "Philippine Peso",
  SEK: "Swedish Krona",
  PLN: "Polish Zloty",
  ZAR: "South African Rand",
  CAD: "Canadian dollar",
  ISK: "Iceland Krona",
  BRL: "Brazilian Real",
  RON: "Romanian New Leu",
  NZD: "New Zealand Dollar",
  TRY: "Turkish New Lira",
  JPY: "Japanese Yen",
  RUB: "Russian Ruble",
  KRW: "Korean Won",
  USD: "U.S. dollar",
  HUF: "Hungarian Forint",
  AUD: "Australian dollar",
};

// Maps from name to currency code
export const CURRENCY_TO_CODE: { [key: string]: string } = {};
Object.entries(CURRENCIES).forEach((entry) => {
  const ticker = entry[0];
  const name = entry[1];
  CURRENCY_TO_CODE[name] = ticker;
});
