# Project Title: PhishBuster - PhishBuster: An AI-Powered URL Analysis and Threat Quantification System

# PhishBuster

> **PhishBuster** is a GUI-based security application designed to bridge the gap in "zero-day" malicious link detection by utilizing **Large Language Models (LLMs)** and **heuristic analysis** to evaluate URLs and email links in real-time.

## 📄 Abstract
As phishing attacks become increasingly sophisticated, traditional blacklist-based detection methods often fail. PhishBuster performs a multi-layered inspection of input links, analyzing various technical markers to empower non-technical users against social engineering attacks.

## 🛠️ Multi-Layered Inspection
The system evaluates the legitimacy of a link by analyzing the following factors:

| Factor | Description |
| :--- | :--- |
| **Domain Age** | Evaluates the longevity and history of the domain. |
| **SSL Certification** | Verifies the presence and validity of security certificates. |
| **URL Entropy** | Measures the randomness of the URL to detect suspicious patterns. |
| **Obfuscation** | Identifies Punycode, character substitution, and masking techniques. |

## 📊 Dynamic Safety Scorecard
Unlike binary "safe or unsafe" tools, PhishBuster generates a risk assessment score ranging from **0 to 100**.

### Risk Factor Transparency
Every score includes a transparent breakdown of why a link was flagged, such as:
* **Mismatched Sender Identities:** Identifying discrepancies in email headers.
* **Suspicious Redirects:** Tracking hidden hops in the link path.


## 🎯 Impact
By combining **automated AI reasoning** with a user-centric interface, PhishBuster provides:
* **Informed Decision Making:** Users understand *why* a link is dangerous.
* **Reduced Success Rates:** Minimizes the effectiveness of social engineering.
* **Real-Time Protection:** Heuristic analysis happens instantly upon input.