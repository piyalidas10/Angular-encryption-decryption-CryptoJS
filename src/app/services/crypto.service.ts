import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class CryptoService {
    // Define a secret key for encryption/decryption
  private secretKey = '1!2@3#4$';  // **Important: Use a secure method to manage this key in production**

  encryptPayload(data: unknown): string {
    const jsonData = JSON.stringify(data);
    return CryptoJS.AES.encrypt(jsonData, this.secretKey).toString();
  }

  decryptPayload(ciphertext: string): unknown {
    const bytes = CryptoJS.AES.decrypt(ciphertext, this.secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    try {
      return JSON.parse(decrypted);
    } catch (e) {
      return null;
    }
  }
}
