import { Router } from '@angular/router';
import * as i0 from "@angular/core";
export declare class AuthService {
    router: Router;
    private sAuthTokenName;
    constructor(router: Router);
    isAuthenticated(): boolean;
    setSAuthKey(key: string): void;
    removeSAuthKey(): void;
    getSAuthKey(): string;
    setRefreshTokenKey(key: string): void;
    getRefreshTokenKey(): string;
    removeRefreshTokenKey(): void;
    setLoginAtKey(key: string): void;
    getLoginAtKey(): string;
    removeLoginAtKey(): void;
    parseJwt(token: any): {
        exp: number;
    };
    parseToken(token: any): any;
    isDemoUser(parsedToken: any): boolean;

}
