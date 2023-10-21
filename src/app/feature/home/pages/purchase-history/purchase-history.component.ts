import { Component } from '@angular/core';
import {PurchaseService} from "../../../../core/services/purchase.service";
import {TokenService} from "../../../../core/services/token.service";
import Swal from "sweetalert2";
import {CarsPurchaseDto} from "../../../../core/model/carsPurchaseDto";
import { PurchaseRequestDto } from 'src/app/core/model/purchaseRequestDto';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent {

  public historyPurchases: Array<any>;
  public carsPurchases: Array<CarsPurchaseDto>;
  public purchaseSelected: PurchaseRequestDto; 

  constructor(private purchaseService: PurchaseService, 
              private tokenService: TokenService) {
      this.purchaseService.getAllPurchaseByIdCustomer(this.tokenService.getInfoToken().cardId).subscribe({
      next: value => {
        this.historyPurchases = value;
      }
    });
  }

  public showListCarsPurchase(purchase : PurchaseRequestDto): void {
    this.carsPurchases = purchase.carsPurchase;
    this.purchaseSelected = purchase;
  }


}
