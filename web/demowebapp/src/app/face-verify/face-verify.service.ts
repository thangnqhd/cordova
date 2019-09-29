import { Injectable } from '@angular/core';
import { ApiService } from '../services/api-service.service';
import { AppConfigService } from '../services/app-config-service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FaceVerifyService {
  constructor(private api: ApiService, private appConfig: AppConfigService) { }

  verify(param) {
    const headerOptions = {
      headers: new HttpHeaders({
        'Ocp-Apim-Subscription-Key': this.appConfig.key1,
        'Content-Type': 'application/json'
      })
    };
    return this.api.post(this.appConfig.cognitiveUrl + '/verify', param, headerOptions);
  }
  detect(base64Image) {
    const headerOpions = {
      headers: new HttpHeaders({
        'Ocp-Apim-Subscription-Key': this.appConfig.key1,
        'Content-Type': 'application/octet-stream'
      })
    };
    return this.api.post(this.appConfig.cognitiveUrl + '/detect', this.makeblob(base64Image), headerOpions);
  }

  private makeblob(dataURL) {
    const BASE64_MARKER = ';base64,';
    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }
}
