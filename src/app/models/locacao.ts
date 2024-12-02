import { Cliente } from "./cliente";
import { Item } from "./item";

export interface Locacao {
    id?: string;
    dtLocacao: Date;
    dtDevolucaoPrevista: Date;
    valor: number;

    item: Item;
    cliente: Cliente;
}
