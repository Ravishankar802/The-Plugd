import { Resend } from "resend";

export interface SendLoginEmailOptions {
  email: string;
  code: string;
}

export type EmailInterceptor = (data: { email: string; code: string }) => void;
let testInterceptor: EmailInterceptor | null = null;

export function setTestEmailInterceptor(fn: EmailInterceptor | null) {
  testInterceptor = fn;
}

/**
 * Sends a single-use 6-digit verification code for returning customer login.
 * If RESEND_API_KEY is not configured, logs an operational warning without exposing the code.
 */
export async function sendLoginEmail({
  email,
  code,
}: SendLoginEmailOptions): Promise<{ success: boolean; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();

  // Test environment hook for deterministic test verification without network dependency
  if (testInterceptor) {
    testInterceptor({ email: cleanEmail, code });
    return { success: true };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[EMAIL_SERVICE] RESEND_API_KEY is not configured. Verification code could not be dispatched.");
    return { success: false, error: "Email delivery service is not configured" };
  }

  try {
    const resend = new Resend(apiKey);
    const fromAddress = process.env.EMAIL_FROM || "The Dating Playbook <noreply@theplugd.com>";

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: cleanEmail,
      subject: `${code} is your verification code for The Dating Playbook`,
      text: `Hello,\n\nYour 6-digit sign-in verification code for The Dating Playbook is:\n\n${code}\n\nThis code will expire in 10 minutes and can only be used once.\n\nIf you did not request this code, you can safely ignore this email.\n\n— The Dating Playbook`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your Verification Code</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f6f4; margin: 0; padding: 40px 20px;">
            <div style="max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e7e5e4; padding: 36px 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
              <div style="margin-bottom: 24px;">
                <h1 style="color: #1c1917; font-size: 22px; font-weight: 700; margin: 0 0 6px 0; letter-spacing: -0.01em;">The Dating Playbook</h1>
                <p style="color: #78716c; font-size: 14px; margin: 0;">Sign-in verification code</p>
              </div>
              <p style="color: #44403c; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
                Enter this 6-digit code on the website to access your lifetime copy of The Dating Playbook:
              </p>
              <div style="text-align: center; margin: 28px 0;">
                <div style="display: inline-block; background-color: #faf8f5; border: 1px solid #e7e5e4; border-radius: 12px; padding: 18px 36px; font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #1c1917; font-family: monospace;">
                  ${code}
                </div>
              </div>
              <p style="color: #78716c; font-size: 13px; line-height: 1.5; margin: 0 0 20px 0; text-align: center;">
                This code will expire in <strong>10 minutes</strong> and can only be used once.<br>For your security, never share this code with anyone.
              </p>
              <hr style="border: none; border-top: 1px solid #f5f5f4; margin: 24px 0;">
              <p style="color: #a8a29e; font-size: 12px; margin: 0; line-height: 1.4;">
                If you did not request this code, no action is needed. You can safely ignore this email.
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("[EMAIL_DISPATCH_ERROR]", error.message || error);
      return { success: false, error: error.message || "Failed to dispatch email" };
    }

    return { success: true };
  } catch (err: any) {
    console.error("[EMAIL_DISPATCH_ERROR]", err?.message || err);
    return { success: false, error: err?.message || "Failed to dispatch email" };
  }
}
