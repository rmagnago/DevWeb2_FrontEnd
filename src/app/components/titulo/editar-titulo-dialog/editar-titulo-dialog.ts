import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Titulo } from '../../../models/titulo';

@Component({
  selector: 'app-editar-titulo-dialog',
  templateUrl: './editar-titulo-dialog.html',
  styleUrls: ['./editar-titulo-dialog.css'],
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  standalone: true,
})
export class EditarTituloDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditarTituloDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Titulo
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
