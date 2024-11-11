import { Component, OnInit, ViewChild } from '@angular/core';
import { Titulo } from '../../models/titulo';
import { MatDialog } from '@angular/material/dialog';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item';
import { SelectTituloItemComponent } from "../../components/item/select-titulo-item/select-titulo-item";
import { FormsModule } from '@angular/forms';
import { EditarItemDialogComponent } from '../../components/item/editar-item-dialog/editar-item-dialog.component';

@Component({
  selector: 'app-item-form',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  standalone: true,
  imports: [SelectTituloItemComponent, FormsModule]
})
export class ItemFormComponent implements OnInit {
  @ViewChild(SelectTituloItemComponent) selectTituloItemComponent!: SelectTituloItemComponent;

  numSerie!: number;
  dtAquisicao!: Date;
  tipoItem!: string;
  titulo!: Titulo | null;
  itens!: Item[];

  constructor(private itemService: ItemService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.carregarItens();
  }

  carregarItens(): void {
    this.itemService.getItens().subscribe((resposta) => {
      this.itens = resposta;
    });
  }

  abrirDialog(item: Item): void {
    const dialogRef = this.dialog.open(EditarItemDialogComponent, {
      width: '350px',
      height: '550px',
      data: item,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.atualizarItem(result);
      }
    });
  }

  atualizarItem(item: Item): void {
    if (item.numSerie) {
      this.itemService.atualizarItem(item, item.id!).subscribe(() => {
        alert('Item atualizado com sucesso!');
        this.carregarItens();
      });
    } else {
      alert('Número de série inválido!');
    }
  }

  apagarItem(id: string): void {
    if (confirm('Tem certeza que deseja apagar este item?')) {
      this.itemService.deletarItem(id).subscribe(() => {
        alert('Item apagado com sucesso!');
        this.carregarItens();
      });
    }
  }

  salvarItem(): void {
    console.log(this.numSerie, this.dtAquisicao, this.tipoItem, this.titulo);
    if (this.numSerie && this.tipoItem && this.titulo && this.dtAquisicao) {
      const novoItem: Item = {
        numSerie: this.numSerie,
        dtAquisicao: this.dtAquisicao,
        tipoItem: this.tipoItem,
        titulo: this.titulo,
      };
      this.itemService.criarItem(novoItem).subscribe(() => {
        this.numSerie = 0;
        this.dtAquisicao = new Date();
        this.tipoItem = '';
        this.titulo = undefined!;
        alert('Item salvo com sucesso!');
        this.carregarItens();
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
