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

# PhishBuster: Problem Statement & Objectives

> **The Escalation of AI-Driven Phishing Attacks:** Phishing remains the leading vector for cyberattacks, accounting for over **80%** of reported security incidents.


## ⚠️ The Problem Landscape

The current digital environment faces four critical challenges that render traditional security measures insufficient:

| Challenge | Description | Impact |
| :--- | :--- | :--- |
| **Cyber Threat Proliferation** | Integration of Generative AI allows for grammatically perfect, personalized phishing links at scale. | **"Zero-Day" links** bypass standard filters and global blacklists. |
| **The "Black Box" Limitation** | Existing tools provide binary (block/allow) responses without context. | Users bypass protocols due to a lack of **Explainable Security**. |
| **Technical Complexity** | Analysis tools (WHOIS, entropy checks) are designed for CLI/Cyber pros. | Average users lack a **centralized, intuitive interface** for verification. |
| **False Sense of Security** | Static measures struggle with Punycode attacks and multi-stage redirects. | Users cannot gauge risk levels without **quantitative assessment**. |


## 🔍 Detailed Analysis

### 1. Zero-Day Vulnerabilities
Traditional email filters are reactive. Because GenAI can spin up unique malicious links instantly, they do not appear on blacklists, leaving a massive gap in real-time protection.

### 2. The Need for Explainable Security
When a user is denied access to a link without an explanation, they often perceive the security tool as a hurdle rather than a help. PhishBuster aims to move away from the "Black Box" and toward a model that educates the user.

### 3. Combatting Sophisticated Obfuscation
Attackers use dynamic URL shortening and **Punycode attacks** (e.g., `googIe.com` vs `google.com`). Without a scorecard to measure these nuances, users are prone to poor decision-making.


## 🎯 The Objective

The goal of **PhishBuster** is to bridge the gap between complex security analysis and everyday usability. 

* **Transition:** Move from simple detection to **comprehensive risk quantification**.
* **The Scorecard:** Provide a **0-100 safety score** backed by transparent reasoning.
* **Empowerment:** Transform a passive user into an **informed gatekeeper** of their own digital security via an AI-enhanced GUI.