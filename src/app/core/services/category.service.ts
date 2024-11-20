import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Category } from '../../shared/models/category-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.baseURL}/admin/categories`;

  constructor(private http: HttpClient, private storageService: StorageService) {}

  getCategories(): Observable<Category[]> {
    const token = this.storageService.getAuthData()?.access_token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Category[]>(this.apiUrl, { headers });
  }
}
