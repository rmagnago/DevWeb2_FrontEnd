import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    private apiUrl = 'http://localhost:8080/api/item';

    constructor(private http: HttpClient) { }

    getItens(): Observable<Item[]> {
        return this.http.get<Item[]>(this.apiUrl);
    }

    getItemById(id: string): Observable<Item> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Item>(url);
    }

    criarItem(item: Item): Observable<Item> {
        const url = `${this.apiUrl}/novo`;
        return this.http.post<Item>(url, item);
    }

    atualizarItem(item: Item, id: string): Observable<Item> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<Item>(url, item);
    }

    deletarItem(id: string): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(url);
    }
}