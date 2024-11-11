import { Component, OnInit, ViewChild } from '@angular/core';
import { TituloService } from '../../services/titulo';
import { Titulo } from '../../models/titulo';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Ator } from '../../models/ator';
import { Diretor } from '../../models/diretor';
import { Classe } from '../../models/classe';
import { SelectDiretorComponent } from '../../components/titulo/select-diretor/select-diretor';
import { SelectClasseComponent } from '../../components/titulo/select-classe/select-classe';
import { SelectAtoresComponent } from "../../components/titulo/select-atores/select-atores";
import { EditarTituloDialogComponent } from '../../components/titulo/editar-titulo-dialog/editar-titulo-dialog';

@Component({
  selector: 'app-titulo-form',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css'],
  imports: [FormsModule, MatDialogModule, SelectDiretorComponent, SelectClasseComponent, SelectAtoresComponent],
  standalone: true
})
export class TituloFormComponent implements OnInit {
  @ViewChild(SelectAtoresComponent) selectAtoresComponent!: SelectAtoresComponent;

  nome: string = '';
  ano: number = 0;
  sinopse: string = '';
  categoria: string = '';
  atores: Ator[] = [];
  diretor!: Diretor;
  classe!: Classe;
  titulos!: Titulo[];

  constructor(private tituloService: TituloService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.carregarTitulos();
  }

  carregarTitulos(): void {
    this.tituloService.getTitulos().subscribe((resposta) => {
      this.titulos = resposta;
    });
  }

  abrirDialog(titulo: Titulo): void {
    const dialogRef = this.dialog.open(EditarTituloDialogComponent, {
      width: '350px',
      height: '550px',
      data: titulo,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.atualizarTitulo(result);
      }
    });
  }

  salvarTitulo() {
    if (this.nome && this.diretor && this.classe && this.atores.length > 0) {
      const novoTitulo: Titulo = {
        nome: this.nome,
        ano: this.ano,
        sinopse: this.sinopse,
        categoria: this.categoria,
        atores: this.atores,
        diretor: this.diretor,
        classe: this.classe,
      };

      this.tituloService.criarTitulo(novoTitulo).subscribe(() => {
        this.nome = '';
        this.ano = 0;
        this.sinopse = '';
        this.categoria = '';
        this.diretor = undefined!;
        this.classe = undefined!;
        this.atores = [];
        alert('Titulo salvo com sucesso!');
        this.ngOnInit();
        this.selectAtoresComponent.formControl.setValue([]);
      }, (error) => {
        console.error('Erro ao salvar título', error);
      });
    } else {
      alert('Por favor, preencha todos os campos obrigatórios');
    }
  }

  atualizarTitulo(titulo: Titulo): void {
    this.tituloService.atualizarTitulo(titulo, titulo.id!).subscribe(() => {
      alert('Titulo atualizado com sucesso!');
      this.carregarTitulos();
    });
  }

  apagarTitulo(id: string): void {
    if (confirm('Tem certeza que deseja apagar este titulo?')) {
      this.tituloService.deletarTitulo(id).subscribe(() => {
        alert('Titulo apagado com sucesso!');
        this.carregarTitulos();
      });
    }
  }

  trackByTitulo(index: number, item: Titulo): string {
    return item.id!;
  }

  formatarNomesAtores(atores: Ator[]): string {
    return atores && atores.length > 0
      ? atores.map(ator => ator.nome).join(', ')
      : 'Sem atores';
  }
}