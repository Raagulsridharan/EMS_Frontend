import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ActivationPageComponent } from './components/activation-page/activation-page.component';

const routes: Routes = [
  { path:'login',
    component: LoginPageComponent
  },
  { path: 'accountActivation/:id', 
    component: ActivationPageComponent
  },
  {
    path:'admin',
    loadChildren: () => import('../app/modules/admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./modules/employee/employee.module').then((m)=>m.EmployeeModule)
  },
  {
    path: '**',  // Catch-all route for unknown paths, redirect to landing
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
