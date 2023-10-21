import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterCarComponent} from "./pages/register-car/register-car.component";

const routes: Routes = [
  {
    path: "car-register",
    component: RegisterCarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
