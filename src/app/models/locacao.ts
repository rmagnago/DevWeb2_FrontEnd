import { Cliente } from "./cliente";
import { Item } from "./item";

export interface Locacao {
    id?: string;
    dtLocacao: Date;
    dtDevolucaoPrevista: Date;
    dtDevolucaoEfetiva: Date;
    valor: number;
    multa: number;

    item: Item;
    cliente: Cliente;
}
