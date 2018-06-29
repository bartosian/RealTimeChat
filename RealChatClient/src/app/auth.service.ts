import {HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import {User} from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(user: User) {
    return this.http.post('http://localhost:7777/login', user);
  }
  register(user: User) {
    return this.http.post('http://localhost:7777/register', user);
  }
  logout() {
    return this.http.post('http://localhost:7777/register', {});
  }
}
