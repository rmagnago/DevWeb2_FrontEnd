import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Diretor } from '../../../models/diretor';
import { DiretorService } from '../../../services/diretor';

@Component({
    selector: 'select-diretor-titulo',
    templateUrl: 'select-diretor.html',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
})
export class SelectDiretorComponent implements OnInit {
    diretores: Diretor[] = [];
    selectedDiretor: Diretor | null = null;

    @Output() diretorSelecionado = new EventEmitter<Diretor>();

    constructor(private diretorService: DiretorService) { }

    ngOnInit(): void {
        this.diretorService.getDiretores().subscribe(
            (data) => {
                this.diretores = data;
            },
            (error) => {
                console.error('Erro ao carregar diretores', error);
            }
        );
    }

    onDiretorChange(): void {
        if (this.selectedDiretor) {
            this.diretorSelecionado.emit(this.selectedDiretor);
        }
    }
}