import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Diretor } from '../../../models/diretor';

@Component({
  selector: 'app-editar-diretor-dialog',
  templateUrl: './editar-diretor-dialog.component.html',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  standalone: true,
})
export class EditarDiretorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditarDiretorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Diretor
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
