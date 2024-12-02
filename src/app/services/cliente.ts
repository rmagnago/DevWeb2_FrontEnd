import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    private apiUrl = 'http://localhost:8080/api/cliente';

    constructor(private http: HttpClient) { }

    getClientes(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(this.apiUrl);
    }

    getClienteById(id: string): Observable<Cliente> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Cliente>(url);
    }

    criarCliente(cliente: Cliente): Observable<Cliente> {
        const url = `${this.apiUrl}/novo`;
        return this.http.post<Cliente>(url, cliente);
    }

    atualizarCliente(cliente: Cliente, id: string): Observable<Cliente> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<Cliente>(url, cliente);
    }

    deletarCliente(id: string): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(url);
    }
}