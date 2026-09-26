import dns from 'dns';
import { promisify } from 'util';

const resolveMx = promisify(dns.resolveMx);

export interface VerificationResult {
  status: 'deliverable' | 'undeliverable' | 'invalid' | 'disposable' | 'risky' | 'unknown';
  reason: string;
}

export async function verifyEmailBackend(email: string): Promise<VerificationResult> {
  if (!email || typeof email !== 'string') {
    return { status: 'invalid', reason: 'Email is empty or invalid format' };
  }

  const emailLower = email.toLowerCase().trim();

  // 1. Syntax Check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailLower)) {
    return { status: 'invalid', reason: 'Invalid email syntax' };
  }

  const parts = emailLower.split('@');
  const prefix = parts[0];
  const domain = parts[1];

  if (prefix.length < 2) {
    return { status: 'invalid', reason: 'Email prefix too short' };
  }

  if (/^\d+$/.test(prefix)) {
    return { status: 'risky', reason: 'Email prefix consists only of numbers' };
  }

  // 2. Check Disposable Domains via Free Open API (Kickbox)
  try {
    const disposableRes = await fetch(`https://open.kickbox.com/v1/disposable/${domain}`, { 
      method: 'GET',
      next: { revalidate: 3600 } // Cache for 1 hour to prevent rate limits
    });
    if (disposableRes.ok) {
      const data = await disposableRes.json();
      if (data.disposable) {
        return { status: 'disposable', reason: 'Domain is a known disposable email provider' };
      }
    }
  } catch (error) {
    // If the API fails, we just continue to MX checking
    console.warn("Disposable check API failed:", error);
  }

  // 3. DNS/MX Record Check (Server-side validation)
  try {
    const mxRecords = await resolveMx(domain);
    if (!mxRecords || mxRecords.length === 0) {
      return { status: 'undeliverable', reason: 'Domain does not have valid MX records (cannot receive mail)' };
    }
  } catch (error: any) {
    if (error.code === 'ENOTFOUND' || error.code === 'ENODATA') {
      return { status: 'undeliverable', reason: 'Domain does not exist or has no mail servers configured' };
    }
    // If DNS timeout or other error, we don't block the user, we mark as unknown
    return { status: 'unknown', reason: `DNS lookup failed: ${error.code || 'Timeout'}` };
  }

  // 4. Paid Provider Check (Fallback placeholder)
  // If user configures an API key in the future, we can call it here.
  const apiKey = process.env.EMAIL_VERIFICATION_API_KEY;
  if (apiKey) {
    try {
      const apiRes = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${emailLower}`);
      if (apiRes.ok) {
        const data = await apiRes.json();
        if (data.deliverability === 'UNDELIVERABLE') {
          return { status: 'undeliverable', reason: 'Verification API flagged as undeliverable' };
        }
      }
    } catch (error) {
      console.warn("External verification API failed", error);
    }
  }

  // If everything passes, we assume it's deliverable (or at least valid domain/syntax)
  return { status: 'deliverable', reason: 'Passed syntax, MX, and disposable checks' };
}
