import { Component, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { SelectSocioComponent } from "../select-socio/select-socio.component";
import { Dependente } from "../../../models/dependente";


@Component({
  selector: 'editar-dependente',
  templateUrl: './editar-dependente.html',
  styleUrls: ['./editar-dependente.css'],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    SelectSocioComponent,
  ],
  standalone: true,
})
export class EditarDependenteComponent {
  constructor(
    public dialogRef: MatDialogRef<EditarDependenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Dependente
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
