import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CarsPurchaseDto } from '../model/carsPurchaseDto';
import { CarDto } from '../model/carDto';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private numberCars = new BehaviorSubject(0);
  public readonly getNumberProducts: Observable<any> = this.numberCars.asObservable();
  
  constructor() { 
    this.setNumberCarsCart();
  }

  public getAllCarsShoppingCart(): Array<CarsPurchaseDto> {
     return JSON.parse(localStorage.getItem("carsInCarts")) ? 
            JSON.parse(localStorage.getItem("carsInCarts")) : [];
  }

  public setNumberCarsCart(): void {
    let count: number = 0;
    let carsInCart: Array<CarsPurchaseDto> = this.getAllCarsShoppingCart();

    if (!carsInCart) {
      this.numberCars.next(0);
      return;
    }

    carsInCart.forEach(car => count += car.quantity );
    this.numberCars.next(count);
  }

  
  public addCarShoppingCart(carNew: CarsPurchaseDto): void {

    let added: boolean = false;
    let carsPurchase = this.getAllCarsShoppingCart();

    if (carsPurchase.length > 0) {
      for (let i: number = 0; i < carsPurchase.length && !added; i++) {
        let car: CarsPurchaseDto = carsPurchase[i];
        if (car.codeCar == carNew.codeCar) {
            car.quantity += 1;
            car.total += carNew.total;
            added = true;
        }
      }
    }

    if(!added) {carsPurchase.push(carNew);}
    localStorage.setItem('carsInCarts', JSON.stringify(carsPurchase));
    this.setNumberCarsCart();

  }


  public deleteCarShoppingCart(carDelete: CarsPurchaseDto): boolean {
    let deleted: boolean = false;
    let carsPurchase = this.getAllCarsShoppingCart();
    let carActual: CarsPurchaseDto = carsPurchase.find(car => car.codeCar == carDelete.codeCar);
    if(carActual === null){ return deleted}

    for (let i: number = 0; i < carsPurchase.length && !deleted; i++) {
      let car: CarsPurchaseDto = carsPurchase[i];

      if (car.codeCar == carDelete.codeCar) {
        if ((car.quantity - 1) == 0) {
          carsPurchase.splice(i, 1);
        } else {
          car.quantity -= 1;
          car.total -= carDelete.total;
          deleted = true;
        }
      }
    }

    localStorage.setItem('carsInCarts', JSON.stringify(carsPurchase));
    this.setNumberCarsCart();
    return deleted;

  }

}
