import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PredictRequest, PredictResponse } from '../models/predict.model';

@Injectable({
  providedIn: 'root'
})
export class PredictService {

  private apiUrl = 'https://3952-38-25-122-44.ngrok-free.app/predict';  // URL de la API de Flask

  constructor(private http: HttpClient) {}

  // Método para hacer la solicitud POST a la API de Flask
  predict(data: PredictRequest): Observable<PredictResponse> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<PredictResponse>(this.apiUrl, data, { headers });
  }
}
