import { Component } from '@angular/core';
import { DiretorService } from '../../services/diretor';
import { Diretor } from '../../models/diretor';

@Component({
  selector: 'app-diretor-form',
  templateUrl: './diretor.component.html',
  styleUrls: ['./diretor.component.css']
})
export class AtorFormComponent {
  nome: string = '';

  constructor(private diretorService: DiretorService) { }

  salvarDiretor() {
    if (this.nome) {
      const novoDiretor: Diretor = { nome: this.nome };
      this.diretorService.criarDiretor(novoDiretor).subscribe(() => {
        this.nome = '';
        alert('Diretor salvo com sucesso!');
      });
    } else {
      alert('Nome do Diretor é obrigatório');
    }
  }
}
