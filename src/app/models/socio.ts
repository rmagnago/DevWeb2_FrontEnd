import { CLiente } from "./cliente";

export interface Socio extends CLiente {
    id?: string;
    cpf: string;
    endereco: string;
    telefone: string;
}