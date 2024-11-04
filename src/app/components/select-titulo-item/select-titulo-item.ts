import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Titulo } from '../../models/titulo';

@Component({
    selector: 'select-titulo-item',
    templateUrl: 'select-titulo-item.html',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
})
export class SelectTituloItemComponent {
    selectedValue!: string;
    titulos!: Titulo[];
}
