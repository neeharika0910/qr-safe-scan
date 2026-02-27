🔒 QR SafeScan – QR Code Phishing Detector
A browser-based security tool that scans QR codes, extracts embedded URLs, and performs a multi-layer phishing risk analysis.

🌐 Live Demo:
https://neeharika0910.github.io/qr-safe-scan/

🛡️ Overview

QR SafeScan is a client-side phishing detection tool designed to analyze URLs embedded inside QR codes.

It demonstrates:

Practical threat-detection logic

Secure UI design principles

Heuristic risk scoring techniques

Accessibility-aware front-end development

This project simulates how a lightweight security utility could detect suspicious QR-based phishing attempts.

🔍 Features
📷 QR Code Scanning

Upload or drag-and-drop QR code images

Automatic decoding using jsQR

Instant URL extraction

Real-time result updates

🧠 Phishing Risk Analysis Engine

The tool evaluates URLs using multiple detection heuristics:

✅ HTTP vs HTTPS protocol validation

✅ Suspicious Top-Level Domains (TLDs)

✅ URL shorteners (bit.ly, tinyurl, etc.)

✅ IP-based URLs

✅ Excessive subdomains

✅ Punycode / homograph detection

✅ Sensitive keywords (login, verify, payment, reset)

✅ Urgency keywords (alert, suspended, warning)

✅ Encoded characters

✅ Suspicious file extensions (.exe, .apk, .zip, etc.)

✅ Non-standard ports

✅ Unicode anomalies

✅ Long or obfuscated query strings

🚦 Risk Levels

URLs are classified as:

🟢 LOW RISK

🟡 MEDIUM RISK

🔴 HIGH RISK

High-risk URLs are not made clickable to prevent accidental interaction.

🎨 User Interface

Professional enterprise-style design

Clean and structured layout

Drag-and-drop upload area

Accessible controls

Copy URL button

Downloadable risk report

Responsive layout

♿ Accessibility Enhancements

ARIA labels

Keyboard-accessible upload zone

Screen-reader friendly structure

Focus-visible states

Live region updates for scan results

Designed with inclusive usability in mind.

🧪 Built-In Test Suite

Developers can test the detection logic directly in the browser console:

runTestCases();

This validates the heuristic engine against predefined phishing patterns.

🧰 Tech Stack

HTML5

CSS3

JavaScript (ES6+)

jsQR (QR decoding library)

Fully client-side.
No frameworks.
No backend dependencies.

🚀 How to Use

Open the live demo

Upload or drag-and-drop a QR code image

View the decoded URL

Review the phishing risk analysis

Copy the URL or download the report

Clear the scan to test another QR code

🧩 Why This Project Matters

QR codes are increasingly used in:

Public spaces

Restaurants

Parking meters

Event check-ins

Delivery scams

Phishing campaigns

Attackers exploit QR codes because:

Users cannot visually inspect the embedded URL

QR codes bypass traditional email filters

Mobile devices hide full URLs by default

This project demonstrates real-world thinking in:

Threat detection

Secure interface design

Defensive coding

Risk scoring logic

Relevant for roles in:

SOC Analyst

Cyber Security Analyst

Threat Detection

IT Security Support

Security Engineering

⚙️ Run Locally
git clone https://github.com/neeharika0910/qr-safe-scan.git
cd qr-safe-scan
open index.html
No build tools required.

⚠️ Disclaimer
This tool performs heuristic analysis only.
It does not guarantee that a URL is safe.
Always verify suspicious links using trusted security tools.

👩‍💻 Author
Neeharika N
Aspiring Cyber-Security & Full-Stack Developer
Focused on detection logic, secure systems, and AI-powered applications.
