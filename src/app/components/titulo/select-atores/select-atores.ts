import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Ator } from '../../../models/ator';
import { AtorService } from '../../../services/ator';

/** @title Select with multiple selection */
@Component({
    selector: 'select-atores-titulo',
    templateUrl: 'select-atores.html',
    standalone: true,
    imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
})
export class SelectAtoresComponent implements OnInit {
    formControl = new FormControl<Ator[]>([]);
    atores: Ator[] = [];

    @Output() atoresSelecionados = new EventEmitter<Ator[]>();

    constructor(private atorService: AtorService) { }

    ngOnInit(): void {
        this.atorService.getAtores().subscribe(
            (data) => {
                this.atores = data;
            },
            (error) => {
                console.error('Erro ao carregar atores', error);
            }
        );

        this.formControl.valueChanges.subscribe((atoresSelecionados) => {
            this.atoresSelecionados.emit(atoresSelecionados || []);
        });
    }
}
