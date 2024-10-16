import { Component, OnInit } from '@angular/core';
import { ClasseService } from '../../services/classe';
import { Classe } from '../../models/classe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-classe-form',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css'],
  imports: [FormsModule],
  standalone: true
})
export class ClasseFormComponent implements OnInit {
  nome: string = '';
  valor: number = 0;
  prazoDevolucao: number = 0;
  classes!: Classe[];

  constructor(private ClasseService: ClasseService) { }
  ngOnInit(): void {
    this.ClasseService.getClasses().subscribe((resposta) => {
      this.classes = resposta;
    })
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
