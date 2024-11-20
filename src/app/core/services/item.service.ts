import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { ItemModel } from "../../shared/models/item-request.mode";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class ItemService {

    private baseURL = `${environment.baseURL}/items`;

    constructor(private http: HttpClient, private authService: AuthService) {}

    private getAuthHeaders(): HttpHeaders {
        const token = this.authService.isAuthenticated() ? this.authService.getUserToken() : '';
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }

    getAllItems(): Observable<any> {
        return this.http.get<any>(`${this.baseURL}/`, { headers: this.getAuthHeaders() });
    }

    getItemById(id: number): Observable<any> {
        return this.http.get<any>(`${this.baseURL}/${id}`, { headers: this.getAuthHeaders() });
    }

    getItemIdByName(name: string): Observable<any> {
        return this.http.get<{ id: number }>(`${this.baseURL}/name/${name}`, { headers: this.getAuthHeaders() });
    }

    createItem(item: ItemModel): Observable<any> {
        return this.http.post<any>(`${this.baseURL}/`, item, { headers: this.getAuthHeaders() });
    }


    deleteItem(id: number): Observable<any> {
        return this.http.delete<any>(`${this.baseURL}/${id}`, { headers: this.getAuthHeaders() });
    }
}
