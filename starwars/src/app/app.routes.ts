import { ShellComponent } from './shell/shell.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const children: Routes = [
  { path: '', component: HomeComponent },
];

const AppRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'starwars'
  },
  {
    path: 'starwars',
    component: ShellComponent,
    children
  }
];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule]
})
export class AppRouting {}
