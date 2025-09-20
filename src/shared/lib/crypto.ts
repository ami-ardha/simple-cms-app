import CryptoJS from 'crypto-js';

const SECRET_KEY = CryptoJS.enc.Utf8.parse(
  process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY || 'your-default-secret-key-32-char'
);
const IV_LENGTH = 16;

export const encrypt = (data: object): string => {
  const text = JSON.stringify(data);
  const iv = CryptoJS.lib.WordArray.random(IV_LENGTH);
  const encrypted = CryptoJS.AES.encrypt(text, SECRET_KEY, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const ivHex = iv.toString(CryptoJS.enc.Hex);
  const ciphertextHex = encrypted.ciphertext.toString(CryptoJS.enc.Hex);

  return ivHex + ciphertextHex;
};

export const decrypt = (ciphertext: string): object | null => {
  try {
    const ivHex = ciphertext.slice(0, IV_LENGTH * 2);
    const encryptedHex = ciphertext.slice(IV_LENGTH * 2);
    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const encrypted = CryptoJS.enc.Hex.parse(encryptedHex);

    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: encrypted,
    });

    const decrypted = CryptoJS.AES.decrypt(cipherParams, SECRET_KEY, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const originalText = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(originalText);
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
};
