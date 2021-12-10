import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let login: LoginComponent;
  const fb = new FormBuilder();
  let authService: AuthService;
  let fixture: ComponentFixture<LoginComponent>;

  const token = 'token';

  beforeEach(async () => {

    authService = jasmine.createSpyObj('AuthService', ['getToken']);

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: FormBuilder}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    login = new LoginComponent(fb, authService);
    login.ngOnInit();
    fixture = TestBed.createComponent(LoginComponent);
    login = fixture.componentInstance;
    fixture.detectChanges();
  });

  // testing if the component is created
  it('should create', () => {
    expect(login).toBeTruthy();
  });

  // testing the validity of a form if it is not filled
  it('empty form should be invalid', () => {
    expect(login.form.valid).toBeFalsy();
  });

  // testing the validity of a login field
  it('form with empty login field should be invalid', () => {
    const loginField = login.form.controls.login;
    expect(loginField.valid).toBeFalsy();
  });

  // testing the validity of a password field
  it('form with empty password field should be invalid', () => {
    const passwordField = login.form.controls.password;
    expect(passwordField.valid).toBeFalsy();
  });

  it('should render title in a h1 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome!');
});
});

