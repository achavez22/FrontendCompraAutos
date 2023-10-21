import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { HeaderNavComponent } from '../../shared/header-nav/header-nav.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { PurchaseHistoryComponent } from './pages/purchase-history/purchase-history.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PortfolioComponent,
    ShoppingCartComponent,
    PurchaseHistoryComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
