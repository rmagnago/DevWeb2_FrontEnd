import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ator } from '../models/ator';

@Injectable({
    providedIn: 'root'
})
export class AtorService {
    private apiUrl = 'http://localhost:3000/ator';

    constructor(private http: HttpClient) { }

    getAtores(): Observable<Ator[]> {
        return this.http.get<Ator[]>(this.apiUrl);
    }

    getAtorById(id: number): Observable<Ator> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Ator>(url);
    }

    criarAtor(ator: Ator): Observable<Ator> {
        return this.http.post<Ator>(this.apiUrl, ator);
    }

    atualizarAtor(id: number, ator: Ator): Observable<Ator> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<Ator>(url, ator);
    }

    deletarAtor(id: number): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(url);
    }
}