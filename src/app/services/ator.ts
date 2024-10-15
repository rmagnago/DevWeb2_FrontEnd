import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ator } from '../models/ator';

@Injectable({
    providedIn: 'root'
})
export class AtorService {
    private apiUrl = 'http://localhost:3000/api/ator';

    constructor(private http: HttpClient) { }

    getAtores(): Observable<Ator[]> {
        return this.http.get<Ator[]>(this.apiUrl);
    }

    getAtorById(id: string): Observable<Ator> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Ator>(url);
    }

    criarAtor(Ator: Ator): Observable<Ator> {
        return this.http.post<Ator>(this.apiUrl, Ator);
    }

    atualizarAtor(Ator: Ator, id: string): Observable<Ator> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<Ator>(url, Ator);
    }

    deletarAtor(id: string): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(url);
    }
}