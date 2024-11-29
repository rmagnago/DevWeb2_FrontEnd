import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { Item } from '../../models/item';
import { Locacao } from '../../models/locacao';
import { LocacaoService } from '../../services/locacao';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SelectClienteLocacaoComponent } from '../../components/locacao/select-cliente/select-cliente';
import { SelectItemLocacaoComponent } from '../../components/locacao/select-item/select-item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-devolucao',
  templateUrl: './devolucao.component.html',
  styleUrl: './devolucao.component.css',
  imports: [FormsModule, MatDialogModule, SelectItemLocacaoComponent, SelectClienteLocacaoComponent],
  standalone: true
})
export class DevolucaoComponent implements OnInit {
  dtLocacao: Date = null!;
  dtDevolucaoPrevista: Date = null!;
  dtDevolucaoEfetiva: Date = null!;
  multa: number = 0;
  valor: number = 0;
  cliente!: Cliente | null;
  item!: Item | null;
  locacoes!: Locacao[];

  constructor(private locacaoService: LocacaoService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.locacaoService.getLocacoes().subscribe((resposta) => {
      this.locacoes = resposta;
    })
  }

  carregarLocacoes(): void {
    this.locacaoService.getLocacoes().subscribe((resposta) => {
      this.locacoes = resposta;
    });
  }

  abrirDialog(locacao: Locacao): void {
    // const dialogRef = this.dialog.open(EditarLocacaoDialogComponent, {
    //     width: '250px',
    //     data: locacao,
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //     if (result) {
    //         this.atualizarLocacao(result);
    //     }
    // });
  }

  atualizarCliente(locacao: Locacao): void {
    this.locacaoService.atualizarLocacao(locacao, locacao.id!).subscribe(() => {
      alert('Locacao atualizado com sucesso!');
      this.carregarLocacoes();
    });
  }

  apagarLocacao(id: string): void {
    if (confirm('Tem certeza que deseja apagar este locação?')) {
      this.locacaoService.deletarLocacao(id).subscribe(() => {
        alert('Locação apagado com sucesso!');
        this.carregarLocacoes();
      });
    }
  }

  salvarLocacao() {
    if (this.dtLocacao) {
      const novoLocacao: Locacao = {
        dtLocacao: this.dtLocacao,
        dtDevolucaoPrevista: this.dtDevolucaoPrevista,
        dtDevolucaoEfetiva: this.dtDevolucaoEfetiva,
        multa: this.multa,
        valor: this.valor,
        cliente: this.cliente!,
        item: this.item!,
      };
      this.locacaoService.criarLocacao(novoLocacao).subscribe(() => {
        this.dtLocacao = null!;
        this.dtDevolucaoPrevista = null!;
        this.dtDevolucaoEfetiva = null!;
        this.multa = 0;
        this.valor = 0;
        this.cliente = undefined!;
        this.item = undefined!;
        alert('Locação salvo com sucesso!');
        this.ngOnInit();
      });
    } else {
      alert('Nome do locação é obrigatório');
    }
  }
}
