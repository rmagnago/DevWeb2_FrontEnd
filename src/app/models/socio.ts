import { Cliente } from "./cliente";

export interface Socio extends Cliente {
    id?: string;
    cpf: string;
    endereco: string;
    telefone: string;
}