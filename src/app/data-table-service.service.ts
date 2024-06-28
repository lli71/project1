import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTableServiceService {

  private apiUrl = '/api/api-gateway/v1/history-tags';

  constructor(private http: HttpClient) {}

  getData(tagName: string, startTime: string, endTime: string): Observable<any> {
    const body = {
      context: {
        deviceId: '168b812aed404678bc888a873209f90f',
        groupId: 'dco'
      },
      includeBadValues: false,
      pagination: {
        limit: '10000',
        offset: 0
      },
      tagNames: [tagName],
      timeRange: {
        endTime: endTime,
        startTime: startTime
      },
      unitSystem: 'string'
    };

    return this.http.post<any>(this.apiUrl, body);
  }
}