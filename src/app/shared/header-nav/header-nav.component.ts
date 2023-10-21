import { Component, OnInit } from '@angular/core';
import { TokenService } from "../../core/services/token.service";
import { Subscription } from "rxjs";
import {Roles} from "../../core/enums/Roles";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html', 
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent {

  public nameCustomer: string;
  public emailCustomer: string;
  public numberCars: number = 0;
  public rol: string;
  public subscriptionNumber: Subscription;
  public rolAdmin = Roles.ADMIN;
  
  constructor(private tokenService: TokenService, 
              private shoppingCartService: ShoppingCartService, 
              private authService: AuthService, 
              private router:Router) {
    this.nameCustomer = this.tokenService.getInfoToken().fullname;
    this.emailCustomer = this.tokenService.getInfoToken().email;
    this.rol = this.tokenService.getInfoToken().rol;
    
    this.subscriptionNumber = this.shoppingCartService.getNumberProducts.subscribe({
      next: value => this.numberCars = value
    })
  }

  public logout(): void{ 
    this.authService.logout();
    Swal.fire('Logout',  ` ${this.emailCustomer }, has cerrado sesion con exito! `, 'success' );
    this.router.navigate(['autho/login']); 
  }

}
