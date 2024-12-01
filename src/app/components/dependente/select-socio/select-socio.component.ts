import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Socio } from '../../../models/socio';
import { SocioService } from '../../../services/socio';

@Component({
    selector: 'select-socio',
    templateUrl: 'select-socio.component.html',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
})
export class SelectSocioComponent implements OnInit {
    @Input() selectedSocio: Socio | null = null;
    socios: Socio[] = [];

    @Output() socioSelecionado = new EventEmitter<Socio>();

    constructor(private socioService: SocioService) { }

    ngOnInit(): void {
        this.socioService.getSocios().subscribe(
            (data) => {
                this.socios = data;

                if (this.selectedSocio) {
                    this.selectedSocio = this.socios.find(
                        (socio) => socio.id === this.selectedSocio?.id
                    ) || null;
                }
            },
            (error) => {
                console.error('Erro ao carregar socios', error);
            }
        );
    }

    onSocioChange(): void {
        if (this.selectedSocio) {
            this.socioSelecionado.emit(this.selectedSocio);
        }
    }
}