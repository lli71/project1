//Add the token here
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //token here
    const authToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ik1UY3lNVE0xTkRRd05RPT0iLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJlOWJmY2NjZDg2YTI0YzJmYmY5ZTJmN2Q5Y2NiYzkzMyIsImRlc2lkIjoiIiwiZW1haWwiOiJsbGk3MUBzbGIuY29tIiwic3ViaWQiOiJVSjVISlFCdnViUFlwdFZMRHdlSmFxbE5ZS0lDZzgtcjhzbENsWGowZ0tnIiwib2lkIjoiZGZiYzk3MDQtOTM1Mi00YmMyLTllMmMtYmRhMmNkNDlhYWI0IiwidmVyIjoiMi4wIiwiaXNzIjoiaHR0cHM6Ly9jc2kuc2xiLmNvbS92MiIsInN1YiI6ImxsaTcxQHNsYi5jb20iLCJhdWQiOiJlOWJmY2NjZDg2YTI0YzJmYmY5ZTJmN2Q5Y2NiYzkzMyIsImV4cCI6MTcyMTM3MDY2MSwiaWF0IjoxNzIxMzY3MDYxLCJqdGkiOiJhdC5lNmI5Zjk2YTRmMGU0YmZlOGUyYzBkNjVjYjU0ZGM3NCIsInRpZCI6IjQxZmYyNmRjLTI1MGYtNGIxMy04OTgxLTczOWJlODYxMGMyMSJ9.Dbohpv2azifg3xnYjAzc5m_uBtVvqmyGiqZoSc_FN2oFbCN0oW3fm1V8bp6ApDQCGv5B79x4cQ7t-oB5R3h4gqHCNBCVuNuE4Pnz77RC-RE8qP24GfaSl0xq6MdrfYOUyrA9rnGcFxElO01ODFUHt0_tbVphGpcx6Go6GB04ONjfii0cdDr4ZMr2l4zrkBa99bfdKYew_c6nwXtNn5FgAtOrfl0p_d1x9QEUSKtDxmnYVqOidD3qjELxG3-uo--XK2wrQL3hA6h-TqvSW2NLlwkhedYtrg9PiqrX_PSCt0P5VYXN09ubaJ4wmv0X44-WVdGtw5yz6yZNDxDPWlH_Cw';
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return next.handle(authReq);
  }
}
// {
//   "context": {
//     "deviceId": "168b812aed404678bc888a873209f90f",
//     "groupId": "dco"
//   },
//   "includeBadValues": true,
//   "pagination": {
//     "limit": 2,
//     "offset": 0
//   },
//   "tagNames": [
//     "Annulus Temperature"
//   ],
//   "timeRange": {
//     "endTime": "2024-06-26T23:38:24.695Z",
//     "startTime": "2024-06-22T23:34:01.150500431Z"
//   },
//   "unitSystem": "minute"
// }
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';
// import { Store } from '@ngrx/store';
// import { fromRoot } from './ngrx';
// import { LoginService } from './login.service';
// import * as i0 from "@angular/core";
// export declare class AuthHeaderInterceptor implements HttpInterceptor {
//     private authService;
//     private store;
//     private loginService;
//     private isRefreshing;
//     private refreshTokenSubject;
//     count: number;
//     loaderRequest: any[];
//     constructor(authService: AuthService, store: Store<fromRoot.State>, loginService: LoginService);
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
//     private handle401Error;
//     private addToken;
//     displayLoader(req: HttpRequest<any>): void;

// }
