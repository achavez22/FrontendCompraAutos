import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CarsPurchaseDto} from "../../../../core/model/carsPurchaseDto";
import {PurchaseRequestDto} from "../../../../core/model/purchaseRequestDto";
import {TokenService} from "../../../../core/services/token.service";
import {PurchaseService} from "../../../../core/services/purchase.service";
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

  public listCarsPurchase: Array<CarsPurchaseDto>;
  public numberBill: string;
  public purchaseSaved: boolean = false;

  constructor(private tokenService: TokenService, 
              private purchaseService: PurchaseService, 
              private shoppingCartService: ShoppingCartService) {
        this.listCarsPurchase = this.shoppingCartService.getAllCarsShoppingCart();
  }


  public delete(car: CarsPurchaseDto):  void{ 
    if (car !== null) {
      this.shoppingCartService.deleteCarShoppingCart(car);
      this.listCarsPurchase =  this.shoppingCartService.getAllCarsShoppingCart();
    }

  }


  public registerPurchase(): void {

    let totalItems: number = 0;
    this.listCarsPurchase.forEach(car => totalItems += car.total);

    let newPurchase: PurchaseRequestDto = {
      cardIdCustomer: this.tokenService.getInfoToken().cardId,
      date: new Date(Date.now()),
      carsPurchase: this.listCarsPurchase,
      paymentMethod: "Credito",
      total: totalItems
    }

    this.purchaseService.registerPurchase(newPurchase).subscribe({
      next: value => {
        this.numberBill = value.numberBill;
        this.purchaseSaved = true;
        localStorage.setItem("carsPurschase", "")
      }
    })

  }

}
