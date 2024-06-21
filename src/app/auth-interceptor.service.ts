import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ik1UY3hPRGt6TlRJMU9BPT0iLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJlOWJmY2NjZDg2YTI0YzJmYmY5ZTJmN2Q5Y2NiYzkzMyIsImRlc2lkIjoiIiwiZW1haWwiOiJsbGk3MUBzbGIuY29tIiwic3ViaWQiOiJVSjVISlFCdnViUFlwdFZMRHdlSmFxbE5ZS0lDZzgtcjhzbENsWGowZ0tnIiwib2lkIjoiZGZiYzk3MDQtOTM1Mi00YmMyLTllMmMtYmRhMmNkNDlhYWI0IiwidmVyIjoiMi4wIiwiaXNzIjoiaHR0cHM6Ly9jc2kuc2xiLmNvbS92MiIsInN1YiI6ImxsaTcxQHNsYi5jb20iLCJhdWQiOiJlOWJmY2NjZDg2YTI0YzJmYmY5ZTJmN2Q5Y2NiYzkzMyIsImV4cCI6MTcxODk1MTI1MywiaWF0IjoxNzE4OTQ3NjUzLCJqdGkiOiJhdC44ZjU0NGU4ZmNkNzE0MmRkOGNiNzczNGVmMTcxODRmNCIsInRpZCI6IjQxZmYyNmRjLTI1MGYtNGIxMy04OTgxLTczOWJlODYxMGMyMSJ9.WyD7FlFvkt6oePuo8mV5N4Xrw4f0t9QmPki7HR-MmUHOEtD21qZBd0x16Ss7ivFfELf0wmRfhdHLWKfj5xSUhoMkAzeevHGQ43pjZt_cBxCRz8kU46XPnMaF3UPsMmI-WGu9PxNdOcrsG_saZDKsuQy8yiJAsqTtNUD4YJVaF5bzfsgPDgxiHksjSNfakaXAjyTOswIYdOZG4eH9zwixM-R2eNduP8yG_D705QDd70EF3qCrmJFI_TrIwp21Fq4bU83RU4F9rNp1t8PD8Nd4OV2FbJHjIbwRkgjoB2SZbF1eo1DdIBqmgrdlXmujz1zzLKJqxOPLhz1pVUdbfEqOYg';
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return next.handle(authReq);
  }
}