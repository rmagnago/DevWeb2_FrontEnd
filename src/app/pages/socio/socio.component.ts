import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SocioService } from '../../services/socio';
import { Socio } from '../../models/socio';
import { MatTabsModule } from '@angular/material/tabs';
import { EditarSocioComponent } from '../../components/socio/editar-socio/editar-socio.component';

@Component({
  selector: 'app-socio-form',
  templateUrl: './socio.component.html',
  styleUrls: ['./socio.component.css'],
  imports: [FormsModule, MatDialogModule, MatTabsModule],
  standalone: true
})
export class SocioFormComponent implements OnInit {

  nome: string = '';
  numInscricao: number = 0;
  dtNascimento: Date = null!;
  sexo: string = '';
  ativo: boolean = true;
  cpf: string = '';
  telefone: string = '';
  endereco: string = '';
  Socios!: Socio[];

  constructor(private socioService: SocioService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.socioService.getSocios().subscribe((resposta) => {
      this.Socios = resposta;
    });
  }

  carregarSocios(): void {
    this.socioService.getSocios().subscribe((resposta) => {
      this.Socios = resposta;
    });
  }

  abrirDialog(socio: Socio): void {
    const dialogRef = this.dialog.open(EditarSocioComponent, {
      width: '250px',
      data: socio,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.atualizarSocio(result);
      }
    });
  }

  atualizarSocio(socio: Socio): void {
    this.socioService.atualizarSocio(socio, socio.id!).subscribe(() => {
      alert('Socio atualizado com sucesso!');
      this.carregarSocios();
    });
  }

  apagarSocio(id: string): void {
    if (confirm('Tem certeza que deseja apagar este socio?')) {
      this.socioService.deletarSocio(id).subscribe(() => {
        alert('Socio apagado com sucesso!');
        this.carregarSocios();
      });
    }
  }

  salvarSocio() {
    if (this.numInscricao) {
      const novoSocio: Socio = {
        nome: this.nome,
        numInscricao: this.numInscricao,
        dtNascimento: this.dtNascimento,
        sexo: this.sexo,
        ativo: true,
        cpf: this.cpf,
        telefone: this.telefone,
        endereco: this.endereco
      };
      console.log(novoSocio);
      this.socioService.criarSocio(novoSocio).subscribe(() => {
        this.nome = '';
        this.numInscricao = 0;
        this.dtNascimento = new Date();
        this.sexo = '';
        this.ativo = true;
        this.cpf = '';
        this.telefone = '';
        this.endereco = '';
        alert('Socio salvo com sucesso!');
        this.carregarSocios();
      });
    } else {
      alert('Nome do Socio é obrigatório');
    }
  }

  formatadorData(data: Date): string {
    const novaData = new Date(data);
    novaData.setDate(novaData.getDate() + 1);
    return novaData.toLocaleDateString();
  }
}