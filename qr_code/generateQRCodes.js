// generateQRCodes.js
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

(async () => {
  const outDir = path.resolve(__dirname, 'qrcodes');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
  for (let i = 1; i <= 6; i++) {
    const id = `project${i}`;
    const filePath = path.join(outDir, `${id}.png`);
    try {
      await QRCode.toFile(filePath, id, {
        errorCorrectionLevel: 'H',
        type: 'png',
        width: 500
      });
      console.log(`Generated ${id}.png`);
    } catch (err) {
      console.error(`Failed ${id}.png:`, err);
    }
  }
})();
