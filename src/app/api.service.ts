import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface MyData {
  checked: any;
  deviceName: string;
  deviceId: string;
  position: number;
  tagName: string;
  status: boolean;
  isUpdated: boolean;
  value: string;
  storageUnit: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {


 ;

  constructor(private http: HttpClient) { }

  getDeviceData(deviceId: string): Observable<MyData[]> {
 const apiUrl = `https://api.evp.nimbus.slb-ds.com/api/api-gateway/v1/all-latest-tags/dco/${deviceId}`
    return this.http.get<any>(apiUrl).pipe(
      map(response => response.deviceTagData.map((tag: any, index: number) => ({
        deviceName: '',
        deviceIdID: tag.context.deviceId,
        position: index + 1,
        tagName: tag.tagName,
        status: tag.quality === 'GOOD',
        value: tag.value.doubleValue !== undefined 
    ? (Number.isInteger(tag.value.doubleValue) 
        ? tag.value.doubleValue.toString() 
        : tag.value.doubleValue.toFixed(2).toString()) 
    : tag.value.stringValue,
        storageUnit: tag.storageUnit,
        isUpdated: false,
        check:false
      })))
    );
  }
}
