import { Titulo } from "./titulo";

export interface Classe {
    id?: string;
    nome: string;
    valor: number;
    prazoDevolucao: Date;
    titulos: Titulo[];
}