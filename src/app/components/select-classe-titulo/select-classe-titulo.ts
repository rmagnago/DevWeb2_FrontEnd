import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Classe } from '../../models/classe';

@Component({
    selector: 'select-classe-titulo',
    templateUrl: 'select-classe-titulo.html',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
})
export class SelectClasseComponent {
    selectedValue!: string;
    classes!: Classe[];
}
