import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Item } from '../../../models/item';
import { SelectTituloItemComponent } from '../select-titulo-item/select-titulo-item';

@Component({
  selector: 'app-editar-item-dialog',
  templateUrl: './editar-item-dialog.component.html',
  styleUrls: ['./editar-item-dialog.css'],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    SelectTituloItemComponent
  ],
  standalone: true,
})
export class EditarItemDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditarItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
