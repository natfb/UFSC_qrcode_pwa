from pyzbar.pyzbar import decode
from PIL import Image
import sys

def decode_qr(path):
    img = Image.open(path)
    qr = decode(img)
    return qr[0].data.decode('utf-8') if qr else None

if __name__=='__main__':
    if len(sys.argv)<2:
        print(f"Uso: python {sys.argv[0]} caminho/para/qr.png")
        sys.exit(1)
    resultado = decode_qr(sys.argv[1])
    print(resultado or "QR não detectado")
