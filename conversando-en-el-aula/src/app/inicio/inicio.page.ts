import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../shared/User.class';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['../login/login.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(
    private router: Router,
    private authSvc: AuthService
  ) { }

  user: User = new User();

  ngOnInit() {
  }

  onIntro() {
    this.router.navigateByUrl('/login');
  }

  onRegister() {
    this.router.navigateByUrl('/register');
  }

  async onLoginFast(){
    this.user.email = 'uno@gmail.com';
    this.user.password = '123456';
    const user = await this.authSvc.onLogin(this.user);
    if (user) {
      console.log("Logeado!!");
      this.router.navigateByUrl('/home');
    }
  }

}
