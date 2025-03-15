import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full' },
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent },
    {path:'inicio', component: UsuarioComponent }
];
