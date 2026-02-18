// PhishBuster Heuristic Detection Engine

export interface ThreatFinding {
  id: string;
  label: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  score: number;
}

export interface AnalysisResult {
  url: string;
  riskScore: number;
  riskLevel: "critical" | "high" | "medium" | "low" | "safe";
  findings: ThreatFinding[];
  analyzedAt: Date;
}

const SUSPICIOUS_TLDS = [
  "xyz", "tk", "ml", "ga", "cf", "gq", "top", "buzz", "club",
  "work", "icu", "cam", "live", "rest", "fit", "surf", "click",
  "link", "win", "bid", "stream", "racing", "download", "loan",
];

const BRAND_NAMES = [
  "paypal", "paytm", "google", "facebook", "instagram", "apple",
  "microsoft", "amazon", "netflix", "whatsapp", "telegram", "twitter",
  "linkedin", "chase", "wellsfargo", "bankofamerica", "citibank",
  "coinbase", "binance", "metamask", "blockchain", "dropbox",
  "icloud", "outlook", "yahoo", "steam", "spotify", "uber",
];

const SUSPICIOUS_KEYWORDS = [
  "login", "secure", "verify", "update", "confirm", "account",
  "suspend", "unlock", "restore", "validate", "authenticate",
  "signin", "sign-in", "password", "credential", "billing",
  "wallet", "otp", "2fa", "token", "expire",
];

function extractUrlParts(url: string) {
  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    const hostParts = parsed.hostname.split(".");
    const tld = hostParts[hostParts.length - 1];
    const domain = hostParts.length >= 2 ? hostParts[hostParts.length - 2] : "";
    const subdomain = hostParts.length > 2 ? hostParts.slice(0, -2).join(".") : "";
    return { parsed, tld, domain, subdomain, hostParts };
  } catch {
    return null;
  }
}

