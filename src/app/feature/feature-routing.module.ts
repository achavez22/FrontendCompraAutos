import {inject, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GuardAuthService} from "../core/services/guard-auth.service";
import { FeatureComponent } from './feature.component';
import { DashboardComponent } from './home/pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "dashboard",
    component: FeatureComponent,
    canActivate: [() => inject(GuardAuthService).canActiveWithAuth()],
    children: [
      {path: '', component: DashboardComponent, data: {title: 'Portafolio'}},
    ]
  }
  // {
  //   path: "autho",
  //   canActivate: [() => inject(GuardAuthService).canActiveLogin()],
  //   loadChildren: () => import("./auth/auth.module").then(a => a.AuthModule)
  // },
  // {
  //   path: "portafolio",
  //   canActivate: [() => inject(GuardAuthService).canActiveWithAuth()],
  //   loadChildren: () => import("./home/home.module").then(a => a.HomeModule)
  // },
  // {
  //   path: "admin",
  //   canActivate: [() => inject(GuardAuthService).canActiveWithRolAdmin()],
  //   loadChildren: () => import("./admin/admin.module").then(a => a.AdminModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
