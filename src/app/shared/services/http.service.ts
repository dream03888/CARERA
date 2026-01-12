import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly http: HttpClient = inject(HttpClient)
  private readonly apiUrl = environment.socketEndpoint;
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json'}),
  
  };

  private apiEndpoint(endpoint: string): string {
    return `${this.apiUrl}${endpoint}`;
  }

  public endpointPath(route: string, params: string | number) {
    return `${route}/${params.toString()}`
  }

  async get<T>(endpoint: string): Promise<Observable<T>> {
    return this.http.get<T>(this.apiEndpoint(endpoint), this.httpOptions);
  }

  async post<T, T2>(endpoint: string, body: T): Promise<Observable<T2>> {
    return this.http.post<T2>(this.apiEndpoint(endpoint), body, this.httpOptions);
  }

  async put<T, T2>(endpoint: string, body: T): Promise<Observable<T2>> {
    return this.http.put<T2>(this.apiEndpoint(endpoint), body, this.httpOptions);
  }

  async delete<T, T2>(endpoint: string): Promise<Observable<T2>> {
    return this.http.delete<T2>(this.apiEndpoint(endpoint), this.httpOptions);
  }
}
