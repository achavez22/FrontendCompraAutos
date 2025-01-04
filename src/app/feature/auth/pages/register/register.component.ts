import { Component } from '@angular/core';
import {AppBaseComponent} from "../../../../core/utils/AppBaseComponent";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../../core/services/auth.service";
import {ErrorsForm} from "../../../../core/enums/ErrorsForm";
import {RegisterRequest} from "../../../../core/model/registerRequest.model";
import {lastValueFrom} from "rxjs";
import Swal from 'sweetalert2'
import { RegisterResponse } from 'src/app/core/model/registerResponse.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends AppBaseComponent  {

  public registerForm: FormGroup;
  public passwordGenerated: string;
  public userRegistered: RegisterResponse;
  public registered: boolean;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
    super();
    this.registered = false;
    this.registerForm = this.fb.group({
      cardId: ['', [ Validators.required ] ],
      fullName: ['', Validators.required ],
      email: ['', [ Validators.required, Validators.pattern("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
        + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$") ]],
      numberCellphone: ['', [ Validators.required, Validators.pattern("^[0-9]*$") ] ],
      password: ['', Validators.required ],
    });
  }

  public registerUser(): void {
    let registerData: RegisterRequest = this.registerForm.value;
    if (this.registerForm.valid) {
      this.authService.register(registerData).subscribe({
        next: (response) => {
          this.userRegistered = response;
          this.registered = true;
        },
        error: (err) => {console.log(err.error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.detail
          })
        }
      });
      
    }else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hay errores en el formulario, reviselo por favor'
      })
      console.log(this.getAllErrorsForm(this.registerForm));
      this.registerForm.markAllAsTouched();
    }
    
  }


  public getErrorForm(field: string): string {
    let message;

    const required: Array<String> = ["cardId", "fullName", "email", "numberCellphone", "password"];
    const formatEmail: Array<String> = ["email"]
    const olnyNumber: Array<String> = ["numberCellphone"]


    if (this.isTouchedField(this.registerForm, field)) {

      if (required.includes(field) && this.registerForm.get(field).hasError('required')){
        message = ErrorsForm.REQUIRED;
      } else if (formatEmail.includes(field) && this.registerForm.get(field).hasError('pattern')) {
        message = ErrorsForm.EMAIL_FORMAT;
      } else if (olnyNumber.includes(field) && this.registerForm.get(field).hasError('pattern')) {
        message = ErrorsForm.ONLY_NUMBER;
      }
    }

    return message;
  }

}
