import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;
  let http: HttpClient;

  const token = 'token';

  beforeEach(() => {
    http = jasmine.createSpyObj(['get']);
    router = jasmine.createSpyObj(['navigate']);
    // router.navigate = jasmine.createSpy().and.returnValue(new Promise(() => true));
    service = new AuthService(http, router);
  });

  // checking for service to be created
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // checking for service to redirect to login page after logout
  it('should redirect to login page on logout', () => {
    service.logout();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(router.navigate).toHaveBeenCalledTimes(1);
  });

  // checking if the token is returned from localstorage
  it('should return token from localstorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(token);
    const realToken = service.getToken();
    expect(realToken).toEqual(token);
  });

  // checking if the token is saved in localstorage
  it('should save token in localstorage', () => {
   spyOn(localStorage, 'setItem');
   service.saveToken(token);
   expect(localStorage.setItem).toHaveBeenCalledWith('access_token', token);
  });

});
