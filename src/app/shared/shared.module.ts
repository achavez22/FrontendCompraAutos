import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderNavComponent } from "./header-nav/header-nav.component";
import { FooterComponent } from "./footer/footer.component";
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
    declarations: [
        HeaderNavComponent, 
        FooterComponent, 
        SidebarComponent
    ],
    imports: [
        CommonModule, 
        RouterModule
    ], 
    
    exports: [
        HeaderNavComponent, 
        FooterComponent,
        SidebarComponent
    ]
  })
  export class SharedModule { }