import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  imgLinda = "../../assets/Fotos/lindo2.jpg";
  imgFea = "../../assets/Fotos/fea.jpg";


  constructor() {}

  btnLindas(){
    console.log("Cosas Lindas");
  }

  btnFeas(){
    console.log("Cosas Feas");
  }
}
