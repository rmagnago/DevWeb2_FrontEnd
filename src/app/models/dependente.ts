import { CLiente } from "./cliente";

export interface Dependente extends CLiente {
    id?: string;
    Socio: string;
}