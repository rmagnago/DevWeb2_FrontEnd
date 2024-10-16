import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Classe } from '../models/classe';

@Injectable({
    providedIn: 'root'
})
export class ClasseService {
    private apiUrl = 'http://localhost:8080/api/classe';

    constructor(private http: HttpClient) { }

    getClasses(): Observable<Classe[]> {
        return this.http.get<Classe[]>(this.apiUrl);
    }

    getClasseById(id: string): Observable<Classe> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Classe>(url);
    }

    criarClasse(Classe: Classe): Observable<Classe> {
        const url = `${this.apiUrl}/novo`;
        return this.http.post<Classe>(url, Classe);
    }

    atualizarClasse(Classe: Classe, id: string): Observable<Classe> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<Classe>(url, Classe);
    }

    deletarClasse(id: string): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(url);
    }
}