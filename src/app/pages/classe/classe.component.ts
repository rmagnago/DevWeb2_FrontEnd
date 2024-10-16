import { Component, OnInit } from '@angular/core';
import { ClasseService } from '../../services/classe';
import { Classe } from '../../models/classe';
import { FormsModule } from '@angular/forms';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditarAtorDialogComponent } from '../../components/editar-ator-dialog/editar-ator-dialog.component';
import { EditarClasseDialogComponent } from '../../components/editar-classe-dialog/editar-classe-dialog.component';

@Component({
  selector: 'app-classe-form',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css'],
  imports: [FormsModule, MatDialogModule],
  standalone: true
})
export class ClasseFormComponent implements OnInit {
  nome: string = '';
  valor: number = 0;
  prazoDevolucao: number = 0;
  classes!: Classe[];

  constructor(private ClasseService: ClasseService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.ClasseService.getClasses().subscribe((resposta) => {
      this.classes = resposta;
    })
  }

  carregarClasses(): void {
    this.ClasseService.getClasses().subscribe((resposta) => {
      this.classes = resposta;
    });
  }


  abrirDialog(classe: Classe): void {
    const dialogRef = this.dialog.open(EditarClasseDialogComponent, {
      width: '250px',
      data: classe,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.atualizarClasse(result);
      }
    });
  }

  atualizarClasse(classe: Classe): void {
    this.ClasseService.atualizarClasse(classe, classe.id!).subscribe(() => {
      alert('Classe atualizado com sucesso!');
      this.carregarClasses();
    });
  }


  apagarClasse(id: string): void {
    if (confirm('Tem certeza que deseja apagar esta classe?')) {
      this.ClasseService.deletarClasse(id).subscribe(() => {
        alert('Classe apagado com sucesso!');
        this.carregarClasses();
      });
    }
  }

  salvarClasse() {
    if (this.nome && this.valor && this.prazoDevolucao) {
      const novoClasse: Classe = { nome: this.nome, valor: this.valor, prazoDevolucao: this.prazoDevolucao };
      this.ClasseService.criarClasse(novoClasse).subscribe(() => {
        this.nome = '';
        this.valor = 0;
        this.prazoDevolucao = 0;
        alert('Classe salvo com sucesso!');
        this.ngOnInit();
      });
    } else {
      alert('Campos obrigatórios não foram preenchidos');
    }
  }
}
