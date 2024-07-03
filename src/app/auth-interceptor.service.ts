import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ik1UY3hPVGszTWpBd013PT0iLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJlOWJmY2NjZDg2YTI0YzJmYmY5ZTJmN2Q5Y2NiYzkzMyIsImRlc2lkIjoiIiwiZW1haWwiOiJsbGk3MUBzbGIuY29tIiwic3ViaWQiOiJVSjVISlFCdnViUFlwdFZMRHdlSmFxbE5ZS0lDZzgtcjhzbENsWGowZ0tnIiwib2lkIjoiZGZiYzk3MDQtOTM1Mi00YmMyLTllMmMtYmRhMmNkNDlhYWI0IiwidmVyIjoiMi4wIiwiaXNzIjoiaHR0cHM6Ly9jc2kuc2xiLmNvbS92MiIsInN1YiI6ImxsaTcxQHNsYi5jb20iLCJhdWQiOiJlOWJmY2NjZDg2YTI0YzJmYmY5ZTJmN2Q5Y2NiYzkzMyIsImV4cCI6MTcxOTk5NTM2MywiaWF0IjoxNzE5OTkxNzYzLCJqdGkiOiJhdC5kM2YzMTg0Y2VjY2Q0YTk1YjRmZmI4ODBjMDcxZDgzMyIsInRpZCI6IjQxZmYyNmRjLTI1MGYtNGIxMy04OTgxLTczOWJlODYxMGMyMSJ9.WnTCBz-ObmmVxrlP0PaU2nPTB4yoqCkAicWAq-6NrEu2p5f03LKZYcuONwTPN1rkkxBlwNN4Jyk2Q88Q0XtXvNG_zzimHK37_LllXcW0T9V0HBG-tilI0g-3jnP3LkltKwPqNQRn6ERJ_z2e90U-5SxC0Sqf4OVKUUD_Lu1Yx_9o5p55u0vc6_xBEKPvvRBCtulgHfNw401FUXKin0gAwlDmddAndDeWeNROuqIkGXYkWVVoiLNkjHr0IpIdqKtX4p0PnwX8llQvmfLvQj3drMxkHLNz8tKYmJ_J1RbUI5cIQVvC-FRuW8Zm4yNZwv-j1D1jdNP7Rn9mKL6yPsyGuA';
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