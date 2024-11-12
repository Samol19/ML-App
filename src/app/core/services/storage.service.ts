import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthResponse } from '../../shared/models/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
    private authkey = 'coleXpert_auth';
    
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    setAuthData(authData: AuthResponse): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(this.authkey, JSON.stringify(authData));
        }
    }

    getAuthData(): AuthResponse | null {
        if (isPlatformBrowser(this.platformId)) {
            const data = localStorage.getItem(this.authkey);
            return data ? JSON.parse(data) as AuthResponse : null;
        }
        return null;
    }

    clearAuthData(): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem(this.authkey);
        }
    }
}
