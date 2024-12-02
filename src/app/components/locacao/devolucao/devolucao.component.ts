import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Locacao } from '../../../models/locacao';

@Component({
  selector: 'app-devolucao',
  templateUrl: './devolucao.component.html',
  styleUrls: ['./devolucao.component.css'],
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  standalone: true,
})
export class DevolucaoComponent {
  constructor(
    public dialogRef: MatDialogRef<DevolucaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Locacao
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
