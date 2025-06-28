# QR Code Generator & Decoder

Gerencia geração e decodificação de QR Codes em Node.js.

## Estrutura

```
qr_code/
├── generateQRCodes.js    # gera 6 QR PNGs em ./qrcodes/
├── decodeQRCodes.js      # decodifica todos PNGs em ./qrcodes/
├── qrcodes/              # saída dos arquivos PNG
├── package.json          # dependências e scripts
└── teste_py.py           # exemplo Python (pyzbar) para decodificar QR
```

## Pré-requisitos

* Node.js ≥ 18
* Python 3 + `pyzbar`, `Pillow` (opcional)

## Instalação

```bash
npm install
```

## Uso

1. **Gerar QR Codes**

   ```bash
   node generateQRCodes.js
   ```

   → cria `qrcodes/project1.png` … `project6.png`

2. **Decodificar QR Codes**

   ```bash
   node decodeQRCodes.js
   ```

   → imprime conteúdo de cada QR

3. **(Opcional) Python**

   ```bash
   pip install pyzbar Pillow
   python teste_py.py qrcodes/project1.png
   ```

## Dependências principais

Instale todas as dependências com um único comando:

```bash
npm install qrcode @zxing/library pngjs jimp jsqr
```

##
