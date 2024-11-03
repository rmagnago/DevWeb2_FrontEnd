import { Titulo } from "./titulo";

export interface Item {
    numSerie?: number;
    dtAquisicao: Date;
    tipoItem: string;
    titulo: Titulo;
}
