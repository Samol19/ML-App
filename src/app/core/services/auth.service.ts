import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { StorageService } from "./storage.service";
import { AuthRequest } from "../../shared/models/auth-request.model";
import { Observable, tap } from "rxjs";
import { AuthResponse } from "../../shared/models/auth-response.model";
import { RegisterRequest } from "../../shared/models/register-request.model";
import { RegisterResponse } from "../../shared/models/register-response.model";


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private baseURL = `${environment.baseURL}/auth`;
    private http = inject(HttpClient);
    private storageService = inject(StorageService);

    constructor() { }

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

    getUser(): AuthResponse | null {
        const authData = this.storageService.getAuthData();
        return authData ? authData : null;
    }

    getUserRole(): string | null {
        const authData = this.storageService.getAuthData();
        return authData ? authData.user_role : null;
    }

}