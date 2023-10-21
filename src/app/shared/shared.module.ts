import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderNavComponent } from "./header-nav/header-nav.component";
import { FooterComponent } from "./footer/footer.component";

@NgModule({
    declarations: [
        HeaderNavComponent, 
        FooterComponent
    ],
    imports: [
        CommonModule, 
        RouterModule
    ], 
    
    exports: [
        HeaderNavComponent, 
        FooterComponent
    ]
  })
  export class SharedModule { }