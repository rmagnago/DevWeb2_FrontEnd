import { Routes } from '@angular/router';
import { AtorFormComponent } from './pages/ator/ator.component';
import { ClasseFormComponent } from './pages/classe/classe.component';
import { DiretorFormComponent } from './pages/diretor/diretor.component';
import { TituloFormComponent } from './pages/titulo/titulo.component';
import { ItemFormComponent } from './pages/item/item.component';
import { SocioFormComponent } from './pages/socio/socio.component';
import { LocacaoFormComponent } from './pages/locacao/locacao.component';
import { DevolucaoComponent } from './pages/devolucao/devolucao.component';
import { DependenteComponent } from './pages/dependente/dependente.component';

export const routes: Routes = [
    {
        path: "",
        component: LocacaoFormComponent
    },
    {
        path: "ator",
        component: AtorFormComponent
    },
    {
        path: "diretor",
        component: DiretorFormComponent
    },
    {
        path: "classe",
        component: ClasseFormComponent
    },
    {
        path: "titulo",
        component: TituloFormComponent
    },
    {
        path: "item",
        component: ItemFormComponent
    },
    {
        path: "socio",
        component: SocioFormComponent
    },
    {
        path: "locacao",
        component: LocacaoFormComponent
    },
    {
        path: "devolucao",
        component: DevolucaoComponent
    },
    {
        path: "dependente",
        component: DependenteComponent
    },
];
