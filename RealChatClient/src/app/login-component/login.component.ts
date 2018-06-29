import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  alertMessage = '';
  isLoading = false;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    const user = {
      username: form.controls.username.value,
      password: form.controls.password.value
    };

    this.isLoading = true;
    this.authService.login(user)
      .subscribe(
        (res) => {
          console.log(res);
          this.isLoading = false;
          this.router.navigate(['/chat']);
        },
        (err) => {
          this.alertMessage = err.error.message;
          this.isLoading = false;
          form.resetForm();
        }
      );
  }
}
