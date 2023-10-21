import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../../core/utils/CustomValidators";
import {CarDto} from "../../../../core/model/carDto";
import {AppBaseComponent} from "../../../../core/utils/AppBaseComponent";
import {CarService} from "../../../../core/services/car.service";
import Swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-car',
  templateUrl: './register-car.component.html',
  styleUrls: ['./register-car.component.css']
})
export class RegisterCarComponent extends AppBaseComponent {

  public registerCarForm: FormGroup;
  public titulo: string = "Formulario de Auto"


  constructor(private fb: FormBuilder,
              private router: Router, 
              private carService: CarService) {
    super();

    this.registerCarForm = this.fb.group({
      infoBasicForm:  this.fb.group({
        brandCarId: ['', Validators.required],
        reference: ['', Validators.required],
        price: ['', Validators.required],
        modelYear: ['', [Validators.required, CustomValidators.numberDateFuture]],
        category: ['', Validators.required],
        stock: ['', Validators.required],
      }),
      infoMechForm: this.fb.group({
        horsepower: ['', Validators.required],
        engineDisplacement: ['', Validators.required],
        transmission: ['', Validators.required],
        fuelType: ['', Validators.required],
        traction: ['', Validators.required],
        steering: ['', Validators.required]
      }),
      infoAestheticForm:this.fb.group({
        color: ['', Validators.required],
        numberDoor: ['', Validators.required],
        numberSeats: ['', Validators.required],
        imagePath: ['', Validators.required],
      })
    });
  }

  public async registerCar(): Promise<void> {

    if (!this.registerCarForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hay errores en el formulario, reviselo por favor'
      });
      console.log(this.getAllErrorsForm(this.registerCarForm));
      this.registerCarForm.markAllAsTouched();
      return;
    }


    let formData = this.registerCarForm.value;

    let formBasic = formData["infoBasicForm"];
    let formMech = formData["infoMechForm"];
    let formAesthetic = formData["infoAestheticForm"];

    let dtoRegisterCar: CarDto = {
      ...formBasic,
      ...formMech,
      ...formAesthetic
    }

    console.log("este es el dto a enviar", dtoRegisterCar);

    this.carService.registerCar(dtoRegisterCar).subscribe({
      next: value => {
        Swal.fire({
          icon: 'success',
          title: 'Registro existoso',
          text: 'El autose registró correctamente'
        });
        this.router.navigate(["/portafolio"]);
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Algo ha ocurrido',
          text: 'Hubo un problema al guardar el carro'
        });
        console.log(err);
      }
    })

  }


}
