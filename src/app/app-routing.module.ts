import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MainGuard } from './services/guard/main.guard';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';


const routes: Routes = [
  { path: '', component: AppComponent, canActivate: [MainGuard]},
  { path: 'main', component:MainComponent},
  { path: 'login', component: LoginComponent},
  { path: '**' , redirectTo: 'error404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
