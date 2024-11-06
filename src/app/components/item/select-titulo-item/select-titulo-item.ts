import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Titulo } from '../../../models/titulo';
import { TituloService } from '../../../services/titulo';

@Component({
    selector: 'select-titulo-item',
    templateUrl: 'select-titulo-item.html',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
})
export class SelectTituloItemComponent implements OnInit {
    selectedTitulo: Titulo | null = null;
    titulos: Titulo[] = [];

    constructor(private tituloService: TituloService) { }

    ngOnInit(): void {
        this.tituloService.getTitulos().subscribe(
            (data) => {
                this.titulos = data;
            },
            (error) => {
                console.error('Erro ao carregar titulos', error);
            }
        );
    }
}
