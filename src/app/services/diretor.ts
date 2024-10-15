import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Diretor } from '../models/diretor';

@Injectable({
    providedIn: 'root'
})
export class DiretorService {
    private apiUrl = 'http://localhost:3000/diretor';

    constructor(private http: HttpClient) { }

    getDiretores(): Observable<Diretor[]> {
        return this.http.get<Diretor[]>(this.apiUrl);
    }

    getDiretorById(id: number): Observable<Diretor> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Diretor>(url);
    }

    criarDiretor(Diretor: Diretor): Observable<Diretor> {
        return this.http.post<Diretor>(this.apiUrl, Diretor);
    }

    atualizarDiretor(id: number, Diretor: Diretor): Observable<Diretor> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<Diretor>(url, Diretor);
    }

    deletarDiretor(id: number): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(url);
    }
}