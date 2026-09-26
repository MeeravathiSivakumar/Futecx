export function isSpam(fields: Record<string, string>): boolean {
  const keyboardSmashes = [
    "asdf", "qwerty", "zxcv", "abcd", "qwer", "test", "fake", "dummy", 
    "hjkl", "vbnm", "tyui", "ghjk", "qaz", "wsx", "edc", "spam"
  ];
  
  // 3 or more identical characters in a row (e.g., "aaa", "111")
  const repeatedCharRegex = /(.)\1{2,}/; 

  for (const [key, val] of Object.entries(fields)) {
    if (!val) continue;
    const lower = val.toLowerCase().trim();

    // 1. Exact match or obvious substring smashes
    if (keyboardSmashes.some(smash => lower.includes(smash))) return true;

    // 2. Repeated characters anywhere (e.g., "hiiii", "111")
    if (repeatedCharRegex.test(lower)) return true;

    // 3. Name field specific checks
    if (key === "name") {
      if (lower.length < 3) return true; // Names like 'A', 'Ab'
      if (/\d/.test(lower)) return true; // Names cannot contain numbers
      
      // If a name has NO vowels (a, e, i, o, u), it's almost certainly gibberish (e.g., "hyhfjh", "sdfgh")
      if (!/[aeiou]/.test(lower)) return true; 
    }

    // 4. Email field specific checks
    if (key === "email") {
      // User trying to use company emails or generic test emails
      if (lower === "tnfutecx@gmail.com" || lower === "admin@futecx.com" || lower === "meera@gmail.com") return true;
      
      const prefix = lower.split("@")[0];
      if (prefix.length < 4) return true; // e.g., 'abc@gmail.com' is spam
      if (/^\d+$/.test(prefix)) return true; // e.g., '123456@gmail.com'
      if (!/[aeiou]/.test(prefix)) return true; // e.g., 'hmm@gmail.com'
      if (!lower.includes(".")) return true; // missing domain dot
    }

    // 5. Phone field specific checks
    if (key === "phone") {
      const digits = lower.replace(/\D/g, "");
      if (digits.length > 0 && digits.length < 10) return true; // Fake 9-digit numbers
      // Sequential dummy numbers
      if (digits.includes("12345") || digits.includes("01234") || digits.includes("98765") || digits.includes("54321")) return true;
      if (/(.)\1{4,}/.test(digits)) return true; // 5+ same digits (99999xxxx)
    }

    // 6. Long text area fields (Motivation, Message, etc.)
    // If they write a 1-word answer for an essay question, it's spam
    if (["message", "vision", "whyFutecx", "motivation"].includes(key)) {
      if (lower.length < 20) return true; // Must write at least 20 chars
      // Very long strings without spaces are gibberish
      if (lower.length > 25 && !lower.includes(" ") && !lower.includes("@") && !lower.startsWith("http")) return true;
    }
  }

  return false;
}
