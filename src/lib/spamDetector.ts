export function isSpam(fields: Record<string, string>): boolean {
  const keyboardSmashes = ["asdf", "qwerty", "zxcv", "abcd", "qwer", "test"];
  const repeatedCharRegex = /(.)\1{4,}/; // 5 or more identical consecutive characters (e.g., aaaaa)

  for (const [key, val] of Object.entries(fields)) {
    if (!val) continue;
    const lower = val.toLowerCase().trim();

    // 1. Repeated characters (e.g., "hhhhh")
    if (repeatedCharRegex.test(lower)) return true;

    // 2. Exact match common dummy text
    if (keyboardSmashes.includes(lower)) return true;
    
    // 3. Substring match for obvious keyboard smashes
    if (lower.includes("asdfg") || lower.includes("qwert") || lower.includes("zxcvb") || lower.includes("abcde")) return true;

    // 4. Strings with no spaces that are abnormally long (gibberish)
    if (lower.length > 25 && !lower.includes(" ") && !lower.includes("@") && !lower.startsWith("http")) return true;

    // 5. Specific Field Checks
    if (key === "email") {
      // Fake email domains or simple prefixes
      if (lower.includes("test@") || lower.includes("dummy@") || lower.includes("@test.com") || lower.includes("@abcd.")) {
        return true;
      }
      // Extremely short prefix before @
      if (lower.split("@")[0].length < 2) return true;
    }

    if (key === "phone") {
      // 0000000000, 1234567890
      if (lower.includes("12345678") || lower.includes("01234567") || lower.includes("98765432")) return true;
      if (/(.)\1{6,}/.test(lower)) return true; // 7+ same digits
    }

    if (key === "name") {
      // Name contains numbers
      if (/\d/.test(lower)) return true;
      // Just a single letter
      if (lower.length < 2) return true;
    }
  }

  return false;
}
