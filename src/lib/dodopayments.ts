import DodoPayments from "dodopayments";
import {
  getPlaybookDodoMapping,
  getPlaybookByDodoProductId,
  getTestModePlaybookMapping,
  TEST_MODE_PLAYBOOK_SLUG,
  TEST_MODE_PLAYBOOK_ID,
  DODO_PLAYBOOK_MAP,
  DODO_PRODUCT_TO_PLAYBOOK,
  DODO_ID_TO_PLAYBOOK,
  type DodoPlaybookMapping,
} from "@/lib/dodo-playbooks-map";

export function getDodoPaymentsMode(): "test_mode" | "live_mode" {
  const mode = process.env.DODO_PAYMENTS_MODE?.trim();
  if (mode !== "test_mode" && mode !== "live_mode") {
    throw new Error(
      `[DODO_CONFIG_ERROR] DODO_PAYMENTS_MODE must be explicitly set to either "test_mode" or "live_mode". Received: "${mode}"`
    );
  }
  return mode;
}

export function validateDodoConfiguration(): {
  mode: "test_mode" | "live_mode";
  apiKey: string;
  webhookKey: string;
} {
  const mode = getDodoPaymentsMode();
  const apiKey = (process.env.DODO_PAYMENTS_API_KEY || "").trim();
  const webhookKey = (process.env.DODO_PAYMENTS_WEBHOOK_KEY || "").trim();

  if (!apiKey || apiKey.length < 5) {
    throw new Error("[DODO_CONFIG_ERROR] DODO_PAYMENTS_API_KEY is missing or invalid.");
  }

  if (mode === "test_mode") {
    // In test mode, API key must strictly start with dodo_test_
    if (!apiKey.startsWith("dodo_test_")) {
      throw new Error(
        `[DODO_CONFIG_ERROR] Test mode requires a test API key starting with "dodo_test_". Found: "${apiKey.substring(0, 10)}..."`
      );
    }
    // Webhook key in test mode must start with whsec_test_ (if configured)
    if (webhookKey && !webhookKey.startsWith("whsec_test_")) {
      throw new Error(
        `[DODO_CONFIG_ERROR] Test mode requires a test webhook signing secret starting with "whsec_test_". Live secrets are rejected.`
      );
    }
  } else if (mode === "live_mode") {
    // In live mode, test API key is forbidden
    if (apiKey.startsWith("dodo_test_")) {
      throw new Error(
        `[DODO_CONFIG_ERROR] Live mode cannot use a test API key ("dodo_test_...").`
      );
    }
    // Webhook key in live mode cannot be a test secret
    if (webhookKey && webhookKey.startsWith("whsec_test_")) {
      throw new Error(
        `[DODO_CONFIG_ERROR] Live mode cannot use a test webhook secret ("whsec_test_...").`
      );
    }
  }

  return { mode, apiKey, webhookKey };
}

export function isDodoConfigured(): boolean {
  try {
    const { apiKey } = validateDodoConfiguration();
    return Boolean(apiKey && apiKey.length > 5);
  } catch {
    return false;
  }
}

const currentMode = process.env.DODO_PAYMENTS_MODE?.trim();
const apiKey = process.env.DODO_PAYMENTS_API_KEY || "";
const webhookKey = process.env.DODO_PAYMENTS_WEBHOOK_KEY || "";

export const dodoClient = new DodoPayments({
  bearerToken: apiKey || "unconfigured_token",
  webhookKey: webhookKey || undefined,
  environment: currentMode === "live_mode" ? "live_mode" : "test_mode",
});

export const DODO_GIFT_PRODUCT_ID = process.env.DODO_PAYMENTS_PRODUCT_ID || "";
export const DODO_DATING_PLAYBOOK_PRODUCT_ID = "pdt_0NpUSu9EmAAsRoz2l3ZNV";

export function getDodoCourseProductId(courseSlug?: string): string {
  const mode = process.env.DODO_PAYMENTS_MODE?.trim();

  if (mode === "test_mode") {
    if (
      courseSlug === TEST_MODE_PLAYBOOK_SLUG ||
      courseSlug === TEST_MODE_PLAYBOOK_ID
    ) {
      const mapping = getTestModePlaybookMapping();
      return mapping.dodoProductId;
    }
    // All other playbooks and legacy "men" are unavailable in test mode
    return "";
  }

  if (courseSlug) {
    const mapping = getPlaybookDodoMapping(courseSlug);
    if (mapping) {
      return mapping.dodoProductId;
    }
  }
  return (
    process.env.DODO_COURSE_PRODUCT_ID ||
    DODO_DATING_PLAYBOOK_PRODUCT_ID
  );
}

export {
  getPlaybookDodoMapping,
  getPlaybookByDodoProductId,
  getTestModePlaybookMapping,
  TEST_MODE_PLAYBOOK_SLUG,
  TEST_MODE_PLAYBOOK_ID,
  DODO_PLAYBOOK_MAP,
  DODO_PRODUCT_TO_PLAYBOOK,
  DODO_ID_TO_PLAYBOOK,
  type DodoPlaybookMapping,
};
