import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SocioService } from '../../services/socio';
import { Socio } from '../../models/socio';
import { MatTabsModule } from '@angular/material/tabs';

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
  ativo: boolean = false;
  cpf: string = '';
  telefone: string = '';
  endereco: string = '';
  Socios!: Socio[];

  constructor(private socioService: SocioService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.socioService.getSocios().subscribe((resposta) => {
      this.Socios = resposta;
    })
  }

  carregarSocios(): void {
    this.socioService.getSocios().subscribe((resposta) => {
      this.Socios = resposta;
    });
  }

  abrirDialog(Socio: Socio): void {
    // const dialogRef = this.dialog.open(EditarSocioDialogComponent, {
    //     width: '250px',
    //     data: Socio,
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //     if (result) {
    //         this.atualizarSocio(result);
    //     }
    // });
  }

  atualizarSocio(Socio: Socio): void {
    this.socioService.atualizarSocio(Socio, Socio.id!).subscribe(() => {
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
        nome: this.nome, numInscricao: this.numInscricao, dtNascimento: this.dtNascimento, sexo: this.sexo, ativo: true, cpf: this.cpf, telefone: this.telefone, endereco: this.endereco
      };
      this.socioService.criarSocio(novoSocio).subscribe(() => {
        this.nome = '';
        this.numInscricao = 0;
        this.dtNascimento = null!;
        this.sexo = '';
        this.ativo = false;
        alert('Socio salvo com sucesso!');
        this.ngOnInit();
      });
    } else {
      alert('Nome do Socio é obrigatório');
    }
  }
}
