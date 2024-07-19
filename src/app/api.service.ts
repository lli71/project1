import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

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
    const apiUrl = `https://api.evp.nimbus.slb-ds.com/api/api-gateway/v1/all-latest-tags/dco/${deviceId}`;
    const tagIds: { [key: string]: number } = {
      'LMV Close Valve Cmd': 268,
      'LMV EMG Shutdown': 269,
      'LMV Open Valve Cmd': 267,
      'WV Close Valve Cmd': 230,
      'WV EMG Shutdown': 160,
      'WV EMG Shutdown (All)': 122,
      'Actuator Position Setpoint': 371,
      'WV Open Valve Cmd': 135
    };
    const updatedTagNames = Object.keys(tagIds);
  
    return this.http.get<any>(apiUrl).pipe(
      map(response => response.deviceTagData.map((tag: any, index: number) => {
        const isUpdated = updatedTagNames.includes(tag.tagName);
        const tagId = tagIds[tag.tagName] || null;
  
        return {
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
          isUpdated: isUpdated,
          check: false,
          tagId: tagId
        };
      })),
      tap(data => console.log(data)) // Log each data entry
    );
  }
  setPointWrite(tagId: number, value: number): Observable<any> {
    const apiUrl = 'https://api.evp.nimbus.slb-ds.com/api/api-gateway-admin/v1/config-proxy/set-point-write';
    
    const requestBody = {
      gatewayDeviceId: "abj",
      groupId: "dco",
      setPointWrites: [
        {
          tagId: tagId,
          value: value
        }
      ]
    };

    return this.http.post(apiUrl, requestBody);
  }
  
}
