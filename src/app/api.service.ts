import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface MyData {
  checked: any;
  equipment: string;
  equipmentID: string;
  position: number;
  name: string;
  status: boolean;
  isUpdated: boolean;
  progressValue: string;
  unit: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://api.evp.nimbus.slb-ds.com/api/api-gateway/v1/all-latest-tags/dco/168b812aed404678bc888a873209f90f';

  constructor(private http: HttpClient) { }

  getDeviceData(): Observable<MyData[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.deviceTagData.map((tag: any, index: number) => ({
        equipment: 'Pressure Temperature Monitoring System',
        equipmentID: tag.context.deviceId,
        position: index + 1,
        name: tag.tagName,
        status: tag.quality === 'GOOD',
        progressValue: tag.value.doubleValue !== undefined 
    ? (Number.isInteger(tag.value.doubleValue) 
        ? tag.value.doubleValue.toString() 
        : tag.value.doubleValue.toFixed(2).toString()) 
    : tag.value.stringValue,
        unit: tag.storageUnit,
        isUpdated: false,
        check:false
      })))
    );
  }
}
