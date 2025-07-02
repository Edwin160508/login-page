import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainApplicationComponent } from './pages/main-application/main-application.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', component: LoginComponent},
    {path: 'main', component: MainApplicationComponent},
];
