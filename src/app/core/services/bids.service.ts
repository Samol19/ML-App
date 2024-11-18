import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { BidResponse } from '../../shared/models/bid-response.model';
import { BidRequest, BidUpdate } from '../../shared/models/bid-request.model';

@Injectable({
  providedIn: 'root'
})
export class BidsService {
  private baseURL = `${environment.baseURL}/bids`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getUserToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllBids(): Observable<BidResponse[]> {
    return this.http.get<BidResponse[]>(this.baseURL, { headers: this.getAuthHeaders() });
  }

  getBidById(id: number): Observable<BidResponse> {
    return this.http.get<BidResponse>(`${this.baseURL}/${id}`, { headers: this.getAuthHeaders() });
  }

  createBid(bid: BidRequest): Observable<BidResponse> {
    return this.http.post<BidResponse>(this.baseURL, bid, { headers: this.getAuthHeaders() });
  }

  updateBid(id: number, bid: BidUpdate): Observable<BidResponse> {
    return this.http.put<BidResponse>(`${this.baseURL}/${id}`, bid, { headers: this.getAuthHeaders() });
  }

  deleteBid(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`, { headers: this.getAuthHeaders() });
  }
}
