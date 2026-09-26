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
       // Real names do not contain numbers
       if (/\d/.test(lower)) return true;
    }

    // 4. Email check
    if (key === "email") {
       // Must have basic email structure
       if (!lower.includes("@") || !lower.includes(".")) return true;
    }

    // 5. Phone check
    if (key === "phone") {
       const digits = lower.replace(/\D/g, "");
       // Block the most common fake sequential numbers
       if (digits === "1234567890" || digits === "0987654321" || digits === "1234512345") return true;
    }
  }

  return false;
}
