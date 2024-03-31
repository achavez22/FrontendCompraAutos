import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {lastValueFrom} from "rxjs";
import Swal from "sweetalert2";

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppBaseComponent} from "../../../../core/utils/AppBaseComponent";
import {AuthLoginRequestDto} from "../../../../core/model/authLoginRequestDto";
import {AuthService} from "../../../../core/services/auth.service";
import {TokenService} from "../../../../core/services/token.service";
import {ErrorsForm} from "../../../../core/enums/ErrorsForm";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AppBaseComponent {

  public loginForm: FormGroup;
  constructor(private router: Router, 
              private fb: FormBuilder, 
              private authService: AuthService, 
              private tokenService: TokenService) {
    super();
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required ]
    });
  }

  public signIn(){

    let dtoLogin: AuthLoginRequestDto;

    if (this.loginForm.valid) {
      let email = this.loginForm.get('email').value;
      let password = this.loginForm.get('password').value;

      dtoLogin = {
        "email": email,
        password
      }

      this.authService.signIn(dtoLogin)
        .subscribe(response => {
          this.router.navigateByUrl("/portafolio");

        }, error => {
          Swal.fire('Error', error.error.detail, 'error');          
        }

      );


    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Hay errores en el formulario, reviselo por favor'
      })
      this.loginForm.markAllAsTouched();
    }

  }
  
  public getErrorForm(field: string): string {
    let message;

    if (this.isTouchedField(this.loginForm, field)) {
      if (this.loginForm.get(field).hasError('required')){
        message = ErrorsForm.REQUIRED;
      } else if (this.loginForm.get(field).hasError('email')) {
        message = ErrorsForm.EMAIL_FORMAT;
      }
    }

    return message;
  }

}
