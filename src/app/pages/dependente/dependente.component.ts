import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Dependente } from '../../models/dependente';
import { Socio } from '../../models/socio';
import { DependenteService } from '../../services/dependente';
import { SexoComponent } from "../../components/cliente/sexo/sexo.component";

@Component({
  selector: 'app-dependente',
  templateUrl: './dependente.component.html',
  styleUrl: './dependente.component.css',
  standalone: true,
  imports: [FormsModule, MatDialogModule, SexoComponent],
})
export class DependenteComponent implements OnInit {

  nome: string = '';
  numInscricao: number = 0;
  dtNascimento: Date = null!;
  sexo: string = '';
  ativo: boolean = false;
  cpf: string = '';
  telefone: string = '';
  endereco: string = '';
  socio: Socio = null!;
  dependentes!: Dependente[];

  constructor(private dependenteService: DependenteService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.dependenteService.getDependentes().subscribe((resposta) => {
      this.dependentes = resposta;
    })
  }

  carregarDependentes(): void {
    this.dependenteService.getDependentes().subscribe((resposta) => {
      this.dependentes = resposta;
    });
  }

  abrirDialog(dependente: Dependente): void {
    // const dialogRef = this.dialog.open(EditarDependenteDialogComponent, {
    //     width: '250px',
    //     data: Dependente,
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //     if (result) {
    //         this.atualizarDependente(result);
    //     }
    // });
  }

  atualizarDependente(dependente: Dependente): void {
    this.dependenteService.atualizarDependente(dependente, dependente.id!).subscribe(() => {
      alert('Dependente atualizado com sucesso!');
      this.carregarDependentes();
    });
  }

  apagarDependente(id: string): void {
    if (confirm('Tem certeza que deseja apagar este Dependente?')) {
      this.dependenteService.deletarDependente(id).subscribe(() => {
        alert('Dependente apagado com sucesso!');
        this.carregarDependentes();
      });
    }
  }

  salvarDependente() {
    if (this.nome) {
      const novoDependente: Dependente = {
        nome: this.nome, numInscricao: this.numInscricao, dtNascimento: this.dtNascimento, sexo: this.sexo, ativo: this.ativo,
        Socio: ''
      };
      this.dependenteService.criarDependente(novoDependente).subscribe(() => {
        this.nome = '';
        this.numInscricao = 0;
        this.dtNascimento = null!;
        this.sexo = '';
        this.ativo = false;
        alert('Dependente salvo com sucesso!');
        this.ngOnInit();
      });
    } else {
      alert('Nome do Dependente é obrigatório');
    }
  }
}
