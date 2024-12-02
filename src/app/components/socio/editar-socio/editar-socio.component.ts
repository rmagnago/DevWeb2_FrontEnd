import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Socio } from '../../../models/socio';

@Component({
  selector: 'app-editar-socio',
  templateUrl: './editar-socio.component.html',
  styleUrls: ['./editar-socio.component.css'],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  standalone: true,
})
export class EditarSocioComponent {
  constructor(
    public dialogRef: MatDialogRef<EditarSocioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Socio
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
