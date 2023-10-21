import { Injectable } from '@angular/core';
import { getCookie, setCookie } from 'typescript-cookie'
import jwt_decode from "jwt-decode";
import {CustomerJwtDto} from "../model/customerJwtDto";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public getToken(): string {
    // return getCookie("token");
    return sessionStorage.getItem('token');
  }

  public saveToken(token: string): void {
    // setCookie("token", token, {expires: 1, path: "/"})
    sessionStorage.setItem('token', token); 
  }

  public deleteToken(): void {
    sessionStorage.removeItem('token');
    // sessionStorage.removeItem('usuario');
  }


  public getInfoToken(): CustomerJwtDto {
    let infoToken = jwt_decode(sessionStorage.getItem('token'));
    console.log(infoToken)
    return <CustomerJwtDto>infoToken;
  }

}
