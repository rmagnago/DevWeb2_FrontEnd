import { Routes } from '@angular/router';
import { AtorFormComponent } from './pages/ator/ator.component';
import { ClasseComponent } from './pages/classe/classe.component';

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
        path: "classe",
        component: ClasseComponent
    },
    {
        path: "dretor",
        component: AtorFormComponent
    },
];
