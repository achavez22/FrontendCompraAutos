import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './feature/auth/auth-routing.module';
import { FeatureRoutingModule } from './feature/feature-routing.module';

const routes: Routes = [
  {
    path:'',
    redirectTo: '/dashboard', pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes), 
    FeatureRoutingModule, 
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
