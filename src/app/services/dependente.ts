import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dependente } from '../models/dependente';

@Injectable({
    providedIn: 'root'
})
export class DependenteService {
    private apiUrl = 'http://localhost:8080/api/dependente';

    constructor(private http: HttpClient) { }

    getDependentes(): Observable<Dependente[]> {
        return this.http.get<Dependente[]>(this.apiUrl);
    }

    getDependenteById(id: string): Observable<Dependente> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Dependente>(url);
    }

    criarDependente(dependente: Dependente): Observable<Dependente> {
        const url = `${this.apiUrl}/novo`;
        return this.http.post<Dependente>(url, dependente);
    }

    atualizarDependente(dependente: Dependente, id: string): Observable<Dependente> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<Dependente>(url, dependente);
    }

    deletarDependente(id: string): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(url);
    }
}