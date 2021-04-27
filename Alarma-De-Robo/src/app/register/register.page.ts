import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/User.class';

import { FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) { }


  ngOnInit() {
  }

  user: User = new User();

  get email() {
    return this.registrationForm.get('email');
  }
  get password() {
    return this.registrationForm.get('password');
  }

  registrationForm = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$")
      ]
    ],
    password: ['', Validators.required]
  });

  public errorMessages = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'pattern', message: 'Please enter a valid password' }
    ]
  }


  async onRegister() {
    this.user.email = this.email.value;
    this.user.password = this.password.value;
    const user = await this.authSvc.onRegister(this.user);
    if (user) {
      const alert = await this.alertController.create({
        header: 'Register',
        message: 'Successfully created user!',
        buttons: ['OK']
      });

      await alert.present();
      let result = await alert.onDidDismiss();
      console.log(result);
      
      this.router.navigateByUrl('/inicio');
    }
  }

  submit() {
    console.log(this.registrationForm.value);

  }
}
