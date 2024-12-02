import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Locacao } from '../../../models/locacao';
import { SelectItemComponent } from '../select-item/select-item.component';
import { SelectClienteComponent } from '../select-cliente/select-cliente.component';

@Component({
  selector: 'app-editar-locacao',
  templateUrl: './editar-locacao.component.html',
  styleUrls: ['./editar-locacao.component.css'],
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, SelectItemComponent, SelectClienteComponent],
  standalone: true,
})
export class EditarLocacaoComponent {
  constructor(
    public dialogRef: MatDialogRef<EditarLocacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Locacao
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
