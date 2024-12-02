import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Item } from '../../../models/item';
import { ItemService } from '../../../services/item';

@Component({
  selector: 'select-item',
  templateUrl: 'select-item.component.html',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
})
export class SelectItemComponent implements OnInit {
  @Input() selectedItem: Item | null = null;
  itens: Item[] = [];

  @Output() itemSelecionado = new EventEmitter<Item>();

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.getItens().subscribe(
      (data) => {
        this.itens = data;

        if (this.selectedItem) {
          this.selectedItem = this.itens.find(
            (item) => item.id === this.selectedItem?.id
          ) || null;
        }
      },
      (error) => {
        console.error('Erro ao carregar itens', error);
      }
    );
  }

  onItemChange(): void {
    if (this.selectedItem) {
      this.itemSelecionado.emit(this.selectedItem);
    }
  }
}