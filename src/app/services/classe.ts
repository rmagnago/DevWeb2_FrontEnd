import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Classe } from '../models/classe';

@Injectable({
    providedIn: 'root'
})
export class ClasseService {
    private apiUrl = 'http://localhost:3000/classes';

    constructor(private http: HttpClient) { }

    getClassees(): Observable<Classe[]> {
        return this.http.get<Classe[]>(this.apiUrl);
    }

    getClasseById(id: number): Observable<Classe> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Classe>(url);
    }

    criarClasse(Classe: Classe): Observable<Classe> {
        return this.http.post<Classe>(this.apiUrl, Classe);
    }

    atualizarClasse(id: number, Classe: Classe): Observable<Classe> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<Classe>(url, Classe);
    }

    deletarClasse(id: number): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(url);
    }
}