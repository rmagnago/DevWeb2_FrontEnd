import { Titulo } from "./titulo";

export interface Diretor {
    id?: string;
    nome: string;
    titulos: Titulo[];
}
