// decodeQRCodes.js
const fs   = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const {
  MultiFormatReader,
  BarcodeFormat,
  DecodeHintType,
  RGBLuminanceSource,
  BinaryBitmap,
  HybridBinarizer
} = require('@zxing/library');

(async () => {
  const dir   = path.resolve(__dirname, 'qrcodes');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
  const hints = new Map([[DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.QR_CODE]]]);
  const reader = new MultiFormatReader();
  reader.setHints(hints);

  for (const file of files) {
    try {
      const buffer    = fs.readFileSync(path.join(dir, file));
      const png       = PNG.sync.read(buffer);
      const lums      = new Uint8ClampedArray(png.width * png.height);
      for (let i = 0; i < lums.length; i++) {
        lums[i] = png.data[i * 4];
      }
      const source    = new RGBLuminanceSource(lums, png.width, png.height);
      const binary    = new BinaryBitmap(new HybridBinarizer(source));
      const result    = reader.decode(binary);
      console.log(`${file} → ${result.getText()}`);
    } catch {
      console.log(`${file} → error decoding`);
    }
  }
})();
