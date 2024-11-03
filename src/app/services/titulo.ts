import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Titulo } from '../models/titulo';

@Injectable({
    providedIn: 'root'
})
export class TituloService {
    private apiUrl = 'http://localhost:8080/api/titulo';

    constructor(private http: HttpClient) { }

    getTitulos(): Observable<Titulo[]> {
        return this.http.get<Titulo[]>(this.apiUrl);
    }

    getTituloById(id: string): Observable<Titulo> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Titulo>(url);
    }

    criarTitulo(Titulo: Titulo): Observable<Titulo> {
        const url = `${this.apiUrl}/novo`;
        return this.http.post<Titulo>(url, Titulo);
    }

    atualizarTitulo(Titulo: Titulo, id: string): Observable<Titulo> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<Titulo>(url, Titulo);
    }

    deletarTitulo(id: string): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(url);
    }
}