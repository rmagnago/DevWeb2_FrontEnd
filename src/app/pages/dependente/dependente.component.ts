import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Dependente } from '../../models/dependente';
import { Socio } from '../../models/socio';
import { SelectSocioComponent } from "../../components/dependente/select-socio/select-socio.component";
import { DependenteService } from '../../services/dependentet';
import { EditarDependenteComponent } from '../../components/dependente/editar-titulo-dialog/editar-dependente';

@Component({
  selector: 'app-dependente',
  templateUrl: './dependente.component.html',
  styleUrl: './dependente.component.css',
  standalone: true,
  imports: [FormsModule, SelectSocioComponent],
})
export class DependenteComponent implements OnInit {
  @ViewChild(SelectSocioComponent) selectSocioComponent!: SelectSocioComponent;

  nome!: string;
  numInscricao!: number;
  dtNascimento!: Date;
  sexo!: string;
  ativo!: boolean;
  socio: Socio = {} as Socio;
  dependentes!: Dependente[];

  constructor(private dependenteService: DependenteService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.carregarDependentes();
  }

  carregarDependentes(): void {
    this.dependenteService.getDependentes().subscribe((resposta) => {
      this.dependentes = resposta;
    });
  }

  abrirDialog(dependente: Dependente): void {
    const dialogRef = this.dialog.open(EditarDependenteComponent, {
      width: '550px',
      height: '550px',
      data: { ...dependente },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.atualizarDependente(result);
      }
    });
  }

  atualizarDependente(dependente: Dependente): void {
    if (dependente.id) {

      this.dependenteService.atualizarDependente(dependente, dependente.id!).subscribe(
        () => {
          alert('Dependente atualizado com sucesso!');
          this.carregarDependentes();
        },
        (error) => {
          console.error('Erro ao atualizar dependente:', error);
          alert('Erro ao atualizar o dependente!');
        }
      );
    } else {
      alert('Número inválido!');
    }
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
    if (this.nome && this.socio && this.numInscricao && this.dtNascimento && this.sexo) {
      const novoDependente: Dependente = {
        nome: this.nome,
        numInscricao: this.numInscricao,
        dtNascimento: this.dtNascimento,
        sexo: this.sexo,
        ativo: this.ativo ?? true,
        socio: this.socio,
      };
      this.dependenteService.criarDependente(novoDependente).subscribe(() => {
        this.nome = '';
        this.numInscricao = 0;
        this.dtNascimento = new Date();
        this.sexo = '';
        this.ativo = true;
        this.socio = {} as Socio;
        console.log(novoDependente);
        alert('Dependente salvo com sucesso!');
        this.carregarDependentes();
      });
    } else {
      alert('Preencha todos os campos!');
    }
  }  
}