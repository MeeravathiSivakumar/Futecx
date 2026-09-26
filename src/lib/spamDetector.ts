export function isSpam(fields: Record<string, string>): boolean {
  // Only the most obvious keyboard smashes
  const keyboardSmashes = [
    "asdf", "qwerty", "zxcv", "abcd", "qwer", "dummy"
  ];
  
  // 5 or more identical LETTERS in a row (e.g., "aaaaa"). 
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
      
      // If a name is 5 letters or longer and has NO vowels at all (like "jhygtfrdfgb") -> SPAM
      if (lower.length > 4 && !/[aeiouy]/.test(lower)) return true;
    }

    // 4. Email field specific checks
    if (key === "email") {
      // Very basic sanity check. Removed the "tnfutecx@gmail.com" block so admins can test safely.
      if (!lower.includes("@") || !lower.includes(".")) return true; 
    }

    // 5. Phone field specific checks
    if (key === "phone") {
      const digits = lower.replace(/\D/g, "");
      if (digits.length > 0 && digits.length < 9) return true; // Fake short numbers
      
      if (digits.includes("123456789") || digits.includes("012345678") || digits.includes("987654321")) return true;
      if (/([0-9])\1{6,}/.test(digits)) return true; // 7+ same digits (9999999xxxx)
    }
  }

  return false;
}
