import { Component, OnInit } from '@angular/core';
import { TituloService } from '../../services/titulo';
import { Titulo } from '../../models/titulo';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Ator } from '../../models/ator';
import { Diretor } from '../../models/diretor';
import { Classe } from '../../models/classe';
import { SelectDiretorComponent } from '../../components/select-diretor-titulo/select-diretor-titulo';
import { SelectClasseComponent } from '../../components/select-classe-titulo/select-classe-titulo';

@Component({
  selector: 'app-titulo-form',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css'],
  imports: [FormsModule, MatDialogModule, SelectDiretorComponent, SelectClasseComponent],
  standalone: true
})
export class TituloFormComponent implements OnInit {
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
    this.tituloService.getTitulos().subscribe((resposta) => {
      this.titulos = resposta;
    })
  }

  carregarTitulos(): void {
    this.tituloService.getTitulos().subscribe((resposta) => {
      this.titulos = resposta;
    });
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

  salvarTitulo() {
    console.log(this.nome)
    if (this.nome) {
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
        alert('Titulo salvo com sucesso!');
        this.ngOnInit();
      });
    } else {
      alert('Nome do titulo é obrigatório');
    }
  }
}
