import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {CarDto} from "../model/carDto";
import {CarsPurchaseDto} from "../model/carsPurchaseDto";
const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) {}

  public getAllCars(): Observable<CarDto[]> {
    return this.http.get<CarDto[]>(`${apiUrl}/cars`);
  }

  public registerCar(newCar: CarDto): Observable<CarDto> {
    return this.http.post<CarDto>(`${apiUrl}/cars/save`, newCar);
  }

}
