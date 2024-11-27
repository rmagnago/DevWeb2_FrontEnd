import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Socio } from '../models/socio';

@Injectable({
    providedIn: 'root'
})
export class SocioService {
    private apiUrl = 'http://localhost:8080/api/socio';

    constructor(private http: HttpClient) { }

    getSocios(): Observable<Socio[]> {
        return this.http.get<Socio[]>(this.apiUrl);
    }

    getSocioById(id: string): Observable<Socio> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Socio>(url);
    }

    criarSocio(socio: Socio): Observable<Socio> {
        const url = `${this.apiUrl}/novo`;
        return this.http.post<Socio>(url, socio);
    }

    atualizarSocio(socio: Socio, id: string): Observable<Socio> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<Socio>(url, socio);
    }

    deletarSocio(id: string): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(url);
    }
}