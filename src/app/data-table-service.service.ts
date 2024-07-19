import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTableServiceService {

  private apiUrl = '/api/api-gateway/v1/history-tags';

  constructor(private http: HttpClient) {}
  private deviceNames: { [key: string]: string } = {
    '168b812aed404678bc888a873209f90f': 'PTMS',
    '6593430baec64babbdc29c7a5f1b24fc': 'PTMVS',
    '5a751a0234d04511a307aa6b4b1f0848': 'Flowmeters',
    '0964976ce2a84ff78c6cb18fc881fd70': 'HA UMV',
    'bca428fb5428449ca75c7b6dc482a5a4': 'Electric Acutator',
    '9e863d9eeb5f4dc1b67093f23f97c800': 'Modum Flow',
    'a35a20a3f7304f90a33371302aea448c': 'Modum Chem',
    'd5aec4b0e39640beb4c1167e5b409a18': 'Annulus',
    'a53a4206d5294bf7b205311dcbcac9b5':'Modum Gas'
  };

  private getDeviceName(deviceId: string): string {
    return this.deviceNames[deviceId] || 'Unknown Device';
  }


  getTableData(deviceIds: string[]): Observable<any[]> {
    const requests = deviceIds.map(deviceId => {
      const url = `https://api.evp.nimbus.slb-ds.com/api/api-gateway/v1/all-latest-tags/dco/${deviceId}`;
      return this.http.get<any>(url).pipe(
        map(response => {
          if (response.deviceTagData && Array.isArray(response.deviceTagData)) {
            response.deviceTagData = response.deviceTagData.map((item: any) => ({
              ...item,
              deviceName: this.getDeviceName(deviceId),
              
            }));
          }
          return response;
        })
      );
    });

    // Combine multiple requests using forkJoin
    return forkJoin(requests);
  }

  getData(deviceName: string, deviceId: string, tagName: string, startTime: string, endTime: string): Observable<any> {
    
    if (deviceId === '168b812aed404678bc888a873209f90f') {
        deviceName = 'PTMS';
    } else if (deviceId === '6593430baec64babbdc29c7a5f1b24fc') {
        deviceName = 'PTMVS';
    } else if (deviceId === '5a751a0234d04511a307aa6b4b1f0848') {
        deviceName = 'Flowmeters';
    } else if (deviceId === '0964976ce2a84ff78c6cb18fc881fd70') {
        deviceName = 'HA UMV';
    } else if (deviceId === 'bca428fb5428449ca75c7b6dc482a5a4') {
        deviceName = 'Electric Acutator';
    } else if (deviceId === '9e863d9eeb5f4dc1b67093f23f97c800') {
        deviceName = 'Modum Flow';
    } else if (deviceId === 'a35a20a3f7304f90a33371302aea448c') {
        deviceName = 'Modum Chem';
    } else if (deviceId === 'd5aec4b0e39640beb4c1167e5b409a18') {
        deviceName = 'Annulus';
    }else if (deviceId === 'a53a4206d5294bf7b205311dcbcac9b5') {
      deviceName = 'Modum Gas';
  }
    
    else
    deviceName = '';
    const body = {
      context: {
        // deviceId: '168b812aed404678bc888a873209f90f',
        deviceId: deviceId,
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

    return this.http.post<any>(this.apiUrl, body).pipe(
      map(response => {
        
          // Add deviceName to each entry in deviceTagData
          response.deviceTagData.forEach((entry: { deviceName: string; }) => {
              entry.deviceName = deviceName;
          });
          return response;
      })
  );
  }
}
//tagId：371 
// 当tagName为LMV Close Valve Cmd 268，LMV EMG Shutdown 269，LMV Open Valve Cmd 267，WV Close Valve Cmd 230，WV EMG Shutdown 160，WV EMG Shutdown (All) 122，Actuator Position Setpoint 371，WV Open Valve Cmd 135