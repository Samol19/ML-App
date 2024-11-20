import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { catchError, forkJoin, map, Observable, switchMap, throwError } from "rxjs";
import { AuctionRequest } from "../../shared/models/auction-request.model";
import { AuthService } from "./auth.service";
import { ItemService } from "./item.service";
import { AuctionResponse } from "../../shared/models/auction-response.model";

@Injectable({
    providedIn: 'root'
})
export class AuctionService {

    private baseURL = `${environment.baseURL}/auctions`;

    constructor(
        private http: HttpClient, 
        private authService: AuthService,
        private itemService: ItemService
    ) {}

    private getAuthHeaders(): HttpHeaders {
        const token = this.authService.isAuthenticated() ? this.authService.getUserToken() : '';
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }

    getAllAuctions(): Observable<AuctionResponse[]> {
        return this.http.get<AuctionResponse[]>(`${this.baseURL}/`, { headers: this.getAuthHeaders() })
            .pipe(
                switchMap(auctions => {
                    const auctionsWithItems = auctions.map(auction =>
                        this.itemService.getItemIdByName(auction.item_name).pipe(
                            switchMap(itemId => this.itemService.getItemById(itemId)),
                            map(item => ({ ...auction, item }))
                        )
                    );
                    return forkJoin(auctionsWithItems);
                }),
                catchError(this.handleError)
            );
    }

    getAuctionById(id?: number): Observable<AuctionResponse> {
        return this.http.get<AuctionResponse>(`${this.baseURL}/${id}`, { headers: this.getAuthHeaders() })
            .pipe(
                switchMap(auction => 
                    this.itemService.getItemIdByName(auction.item_name).pipe(
                        switchMap(itemId => this.itemService.getItemById(itemId)),
                        map(item => ({ ...auction, item }))
                    )
                ),
                catchError(this.handleError)
            );
    }

    createAuction(auction: AuctionRequest): Observable<AuctionResponse> {
        return this.http.post<AuctionResponse>(`${this.baseURL}/`, auction, { headers: this.getAuthHeaders() })
            .pipe(catchError(this.handleError));
    }

    deleteAuction(id: number): Observable<any> {
        return this.http.delete<any>(`${this.baseURL}/${id}`, { headers: this.getAuthHeaders() })
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        console.error('An error occurred:', error);
        if (error.error instanceof ErrorEvent) {
            console.error('Client-side error:', error.error.message);
        } else {
            console.error(`Backend returned code ${error.status}, body was:`, error.error);
        }
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}
