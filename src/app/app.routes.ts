import { Routes } from '@angular/router';
import { AtorFormComponent } from './pages/ator/ator.component';
import { ClasseFormComponent } from './pages/classe/classe.component';
import { DiretorFormComponent } from './pages/diretor/diretor.component';

export const routes: Routes = [
    {
        path: "",
        component: AtorFormComponent
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

];
