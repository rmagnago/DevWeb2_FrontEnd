import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Titulo } from '../../models/titulo';
import { ClienteService } from '../../services/cliente';
import { Cliente } from '../../models/cliente';

@Component({
    selector: 'app-cliente-form',
    templateUrl: './cliente.component.html',
    styleUrls: ['./cliente.component.css'],
    imports: [FormsModule, MatDialogModule],
    standalone: true
})
export class ClienteFormComponent implements OnInit {
    nome: string = '';
    titulos!: Titulo[];
    clientes!: Cliente[];

    constructor(private clienteService: ClienteService, public dialog: MatDialog) { }
    ngOnInit(): void {
        this.clienteService.getClientes().subscribe((resposta) => {
            this.clientes = resposta;
        })
    }

    carregarClientes(): void {
        this.clienteService.getClientes().subscribe((resposta) => {
            this.clientes = resposta;
        });
    }

    abrirDialog(cliente: Cliente): void {
        const dialogRef = this.dialog.open(EditarClienteDialogComponent, {
            width: '250px',
            data: cliente,
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.atualizarCliente(result);
            }
        });
    }

    atualizarCliente(cliente: Cliente): void {
        this.clienteService.atualizarCliente(cliente, cliente.id!).subscribe(() => {
            alert('Cliente atualizado com sucesso!');
            this.carregarClientes();
        });
    }

    apagarCliente(id: string): void {
        if (confirm('Tem certeza que deseja apagar este cliente?')) {
            this.clienteService.deletarCliente(id).subscribe(() => {
                alert('Cliente apagado com sucesso!');
                this.carregarClientes();
            });
        }
    }

    salvarCliente() {
        console.log(this.nome)
        if (this.nome) {
            const novoCliente: Cliente = { nome: this.nome, titulos: this.titulos };
            this.clienteService.criarCliente(novoCliente).subscribe(() => {
                this.nome = '';
                alert('Cliente salvo com sucesso!');
                this.ngOnInit();
            });
        } else {
            alert('Nome do cliente é obrigatório');
        }
    }
}
