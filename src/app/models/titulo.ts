import { Ator } from "./ator";
import { Classe } from "./classe";
import { Diretor } from "./diretor";

export interface Titulo {
    id?: string;
    nome: string;
    ano: number;
    sinopse: string;
    categoria: string;
    atores: Ator[];
    diretor: Diretor;
    classe: Classe;
}
