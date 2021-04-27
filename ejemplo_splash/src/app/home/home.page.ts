import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, Animation } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private animationController: AnimationController,
    private router: Router
  ) {}

  ngOnInit(): void {
    const animacion: Animation = this.animationController
      .create()
      .addElement(document.querySelector('.animacion'))
      .duration(2000)
      .fromTo('opacity', '0', '1');
    const animacion1: Animation = this.animationController
      .create()
      .addElement(document.querySelector('.animacion'))
      .duration(3000)
      .keyframes([
        { offset: 0, transform: 'rotate(0deg)' },
        { offset: 1, transform: 'rotate(360deg)' },
      ]);
    animacion.play().then(() => {
      animacion1.play().then(() => {
        this.router.navigateByUrl('prueba');
      });
    });
  }
}
