import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {TokenService} from "../services/token.service";
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, 
            private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let headers;
    let token = this.tokenService.getToken();

    if (!token) {
      return next.handle(request);
    }

    headers = {
      'Authorization': 'Bearer '+ token
    }

    let authRequest = request.clone({
      setHeaders: {
        ...headers
      },
    });

    return next.handle(authRequest).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 403) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No tienes permisos para acceder a ésta página.'
          });
        }
        return throwError(() => err);
      })
    );
  }
}
