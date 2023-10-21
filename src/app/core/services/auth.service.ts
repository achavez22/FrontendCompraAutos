import { Injectable } from '@angular/core';
import {AuthLoginRequestDto} from "../model/authLoginRequestDto";
import {Observable, Subscription, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {AuthLoginResponseDto} from "../model/authLoginResponseDto";
import {TokenService} from "./token.service";
import {RegisterRequestDto} from "../model/registerRequestDto";
import {RegisterResponseDto} from "../model/registerResponseDto";
const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public signIn(authDto: AuthLoginRequestDto): Observable<AuthLoginResponseDto> {
       return this.http.post<AuthLoginResponseDto>(`${apiUrl}/auth/sign-in`, authDto)
       .pipe(
          tap(response => {
            this.tokenService.saveToken(response.jwt);
          })
      );
  }

  public register(registerDto: RegisterRequestDto): Observable<RegisterResponseDto> {
    return this.http.post<RegisterResponseDto>(`${apiUrl}/auth/register`, registerDto);
  }

  public logout(): void{ 
    this.tokenService.deleteToken();
  }

}
