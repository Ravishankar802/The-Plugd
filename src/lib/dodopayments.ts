import DodoPayments from "dodopayments";

const apiKey = process.env.DODO_PAYMENTS_API_KEY || "";
const webhookKey = process.env.DODO_PAYMENTS_WEBHOOK_KEY || "";
const mode = process.env.DODO_PAYMENTS_MODE || (apiKey.startsWith("test_") ? "test_mode" : "live_mode");

export const dodoClient = new DodoPayments({
  bearerToken: apiKey || "test_token",
  webhookKey: webhookKey || undefined,
  environment: mode === "live_mode" ? "live_mode" : "test_mode",
});

export const DODO_PRODUCT_IDS = {
  MONTHLY: process.env.DODO_PAYMENTS_PRODUCT_ID_MONTHLY || "",
  YEARLY: process.env.DODO_PAYMENTS_PRODUCT_ID_YEARLY || "",
};

export function isDodoConfigured(): boolean {
  return Boolean(process.env.DODO_PAYMENTS_API_KEY && process.env.DODO_PAYMENTS_API_KEY.length > 5);
}
