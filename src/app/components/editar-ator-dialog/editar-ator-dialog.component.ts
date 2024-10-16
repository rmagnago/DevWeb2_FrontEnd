import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Ator } from '../../models/ator';

@Component({
  selector: 'app-editar-ator-dialog',
  templateUrl: './editar-ator-dialog.component.html',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  standalone: true,
})
export class EditarAtorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditarAtorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ator
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
