import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureComponent } from './feature.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './home/pages/dashboard/dashboard.component';
import { PortafolioComponent } from './home/pages/portafolio/portafolio.component';


@NgModule({
  declarations: [
    FeatureComponent,
    DashboardComponent,
    PortafolioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule, 

  ]
})
export class FeatureModule { }
