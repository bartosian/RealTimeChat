import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  alertMessage = '';

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onRegister(form: NgForm) {
    const user = {
      username: form.controls.username.value,
      password: form.controls.password.value
    };

    this.isLoading = true;
    this.authService.register(user)
      .subscribe(
        (res) => {
          console.log(res);
          this.isLoading = false;
          this.router.navigate(['/chat']);
        },
        (res) => {
          console.log(res);
          this.alertMessage = res.error.message;
          this.isLoading = false;
          form.resetForm();
        }
      );
  }
}
