import { inject, Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private readonly sanitizer: DomSanitizer = inject(DomSanitizer)

  _arrayBufferToBase64(buffer: ArrayBuffer){
    let binary = ''
    const bytes = new Uint8Array(buffer)
    const len = bytes.byteLength
    for(let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    
    return window.btoa(binary)
  }

  _base64StringToByteArray(url: string) {
    const bytes = new Uint8Array(atob(url.split(',')[1]).toString().split("").map(char => char.charCodeAt(0)))
    const file = new Blob([bytes], {type: 'application/pdf'})
    return URL.createObjectURL(file)
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }
}
