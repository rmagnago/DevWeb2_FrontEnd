import { Component, OnInit } from '@angular/core';
import { DiretorService } from '../../services/diretor';
import { Diretor } from '../../models/diretor';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Titulo } from '../../models/titulo';
import { EditarDiretorDialogComponent } from '../../components/diretor/editar-diretor-dialog/editar-diretor-dialog.component';

@Component({
  selector: 'app-diretor-form',
  templateUrl: './diretor.component.html',
  styleUrls: ['./diretor.component.css'],
  imports: [FormsModule, MatDialogModule],
  standalone: true
})
export class DiretorFormComponent implements OnInit {
  nome: string = '';
  titulos!: Titulo[];
  diretores!: Diretor[];

  constructor(private diretorService: DiretorService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.diretorService.getDiretores().subscribe((resposta) => {
      this.diretores = resposta;
    })
  }

  carregarDiretores(): void {
    this.diretorService.getDiretores().subscribe((resposta) => {
      this.diretores = resposta;
    });
  }

  abrirDialog(diretor: Diretor): void {
    const dialogRef = this.dialog.open(EditarDiretorDialogComponent, {
      width: '250px',
      data: diretor,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.atualizarDiretor(result);
      }
    });
  }

  atualizarDiretor(diretor: Diretor): void {
    this.diretorService.atualizarDiretor(diretor, diretor.id!).subscribe(() => {
      alert('Diretor atualizado com sucesso!');
      this.carregarDiretores();
    });
  }

  apagarDiretor(id: string): void {
    if (confirm('Tem certeza que deseja apagar este diretor?')) {
      this.diretorService.deletarDiretor(id).subscribe(() => {
        alert('Diretor apagado com sucesso!');
        this.carregarDiretores();
      });
    }
  }

  salvarDiretor() {
    console.log(this.nome)
    if (this.nome) {
      const novoDiretor: Diretor = { nome: this.nome, titulos: this.titulos };
      this.diretorService.criarDiretor(novoDiretor).subscribe(() => {
        this.nome = '';
        alert('Diretor salvo com sucesso!');
        this.ngOnInit();
      });
    } else {
      alert('Nome do diretor é obrigatório');
    }
  }
}
