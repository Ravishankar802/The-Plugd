import DodoPayments from "dodopayments";

const apiKey = process.env.DODO_PAYMENTS_API_KEY || "";
const webhookKey = process.env.DODO_PAYMENTS_WEBHOOK_KEY || "";
const mode = process.env.DODO_PAYMENTS_MODE || (apiKey.startsWith("test_") ? "test_mode" : "live_mode");

export const dodoClient = new DodoPayments({
  bearerToken: apiKey || "test_token",
  webhookKey: webhookKey || undefined,
  environment: mode === "live_mode" ? "live_mode" : "test_mode",
});

export const DODO_GIFT_PRODUCT_ID = process.env.DODO_PAYMENTS_PRODUCT_ID || "";
export const DODO_DATING_PLAYBOOK_PRODUCT_ID = "pdt_0NpUSu9EmAAsRoz2l3ZNV";

export function getDodoCourseProductId(): string {
  return (
    process.env.DODO_COURSE_PRODUCT_ID ||
    process.env.DODO_PAYMENTS_PRODUCT_ID ||
    DODO_DATING_PLAYBOOK_PRODUCT_ID
  );
}

export function isDodoConfigured(): boolean {
  return Boolean(process.env.DODO_PAYMENTS_API_KEY && process.env.DODO_PAYMENTS_API_KEY.trim().length > 5);
}
