import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente';

@Component({
    selector: 'select-cliente',
    templateUrl: 'select-cliente.html',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
})
export class SelectClienteLocacaoComponent implements OnInit {
    @Input() selectedCliente: Cliente | null = null;
    clientes: Cliente[] = [];

    @Output() clienteSelecionado = new EventEmitter<Cliente>();

    constructor(private clienteService: ClienteService) { }

    ngOnInit(): void {
        this.clienteService.getClientes().subscribe(
            (data) => {
                this.clientes = data;

                if (this.selectedCliente) {
                    this.selectedCliente = this.clientes.find(
                        (cliente) => cliente.id === this.selectedCliente?.id
                    ) || null;
                }
            },
            (error) => {
                console.error('Erro ao carregar clientes', error);
            }
        );
    }

    onClienteChange(): void {
        if (this.selectedCliente) {
            this.clienteSelecionado.emit(this.selectedCliente);
        }
    }
}