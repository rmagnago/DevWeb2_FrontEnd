import { Cliente } from "./cliente";
import { Item } from "./item";

export interface Locacao {
    id?: string;
    dtLocacao: Date;
    dtDevolucaoPrevista: Date;
    dtDevolucaoEfetiva: Date;
    multa: number;
    valor: number;
    cliente: Cliente;
    item: Item;
}