export function analyzeUrl(url: string): AnalysisResult {
  const findings: ThreatFinding[] = [];
  const parts = extractUrlParts(url);

  if (!parts) {
    return {
      url,
      riskScore: 0,
      riskLevel: "safe",
      findings: [{ id: "invalid", label: "Invalid URL", description: "Could not parse the URL", severity: "info", score: 0 }],
      analyzedAt: new Date(),
    };
  }

  const { parsed, tld, domain, subdomain } = parts;

  // 1. IP address instead of domain
  if (/^\d+\.\d+\.\d+\.\d+$/.test(parsed.hostname)) {
    findings.push({
      id: "ip-address",
      label: "IP Address Used",
      description: "URL uses a raw IP address instead of a domain name — a common phishing tactic to evade detection.",
      severity: "critical",
      score: 30,
    });
  }

  // 2. Suspicious TLD
  if (SUSPICIOUS_TLDS.includes(tld.toLowerCase())) {
    findings.push({
      id: "suspicious-tld",
      label: `Suspicious TLD (.${tld})`,
      description: `The TLD ".${tld}" is frequently associated with phishing and spam domains.`,
      severity: "high",
      score: 20,
    });
  }

  // 3. Brand name misuse
  const fullUrl = url.toLowerCase();
  const detectedBrands = BRAND_NAMES.filter(
    (brand) => fullUrl.includes(brand) && domain.toLowerCase() !== brand
  );
  if (detectedBrands.length > 0) {
    findings.push({
      id: "brand-misuse",
      label: "Brand Impersonation",
      description: `Detected brand name(s) "${detectedBrands.join(", ")}" in the URL that don't match the actual domain — likely impersonation.`,
      severity: "critical",
      score: 25,
    });
  }

  // 4. Excessive URL length
  if (url.length > 100) {
    findings.push({
      id: "long-url",
      label: "Excessively Long URL",
      description: `URL is ${url.length} characters long. Phishing URLs often use long paths to obscure the real destination.`,
      severity: "medium",
      score: 15,
    });
  } else if (url.length > 75) {
    findings.push({
      id: "long-url",
      label: "Long URL",
      description: `URL is ${url.length} characters — longer than typical legitimate URLs.`,
      severity: "low",
      score: 8,
    });
  }

  // 5. Excessive hyphens
  const hyphenCount = (parsed.hostname.match(/-/g) || []).length;
  if (hyphenCount >= 3) {
    findings.push({
      id: "hyphens",
      label: "Excessive Hyphens",
      description: `Domain contains ${hyphenCount} hyphens — often used to mimic legitimate domains (e.g., "paypal-secure-login.com").`,
      severity: "high",
      score: 18,
    });
  } else if (hyphenCount >= 1) {
    findings.push({
      id: "hyphens",
      label: "Hyphens in Domain",
      description: `Domain contains ${hyphenCount} hyphen(s) — can be used to impersonate legitimate sites.`,
      severity: "low",
      score: 5,
    });
  }

  // 6. Suspicious keywords
  const foundKeywords = SUSPICIOUS_KEYWORDS.filter((kw) => fullUrl.includes(kw));
  if (foundKeywords.length >= 3) {
    findings.push({
      id: "keywords",
      label: "Multiple Suspicious Keywords",
      description: `Found ${foundKeywords.length} suspicious keywords: "${foundKeywords.join('", "')}". Phishing pages typically use urgency-driven language.`,
      severity: "high",
      score: 22,
    });
  } else if (foundKeywords.length > 0) {
    findings.push({
      id: "keywords",
      label: "Suspicious Keywords",
      description: `Found keyword(s): "${foundKeywords.join('", "')}".`,
      severity: "low",
      score: 8,
    });
  }

  // 7. @ symbol in URL
  if (url.includes("@")) {
    findings.push({
      id: "at-symbol",
      label: "@ Symbol in URL",
      description: 'The "@" symbol can be used to redirect the browser to a different host, hiding the true destination.',
      severity: "critical",
      score: 28,
    });
  }

  // 8. HTTP instead of HTTPS
  if (parsed.protocol === "http:") {
    findings.push({
      id: "no-https",
      label: "No HTTPS",
      description: "This URL uses HTTP (unencrypted). Legitimate login/payment pages always use HTTPS.",
      severity: "medium",
      score: 12,
    });
  }

  // 9. Subdomain abuse
  const subdomainDepth = subdomain ? subdomain.split(".").length : 0;
  if (subdomainDepth >= 3) {
    findings.push({
      id: "subdomain-abuse",
      label: "Deep Subdomain Nesting",
      description: `${subdomainDepth} levels of subdomains detected — often used to disguise the real domain.`,
      severity: "high",
      score: 18,
    });
  }

  // 10. Port number in URL
  if (parsed.port && parsed.port !== "443" && parsed.port !== "80") {
    findings.push({
      id: "unusual-port",
      label: `Unusual Port (:${parsed.port})`,
      description: "Non-standard port usage can indicate a rogue server.",
      severity: "medium",
      score: 12,
    });
  }

  // 11. Data URI or javascript protocol
  if (url.startsWith("data:") || url.startsWith("javascript:")) {
    findings.push({
      id: "dangerous-protocol",
      label: "Dangerous Protocol",
      description: "This URL uses a protocol that can execute malicious code.",
      severity: "critical",
      score: 35,
    });
  }

  // 12. Homograph attack detection
  if (/[^\x00-\x7F]/.test(parsed.hostname)) {
    findings.push({
      id: "homograph",
      label: "Homograph Attack Possible",
      description: "Domain contains non-ASCII characters that could visually impersonate a legitimate domain (IDN homograph attack).",
      severity: "critical",
      score: 30,
    });
  }

  // Calculate total score (cap at 100)
  const riskScore = Math.min(100, findings.reduce((sum, f) => sum + f.score, 0));

  let riskLevel: AnalysisResult["riskLevel"];
  if (riskScore >= 75) riskLevel = "critical";
  else if (riskScore >= 50) riskLevel = "high";
  else if (riskScore >= 30) riskLevel = "medium";
  else if (riskScore >= 10) riskLevel = "low";
  else riskLevel = "safe";

  // Add safe finding if nothing found
  if (findings.length === 0) {
    findings.push({
      id: "clean",
      label: "No Threats Detected",
      description: "No heuristic indicators of phishing were found. This does not guarantee safety — always exercise caution.",
      severity: "info",
      score: 0,
    });
  }

  // Sort by severity
  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3, info: 4 };
  findings.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  return { url, riskScore, riskLevel, findings, analyzedAt: new Date() };
}
