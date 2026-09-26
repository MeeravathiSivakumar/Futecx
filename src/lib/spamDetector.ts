export function isSpam(fields: Record<string, string>): boolean {
  // Obvious keyboard smashes
  const keyboardSmashes = [
    "asdf", "qwerty", "zxcv", "abcd", "qwer", "dummy", "test", "fake", "spam"
  ];
  
  // 4 or more identical LETTERS in a row (e.g., "aaaa"). 
  const repeatedCharRegex = /([a-z])\1{3,}/i; 

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
      // If a name is 5 letters or longer and has NO vowels at all (like "jhygtfrdfgb") -> SPAM
      if (lower.length > 4 && !/[aeiouy]/.test(lower)) return true;
    }

    // 4. Email field deep verification
    if (key === "email") {
      if (!lower.includes("@") || !lower.includes(".")) return true;
      
      const parts = lower.split("@");
      if (parts.length !== 2) return true;
      
      const prefix = parts[0];
      const domain = parts[1];

      // Prefix rules (before the @)
      if (prefix.length < 3) return true; // Too short (e.g. ab@gmail.com)
      if (/^\d+$/.test(prefix)) return true; // Only numbers (e.g. 123456@gmail.com)
      if (prefix.length > 3 && !/[aeiouy]/.test(prefix)) return true; // No vowels (e.g. hjkl@gmail.com)

      // Domain rules (after the @)
      // Block fake domains by only allowing reputable email providers or your own domain
      const validDomains = [
        "gmail.com", "yahoo.com", "yahoo.in", "outlook.com", "hotmail.com", 
        "icloud.com", "futecx.com", "tnfutecx.com", "edu.in", "ac.in", "live.com"
      ];
      
      let isValidDomain = false;
      for (const valid of validDomains) {
        if (domain.endsWith(valid)) {
          isValidDomain = true;
          break;
        }
      }
      
      if (!isValidDomain) return true; // e.g. test@dummy.com -> SPAM
    }

    // 5. Phone field specific checks
    if (key === "phone") {
      const digits = lower.replace(/\D/g, "");
      if (digits.length > 0 && digits.length < 10) return true; // Fake short numbers
      
      if (digits.includes("12345678") || digits.includes("01234567") || digits.includes("98765432")) return true;
      if (/([0-9])\1{5,}/.test(digits)) return true; // 6+ same digits (999999xxxx)
    }
  }

  return false;
}
