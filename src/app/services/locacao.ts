import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Locacao } from '../models/locacao';

@Injectable({
    providedIn: 'root'
})
export class LocacaoService {
    private apiUrl = 'http://localhost:8080/api/locacao';

    constructor(private http: HttpClient) { }

    getLocacoes(): Observable<Locacao[]> {
        return this.http.get<Locacao[]>(this.apiUrl);
    }

    getLocacaoById(id: string): Observable<Locacao> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Locacao>(url);
    }

    criarLocacao(locacao: Locacao): Observable<Locacao> {
        const url = `${this.apiUrl}/novo`;
        return this.http.post<Locacao>(url, locacao);
    }

    atualizarLocacao(locacao: Locacao, id: string): Observable<Locacao> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<Locacao>(url, locacao);
    }

    deletarLocacao(id: string): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(url);
    }
}