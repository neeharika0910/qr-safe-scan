const fileInput = document.getElementById("qr-input");
const decodedTextEl = document.getElementById("decoded-text");
const riskOutputEl = document.getElementById("risk-output");
const resultBox = document.getElementById("result");

const copyBtn = document.getElementById("copy-url-btn");
const downloadBtn = document.getElementById("download-report-btn");
const clearBtn = document.getElementById("clear-btn");
const dropZone = document.getElementById("drop-zone");

let lastAnalysis = null;


/* ============================= */
/*  FIX: MAKE DROP ZONE CLICKABLE */
/* ============================= */

dropZone.addEventListener("click", () => {
    fileInput.click();
});


/* ============================= */
/* CLEAR BUTTON */
/* ============================= */

clearBtn.addEventListener("click", () => {
    fileInput.value = "";
    decodedTextEl.textContent = "";
    riskOutputEl.textContent = "";
    resultBox.classList.add("hidden");
    lastAnalysis = null;
    copyBtn.disabled = true;
    downloadBtn.disabled = true;
});


/* ============================= */
/* COPY URL */
/* ============================= */

copyBtn.addEventListener("click", () => {
    if (!lastAnalysis) return;
    navigator.clipboard.writeText(lastAnalysis.url).catch(() => {});
});


/* ============================= */
/* DOWNLOAD REPORT */
/* ============================= */

downloadBtn.addEventListener("click", () => {
    if (!lastAnalysis) return;

    const { url, score, level, reasons } = lastAnalysis;

    let text = `QR Code Phishing Detector Report\n\n`;
    text += `Analysed URL: ${url}\n`;
    text += `Risk Level: ${level}\n`;
    text += `Score: ${score}\n\n`;

    if (reasons.length) {
        text += `Indicators:\n`;
        for (const r of reasons) text += `- ${r}\n`;
    } else {
        text += `No obvious phishing indicators detected.\n`;
    }

    text += `\nNote: This tool is heuristic and does not guarantee link safety.\n`;

    const blob = new Blob([text], { type: "text/plain" });
    const urlObj = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = urlObj;
    a.download = "qr_phishing_report.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(urlObj);
});


/* ============================= */
/* FILE INPUT CHANGE */
/* ============================= */

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;
    handleImageFile(file);
});


/* ============================= */
/* DRAG & DROP SUPPORT */
/* ============================= */

["dragenter", "dragover"].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropZone.classList.add("drag-over");
    });
});

["dragleave", "drop"].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropZone.classList.remove("drag-over");
    });
});

dropZone.addEventListener("drop", (e) => {
    const files = e.dataTransfer.files;
    if (!files || !files.length) return;
    const file = files[0];
    if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
    }
    handleImageFile(file);
});


/* ============================= */
/* HANDLE IMAGE */
/* ============================= */

function handleImageFile(file) {
    decodedTextEl.textContent = "Decoding QR code...";
    riskOutputEl.textContent = "";
    resultBox.classList.remove("hidden");

    copyBtn.disabled = true;
    downloadBtn.disabled = true;
    lastAnalysis = null;

    const reader = new FileReader();
    reader.onload = function () {
        const img = new Image();
        img.onload = function () {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, canvas.width, canvas.height);

            if (code) {
                const decoded = code.data.trim();
                decodedTextEl.textContent = decoded;

                if (isUrl(decoded)) {
                    const analysis = analyseUrlRisk(decoded);
                    lastAnalysis = analysis;
                    riskOutputEl.innerHTML = formatRiskAnalysis(analysis);

                    copyBtn.disabled = false;
                    downloadBtn.disabled = false;
                } else {
                    riskOutputEl.textContent = "No URL detected in QR code.";
                }
            } else {
                decodedTextEl.textContent = "Unable to read QR code.";
            }
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
}


/* ============================= */
/* URL CHECK */
/* ============================= */

function isUrl(text) {
    try {
        new URL(text.startsWith("http") ? text : "https://" + text);
        return true;
    } catch {
        return false;
    }
}


/* ============================= */
/* SIMPLE RISK ANALYSIS */
/* ============================= */

function analyseUrlRisk(rawUrl) {
    const url = new URL(rawUrl.startsWith("http") ? rawUrl : "https://" + rawUrl);
    let score = 0;
    const reasons = [];

    if (url.protocol !== "https:") {
        score += 20;
        reasons.push("Uses HTTP instead of HTTPS.");
    }

    if (url.hostname.includes("bit.ly")) {
        score += 30;
        reasons.push("URL shortener detected.");
    }

    if (/\d+\.\d+\.\d+\.\d+/.test(url.hostname)) {
        score += 30;
        reasons.push("IP address used instead of domain.");
    }

    let level = "LOW";
    if (score >= 50) level = "HIGH";
    else if (score >= 20) level = "MEDIUM";

    return { url: url.href, score, level, reasons };
}


/* ============================= */
/* FORMAT OUTPUT */
/* ============================= */

function formatRiskAnalysis(analysis) {
    const { url, score, level, reasons } = analysis;

    let badgeClass = "risk-low";
    if (level === "MEDIUM") badgeClass = "risk-medium";
    if (level === "HIGH") badgeClass = "risk-high";

    let html = `
        <div class="risk-badge ${badgeClass}">
            ${level} RISK
        </div>
        <p><strong>URL:</strong> ${url}</p>
        <p><strong>Score:</strong> ${score}</p>
    `;

    if (reasons.length) {
        html += "<ul>";
        reasons.forEach(r => {
            html += `<li>${r}</li>`;
        });
        html += "</ul>";
    }

    return html;
}