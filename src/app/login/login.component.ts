import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  isEmpty: boolean;
  correct = true;
  token: string;

    constructor(private fb: FormBuilder, public authService: AuthService) {}

    login(): void {

      console.log('Click!');

      const val = this.form.value;
      if (val.login && val.password) {
        this.isEmpty = false;
        this.authService.login(val.login, val.password)
            .subscribe(
                () => {
                    this.correct = true;
                    console.log('User is logged in');
                    this.authService.setToken(val.login, val.password);
                    console.log('Token: ' + this.authService.getToken());
                }
            );
      }

      else {
        this.isEmpty = true;
      }

      if (!(this.isEmpty)) {
        this.correct = false;
      }

    }


  ngOnInit(): void {
    this.form = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

}
