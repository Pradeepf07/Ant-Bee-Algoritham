import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomescreenComponent } from './welcomescreen/welcomescreen.component';

const routes: Routes = [
  { path:"",component:WelcomescreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
