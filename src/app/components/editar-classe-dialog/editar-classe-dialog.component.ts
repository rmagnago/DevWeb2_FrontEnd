import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Classe } from '../../models/classe';

@Component({
  selector: 'app-editar-classe-dialog',
  templateUrl: './editar-classe-dialog.component.html',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  standalone: true,
})
export class EditarClasseDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditarClasseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Classe
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
