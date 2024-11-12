import { Injectable } from '@angular/core';
import { AuthResponse } from '../../shared/models/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
    private authkey = 'coleXpert_auth';

    constructor() {}
    
    setAuthData(authData: AuthResponse): void {
        localStorage.setItem(this.authkey, JSON.stringify(authData));
    }

    getAuthData(): AuthResponse | null {
        const data = localStorage.getItem(this.authkey);
        return data ? JSON.parse(data) as AuthResponse : null;
    }

    clearAuthData(): void {
        localStorage.removeItem(this.authkey);
    }
}