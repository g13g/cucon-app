import Rates from "./Rates";

export default interface APIResponse {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: Rates;
}
