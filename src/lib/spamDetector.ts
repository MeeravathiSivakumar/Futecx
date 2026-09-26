export function isSpam(fields: Record<string, string>): boolean {
  // A strict list of obvious dummy inputs
  const dummyWords = [
    "test", "dummy", "fake", "spam", "asdf", "qwerty", "zxcv", "abcd", "qwer"
  ];

  for (const [key, val] of Object.entries(fields)) {
    if (!val) continue;
    const lower = val.toLowerCase().trim();

    // 1. If any field contains dummy test words
    if (dummyWords.some(word => lower.includes(word))) return true;

    // 2. If any field has 5 repeating characters (e.g., "aaaaa", "11111")
    if (/(.)\1{4,}/.test(lower)) return true;

    // 3. Name check
    if (key === "name") {
       if (/\d/.test(lower)) return true;
    }

    // 4. Email check - STRICTER WRONG EMAIL DETECTION
    if (key === "email") {
       if (!lower.includes("@") || !lower.includes(".")) return true;

       const parts = lower.split("@");
       if (parts.length !== 2) return true;

       const prefix = parts[0];
       const domain = parts[1];

       // Block 1-letter prefixes (e.g., a@gmail.com)
       if (prefix.length < 2) return true;

       // Block all-number prefixes (e.g., 123456@gmail.com)
       if (/^\d+$/.test(prefix)) return true;

       // Block gibberish keyboard smashes in email (5 consonants in a row, e.g., hdfghd@gmail.com)
       if (/[bcdfghjklmnpqrstvwxz]{5,}/i.test(prefix)) return true;

       // Block common "Wrong Email" domain typos
       const typoDomains = ["gamil.com", "gmal.com", "gmail.co", "gmail.con", "yaho.com", "yahooo.com", "outlok.com"];
       if (typoDomains.includes(domain)) return true;
    }

    // 5. Phone check
    if (key === "phone") {
       const digits = lower.replace(/\D/g, "");
       if (digits === "1234567890" || digits === "0987654321" || digits === "1234512345") return true;
       // Any phone number less than 10 digits is fake
       if (digits.length < 10) return true;
    }
  }

  return false;
}
