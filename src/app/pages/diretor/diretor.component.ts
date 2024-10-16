import { Component, OnInit } from '@angular/core';
import { DiretorService } from '../../services/diretor';
import { Diretor } from '../../models/diretor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-diretor-form',
  templateUrl: './diretor.component.html',
  styleUrls: ['./diretor.component.css'],
  imports: [FormsModule],
  standalone: true
})
export class DiretorFormComponent implements OnInit {
  nome: string = '';
  diretores!: Diretor[];

  constructor(private diretorService: DiretorService) { }
  ngOnInit(): void {
    this.diretorService.getDiretores().subscribe((resposta) => {
      this.diretores = resposta;
    })
  }

  salvarDiretor() {
    console.log(this.nome)
    if (this.nome) {
      const novoDiretor: Diretor = { nome: this.nome };
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
