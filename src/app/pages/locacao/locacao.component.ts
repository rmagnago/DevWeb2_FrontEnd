import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { LocacaoService } from '../../services/locacao';
import { Item } from '../../models/item';
import { Locacao } from '../../models/locacao';
import { SelectClienteComponent } from '../../components/locacao/select-cliente/select-cliente.component';
import { SelectItemComponent } from '../../components/locacao/select-item/select-item.component';

@Component({
  selector: 'app-locacao-form',
  templateUrl: './locacao.component.html',
  styleUrls: ['./locacao.component.css'],
  standalone: true,
  imports: [SelectClienteComponent, SelectItemComponent, FormsModule]
})
export class LocacaoFormComponent implements OnInit {
  @ViewChild(SelectClienteComponent) selectClienteComponent!: SelectClienteComponent;
  @ViewChild(SelectItemComponent) selectItemComponent!: SelectItemComponent;

  dtLocacao: Date = new Date();
  dtDevolucaoPrevista: Date = new Date();
  dtDevolucaoEfetiva: Date = new Date();
  valor: number = 0;
  multa: number = 0;
  item: Item = undefined!;
  cliente: Cliente = undefined!;
  locacoes!: Locacao[];

  constructor(private locacaoService: LocacaoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.carregarLocacao();
  }

  carregarLocacao(): void {
    this.locacaoService.getLocacoes().subscribe((resposta) => {
      this.locacoes = resposta;
    });
  }

  abrirDialog(locacao: Locacao): void {
    // const dialogRef = this.dialog.open(EditarLocacaoDialogComponent, {
    //   width: '550px',
    //   height: '550px',
    //   data: { ...locacao },
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.atualizarLocacao(result);
    //   }
    // });
  }

  atualizarLocacao(locacao: Locacao): void {
    if (locacao.id) {
      this.locacaoService.atualizarLocacao(locacao, locacao.id!).subscribe(
        () => {
          alert('Locacao atualizado com sucesso!');
          this.carregarLocacao();
        },
        (error) => {
          console.error('Erro ao atualizar Locacao:', error);
          alert('Erro ao atualizar o Locacao!');
        }
      );
    } else {
      alert('Número de série inválido!');
    }
  }


  apagarLocacao(id: string): void {
    if (confirm('Tem certeza que deseja apagar este locacao?')) {
      this.locacaoService.deletarLocacao(id).subscribe(() => {
        alert('Locacao apagado com sucesso!');
        this.carregarLocacao();
      });
    }
  }

  salvarLocacao(): void {
    if (this.cliente && this.item && this.dtLocacao && this.dtDevolucaoPrevista  && this.valor) {
      const novoLocacao: Locacao = {
        dtLocacao: this.dtLocacao,
        dtDevolucaoPrevista: this.dtDevolucaoPrevista,
        valor: this.valor,
        item: this.item,
        cliente: this.cliente,
      };
      this.locacaoService.criarLocacao(novoLocacao).subscribe(() => {
        this.dtLocacao = new Date();
        this.dtDevolucaoPrevista = new Date();
        this.dtDevolucaoEfetiva = new Date();
        this.valor = 0;
        this.multa = 0;
        this.item = undefined!;
        this.cliente = undefined!;
        alert('Locacao salvo com sucesso!');
        this.carregarLocacao();
      });
    } else {
      alert('Preencha todos os campos!');
    }
  }

  formatadorData(data: Date): string {
    const novaData = new Date(data);
    novaData.setDate(novaData.getDate() + 1);
    return novaData.toLocaleDateString();
  }
}
