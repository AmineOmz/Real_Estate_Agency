import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './Components/signin/signin.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: 'login', component: SigninComponent
  },
  {
    path: 'dashboard', component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
