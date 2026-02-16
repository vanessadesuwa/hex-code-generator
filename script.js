const container = document.getElementById("colorDisplay");
const generateBtn = document.getElementById("generateBtn");

function generateRandomNumber(limit) {
  return Math.floor(Math.random() * limit);
}

function hslToHex(h, s, l) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function getRelativeLuminance(r, g, b) {
  const rs = r / 255;
  const gs = g / 255;
  const bs = b / 255;

  const R = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4);
  const G = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4);
  const B = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function getContrastColor(hex) {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  const luminance = getRelativeLuminance(r, g, b);
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

function generateAnalogousColors() {
  const baseHue = generateRandomNumber(360);
  const saturation = 70 + generateRandomNumber(20); // Keep saturation high for vibrancy
  const lightness = 40 + generateRandomNumber(40); // Avoid too dark/light

  const colors = [];
  for (let i = 0; i < 5; i++) {
    const hue = (baseHue + i * 30) % 360;
    colors.push(hslToHex(hue, saturation, lightness));
  }
  return colors;
}

function createColorBox(hex) {
  const box = document.createElement("div");
  box.classList.add("color-box");
  box.style.backgroundColor = hex;
  box.style.color = getContrastColor(hex);

  const hexText = document.createElement("h3");
  hexText.textContent = hex;
  box.appendChild(hexText);

  box.addEventListener("click", () => {
    navigator.clipboard.writeText(hex).then(() => {
      const originalText = hexText.textContent;
      hexText.textContent = "COPIED!";
      setTimeout(() => {
        hexText.textContent = originalText;
      }, 1000);
    });
  });

  return box;
}

function renderColors() {
  container.innerHTML = "";
  const colors = generateAnalogousColors();
  colors.forEach((hex) => {
    container.appendChild(createColorBox(hex));
  });
}

generateBtn.addEventListener("click", renderColors);

// Initial generation
renderColors();
