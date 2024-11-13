import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { AuctionRequest } from "../../shared/models/auction-request.model";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuctionService {

    private baseURL = `${environment.baseURL}/auctions`;

    constructor(private http: HttpClient, private authService: AuthService) {}

    private getAuthHeaders(): HttpHeaders {
        const token = this.authService.isAuthenticated() ? this.authService.getUserToken() : '';
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }

    getAllAuctions(): Observable<any> {
        return this.http.get<any>(`${this.baseURL}/`, { headers: this.getAuthHeaders() });
    }

    getAuctionById(id: number): Observable<any> {
        return this.http.get<any>(`${this.baseURL}/${id}`, { headers: this.getAuthHeaders() });
    }

    createAuction(auction: AuctionRequest): Observable<any> {
        return this.http.post<any>(`${this.baseURL}/`, auction, { headers: this.getAuthHeaders() });
    }

    deleteAuction(id: number): Observable<any> {
        return this.http.delete<any>(`${this.baseURL}/${id}`, { headers: this.getAuthHeaders() });
    }
}
