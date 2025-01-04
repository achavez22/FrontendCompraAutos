import { Injectable } from '@angular/core';
import {AuthLoginRequestDto} from "../model/authLoginRequestDto";
import {Observable, Subscription, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {AuthLoginResponseDto} from "../model/authLoginResponseDto";
import {TokenService} from "./token.service";
import {RegisterRequest} from "../model/registerRequest.model";
import {RegisterResponse} from "../model/registerResponse.model";
const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public signIn(authDto: AuthLoginRequestDto): Observable<AuthLoginResponseDto> {
       return this.http.post<AuthLoginResponseDto>(`${apiUrl}/v1/auth/sign-in`, authDto)
       .pipe(
          tap(response => {
            this.tokenService.saveToken(response.jwt);
          })
      );
  }

  public register(registerDto: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${apiUrl}/v1/auth/register`, registerDto);
  }

  public logout(): void{ 
    this.tokenService.deleteToken();
  }

}
