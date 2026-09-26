export function isSpam(fields: Record<string, string>): boolean {
  const keyboardSmashes = [
    "asdf", "qwerty", "zxcv", "abcd", "test", "fake", "dummy", "spam"
  ];
  
  // 5 or more identical LETTERS in a row (e.g., "aaaaa"). 
  // We explicitly use [a-z] so we don't accidentally block "..." (three dots) which users commonly use.
  const repeatedCharRegex = /([a-z])\1{4,}/i; 

  for (const [key, val] of Object.entries(fields)) {
    if (!val) continue;
    const lower = val.toLowerCase().trim();

    // 1. Exact match or obvious substring smashes
    if (keyboardSmashes.some(smash => lower.includes(smash))) return true;

    // 2. Repeated characters anywhere (e.g., "hiiiii")
    if (repeatedCharRegex.test(lower)) return true;

    // 3. Name field specific checks
    if (key === "name") {
      if (/\d/.test(lower)) return true; // Names cannot contain numbers
    }

    // 4. Email field specific checks
    if (key === "email") {
      // User trying to use company emails or obviously fake dummy emails
      if (
        lower === "tnfutecx@gmail.com" || 
        lower === "admin@futecx.com" || 
        lower.startsWith("test@") || 
        lower.startsWith("dummy@") || 
        lower.startsWith("12345")
      ) {
        return true;
      }
      
      // Basic sanity check
      if (!lower.includes("@") || !lower.includes(".")) return true; 
    }

    // 5. Phone field specific checks
    if (key === "phone") {
      const digits = lower.replace(/\D/g, "");
      if (digits.length > 0 && digits.length < 10) return true; // Fake short numbers
      
      // Sequential dummy numbers (much stricter so we don't block real numbers that happen to have 1234)
      if (digits.includes("123456789") || digits.includes("012345678") || digits.includes("987654321")) return true;
      
      if (/([0-9])\1{6,}/.test(digits)) return true; // 7+ same digits (9999999xxxx)
    }
  }

  return false;
}
