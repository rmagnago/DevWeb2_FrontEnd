import { Component, OnInit } from '@angular/core';
import { Titulo } from '../../models/titulo';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SelectDiretorComponent } from '../../components/select-diretor-titulo/select-diretor-titulo';
import { SelectClasseComponent } from '../../components/select-classe-titulo/select-classe-titulo';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item';
import { SelectTituloItemComponent } from "../../components/select-titulo-item/select-titulo-item";

@Component({
  selector: 'app-item-form',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  imports: [FormsModule, MatDialogModule, SelectDiretorComponent, SelectClasseComponent, SelectTituloItemComponent],
  standalone: true
})
export class ItemFormComponent implements OnInit {
  numSerie!: number;
  dtAquisicao!: Date;
  tipoItem!: string;
  titulo!: Titulo;
  itens!: Item[];

  constructor(private itemService: ItemService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.itemService.getItens().subscribe((resposta) => {
      this.itens = resposta;
    })
  }

  carregarItens(): void {
    this.itemService.getItens().subscribe((resposta) => {
      this.itens = resposta;
    });
  }

  atualizarItem(item: Item): void {
    this.itemService.atualizarItem(item, item.numSerie!).subscribe(() => {
      alert('Item atualizado com sucesso!');
      this.carregarItens();
    });
  }

  apagarItem(id: number): void {
    if (confirm('Tem certeza que deseja apagar este item?')) {
      this.itemService.deletarItem(id).subscribe(() => {
        alert('Item apagado com sucesso!');
        this.carregarItens();
      });
    }
  }

  salvarItem() {
    console.log(this.numSerie)
    if (this.numSerie) {
      const novoItem: Item = {
        dtAquisicao: this.dtAquisicao,
        tipoItem: this.tipoItem,
        titulo: this.titulo,
      };
      this.itemService.criarItem(novoItem).subscribe(() => {
        this.dtAquisicao = new Date();
        this.tipoItem = '';
        alert('Item salvo com sucesso!');
        this.ngOnInit();
      });
    } else {
      alert('Nome do item é obrigatório');
    }
  }
}
