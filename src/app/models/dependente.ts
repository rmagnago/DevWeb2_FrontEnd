import { Cliente } from "./cliente";

export interface Dependente extends Cliente {
    id?: string;
    Socio: string;
}