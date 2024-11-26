export interface Cliente {
    id?: string;
    numInscricao: number;
    nome: string;
    dtNascimento: Date;
    sexo: string;
    ativo: boolean;
}