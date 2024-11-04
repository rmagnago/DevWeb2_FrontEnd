import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Diretor } from '../../models/diretor';

@Component({
    selector: 'select-diretor-titulo',
    templateUrl: 'select-diretor-titulo.html',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
})
export class SelectDiretorComponent {
    selectedValue!: string;
    diretores!: Diretor[];
}
