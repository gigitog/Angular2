import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly accessTokenKey = 'access_token';

  authorizationError = false;

  constructor(private http: HttpClient, public router: Router) { }

  login(username: string, password: string): any {
    return this.http.get('https://pnitfunctions.azurewebsites.net/api/token?userName=' + username + '&password=' + password);
  }

  setToken(username: string, password: string): void {
    const temp = this.login(username, password);
    temp.subscribe(
      (readableToken) => {
        console.log('Server response', readableToken);
        const token = readableToken.access_token;
        localStorage.setItem(this.accessTokenKey, token);
        this.authorizationError = false;
        this.router.navigate(['/table']);
      }
    );
  }

  getToken(): string {
    return localStorage.getItem(this.accessTokenKey);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.accessTokenKey, token);
  }

  logout(): void {
    localStorage.removeItem(this.accessTokenKey);
    console.log('Logout!');
    this.router.navigate(['/login']);
  }

  checkForExperation(): boolean {
    const token = this.getToken();
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    console.log(expiry);

    // tslint:disable-next-line:new-parens
    if ((Math.floor((new Date).getTime() / 1000)) >= expiry) {
      return true;
    }
    else {
      return false;
    }
  }

}
