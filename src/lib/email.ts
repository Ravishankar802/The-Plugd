import { Resend } from "resend";

export interface SendLoginEmailOptions {
  email: string;
  token: string;
}

export type EmailInterceptor = (data: { email: string; token: string; magicLink: string }) => void;
let testInterceptor: EmailInterceptor | null = null;

export function setTestEmailInterceptor(fn: EmailInterceptor | null) {
  testInterceptor = fn;
}

/**
 * Sends a single-use, time-limited magic link for returning customer login.
 * If RESEND_API_KEY is not configured, logs an operational warning without exposing the token.
 */
export async function sendLoginEmail({
  email,
  token,
}: SendLoginEmailOptions): Promise<{ success: boolean; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();
  const origin =
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.NODE_ENV === "production" ? "https://theplugd.com" : "http://localhost:3000");

  const magicLink = `${origin}/login/verify?token=${encodeURIComponent(token)}`;

  // Test environment hook for deterministic test verification without network dependency
  if (testInterceptor) {
    testInterceptor({ email: cleanEmail, token, magicLink });
    return { success: true };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[EMAIL_SERVICE] RESEND_API_KEY is not configured. Sign-in link could not be dispatched.");
    return { success: false, error: "Email delivery service is not configured" };
  }

  try {
    const resend = new Resend(apiKey);
    const fromAddress = process.env.EMAIL_FROM || "The Dating Playbook <noreply@theplugd.com>";

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: cleanEmail,
      subject: "Sign in to The Dating Playbook",
      text: `Hello,\n\nClick the link below to sign in to your lifetime copy of The Dating Playbook:\n\n${magicLink}\n\nThis link will expire in 15 minutes and can only be used once.\n\nIf you did not request this link, you can safely ignore this email.\n\n— The Dating Playbook`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Sign in to The Dating Playbook</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f6f4; margin: 0; padding: 40px 20px;">
            <div style="max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e7e5e4; padding: 36px 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
              <div style="margin-bottom: 24px;">
                <h1 style="color: #1c1917; font-size: 22px; font-weight: 700; margin: 0 0 8px 0; letter-spacing: -0.01em;">The Dating Playbook</h1>
                <p style="color: #78716c; font-size: 15px; margin: 0;">Your lifetime access sign-in link</p>
              </div>
              <p style="color: #44403c; font-size: 15px; line-height: 1.6; margin: 0 0 28px 0;">
                Click the button below to sign in to your account and continue your lessons. This link is single-use and will expire in 15 minutes.
              </p>
              <div style="text-align: center; margin: 0 0 28px 0;">
                <a href="${magicLink}" style="display: inline-block; background-color: #1c1917; color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 9999px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                  Sign in to Playbook &rarr;
                </a>
              </div>
              <p style="color: #a8a29e; font-size: 13px; line-height: 1.5; margin: 0 0 16px 0;">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <a href="${magicLink}" style="color: #f97316; word-break: break-all; text-decoration: none;">${magicLink}</a>
              </p>
              <hr style="border: none; border-top: 1px solid #f5f5f4; margin: 24px 0;">
              <p style="color: #a8a29e; font-size: 12px; margin: 0;">
                If you did not request this email, no action is needed. You can safely ignore it.
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
