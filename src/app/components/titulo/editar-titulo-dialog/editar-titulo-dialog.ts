import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule } from '@angular/forms';
import { Titulo } from '../../../models/titulo';
import { SelectDiretorComponent } from '../select-diretor/select-diretor';
import { SelectClasseComponent } from '../select-classe/select-classe';
import { SelectAtoresComponent } from '../select-atores/select-atores';
import { Ator } from '../../../models/ator';

@Component({
  selector: 'app-editar-titulo-dialog',
  templateUrl: './editar-titulo-dialog.html',
  styleUrls: ['./editar-titulo-dialog.css'],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    SelectDiretorComponent,
    SelectClasseComponent,
    SelectAtoresComponent
  ],
  standalone: true,
})
export class EditarTituloDialogComponent {
  atoresFormControl: FormControl = new FormControl<Ator[]>([]);

  constructor(
    public dialogRef: MatDialogRef<EditarTituloDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Inicializa o formControl com os atores selecionados
    this.atoresFormControl.setValue(data.atores || []);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
