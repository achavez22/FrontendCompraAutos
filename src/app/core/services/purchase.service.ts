import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {PurchaseRequestDto} from "../model/purchaseRequestDto";
import {Observable} from "rxjs";
const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) { }

  public registerPurchase(newPurchase: PurchaseRequestDto): Observable<any> {
    return this.http.post(`${apiUrl}/purchases`, newPurchase);
  }

  public getAllPurchaseByIdCustomer(idCustomer: string): Observable<any> {
    return this.http.get(`${apiUrl}/purchases/customers/${idCustomer}`);
  }
}
