import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'select-sexo',
  standalone: true,
  imports: [
    MatPseudoCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule],
  templateUrl: './select-sexo.component.html',
})
export class SexoComponent {
  disableSelect = new FormControl(false);

}