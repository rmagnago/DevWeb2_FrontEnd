import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Classe } from '../../../models/classe';
import { ClasseService } from '../../../services/classe';

@Component({
    selector: 'select-classe-titulo',
    templateUrl: 'select-classe.html',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
})
export class SelectClasseComponent implements OnInit {
    selectedClasse: Classe | null = null;
    classes: Classe[] = [];

    constructor(private classeService: ClasseService) { }

    ngOnInit(): void {
        this.classeService.getClasses().subscribe(
            (data) => {
                this.classes = data;
            },
            (error) => {
                console.error('Erro ao carregar classes', error);
            }
        );
    }
}
