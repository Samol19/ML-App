import { inject, Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { StorageService } from "./storage.service";
import { AuthRequest } from "../../shared/models/auth-request.model";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { AuthResponse } from "../../shared/models/auth-response.model";
import { RegisterRequest } from "../../shared/models/register-request.model";
import { RegisterResponse } from "../../shared/models/register-response.model";
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private baseURL = `${environment.baseURL}/auth`;
    private http = inject(HttpClient);
    private storageService = inject(StorageService);

    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    login(AuthRequest: AuthRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.baseURL}/login`, AuthRequest)
            .pipe(
                tap(response => this.storageService.setAuthData(response))
            );
    }

    register(RegisterRequest: RegisterRequest): Observable<RegisterResponse> {
        return this.http.post<RegisterResponse>(`${this.baseURL}/register`, RegisterRequest);
    }

    logout() {
        this.storageService.clearAuthData();
    }

    isAuthenticated(): boolean {
        return this.storageService.getAuthData() !== null;
    }

    getUser(): Observable<AuthResponse | null> {
        if (isPlatformBrowser(this.platformId)) {
            const authData = this.storageService.getAuthData();
            return of(authData);  // Ahora devuelve un Observable si está en el navegador
        }
        return of(null);  // Si no está en el navegador, devuelve null
    }

    getUserRole(): string | null {
        if (isPlatformBrowser(this.platformId)) {
            const authData = this.storageService.getAuthData();
            return authData ? authData.user_role : null;
        }
        return null;
    }
}
