import { Rates } from "./Rates";

export interface APIResponse {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: Rates;
}
