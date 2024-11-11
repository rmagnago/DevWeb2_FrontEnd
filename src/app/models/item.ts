import { Titulo } from "./titulo";

export interface Item {
    id?: string;
    numSerie: number;
    dtAquisicao: Date;
    tipoItem: string;
    titulo: Titulo;
}
