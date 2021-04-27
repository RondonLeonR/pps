import { Injectable } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class MensajeErrorService {
  constructor(private animationCtrl: AnimationController) {}

  mostrarError(backgroundColor: string) {
    const animation_1: Animation = this.animationCtrl
      .create()
      .addElement(document.querySelector('.error'))
      .duration(600)
      .beforeAddClass(backgroundColor)
      .fromTo('bottom', '-10%', '5%');

    const animation_2: Animation = this.animationCtrl
      .create()
      .addElement(document.querySelector('.error'))
      .duration(300)
      .fromTo('width', '50px', '90%');

    const animation_3: Animation = this.animationCtrl
      .create()
      .addElement(document.querySelector('.mensaje'))
      .duration(1000)
      .fromTo('visibility', 'hidden', 'visible');

    animation_1.play().then(() => {
      animation_2.play().then(() => {
        animation_3.play().then(() => {
          this.esconderError();
        });
      });
    });
  }

  esconderError() {
    const animation_1: Animation = this.animationCtrl
      .create()
      .addElement(document.querySelector('.mensaje'))
      .duration(1000)
      .fromTo('visibility', 'visible', 'hiden');

    const animation_2: Animation = this.animationCtrl
      .create()
      .addElement(document.querySelector('.error'))
      .duration(300)
      .fromTo('width', '90%', '50px');

    const animation_3: Animation = this.animationCtrl
      .create()
      .addElement(document.querySelector('.error'))
      .duration(300)
      .fromTo('bottom', '5%', '-10%');

    animation_1.play().then(() => {
      animation_2.play().then(() => {
        animation_3.play();
      });
    });
  }
}
