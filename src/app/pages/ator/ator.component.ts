import { Component, OnInit } from '@angular/core';
import { AtorService } from '../../services/ator';
import { Ator } from '../../models/ator';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Titulo } from '../../models/titulo';
import { EditarAtorDialogComponent } from '../../components/ator/editar-ator-dialog/editar-ator-dialog.component';

@Component({
  selector: 'app-ator-form',
  templateUrl: './ator.component.html',
  styleUrls: ['./ator.component.css'],
  imports: [FormsModule, MatDialogModule],
  standalone: true
})
export class AtorFormComponent implements OnInit {
  nome: string = '';
  titulos!: Titulo[];
  atores!: Ator[];

  constructor(private atorService: AtorService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.atorService.getAtores().subscribe((resposta) => {
      this.atores = resposta;
    })
  }

  carregarAtores(): void {
    this.atorService.getAtores().subscribe((resposta) => {
      this.atores = resposta;
    });
  }

  abrirDialog(ator: Ator): void {
    const dialogRef = this.dialog.open(EditarAtorDialogComponent, {
      width: '250px',
      data: ator,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.atualizarAtor(result);
      }
    });
  }

  atualizarAtor(ator: Ator): void {
    this.atorService.atualizarAtor(ator, ator.id!).subscribe(() => {
      alert('Ator atualizado com sucesso!');
      this.carregarAtores();
    });
  }

  apagarAtor(id: string): void {
    if (confirm('Tem certeza que deseja apagar este ator?')) {
      this.atorService.deletarAtor(id).subscribe(() => {
        alert('Ator apagado com sucesso!');
        this.carregarAtores();
      });
    }
  }

  salvarAtor() {
    if (this.nome) {
      const novoAtor: Ator = { nome: this.nome, titulos: this.titulos };
      this.atorService.criarAtor(novoAtor).subscribe(() => {
        this.nome = '';
        alert('Ator salvo com sucesso!');
        this.ngOnInit();
      });
    } else {
      alert('Nome do ator é obrigatório');
    }
  }
}
