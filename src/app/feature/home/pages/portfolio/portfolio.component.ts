import { Component, OnInit } from '@angular/core';
import { CarService } from "../../../../core/services/car.service";
import { CarDto } from "../../../../core/model/carDto";
import { CarsPurchaseDto } from "../../../../core/model/carsPurchaseDto";
import Swal from "sweetalert2";
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  public listCarsPortfolio: CarDto[];

  constructor(private carService: CarService,
    private shoppingCartService: ShoppingCartService) {
    this.carService.getAllCars().subscribe({
      next: value => {
        this.listCarsPortfolio = value;
      }
    });
  }

  ngOnInit(): void {

  }

  public addCarShoppingCart(carNew: CarDto): void {

    if (carNew.stock <  1 ) {
      Swal.fire({
        icon: "error",
        title: "Error al agregar",
        text: "No puedes agregar cantidades superiores al stock"
      });
    } else {
      let carShopping: CarsPurchaseDto = {
        codeCar: carNew.codeCar,
        quantity: 1,
        total: carNew.price
      };
      this.shoppingCartService.addCarShoppingCart(carShopping);
    }

  }

}
