import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LaptopDetailComponent } from './laptop-detail/laptop-detail.component';
import { LaptopComponent } from './laptop/laptop.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './service/auth.service';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'laptop',
    component: LaptopComponent
    
  },
  {
    path:'laptop-detail',
    component: LaptopDetailComponent
  },
  {
    path:'laptop-detail/:id',
    component: LaptopDetailComponent
  },
  {
    path:'home',
    component: HomeComponent,
    canActivate: [AuthService]

  },
  {
    path:'**',
    redirectTo: '/login'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
