import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppMainPageRoutingModule } from './app-main-routing.module';

import { AppMainPage } from './app-main.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppMainPageRoutingModule
  ],
  declarations: [AppMainPage]
})
export class AppMainPageModule {}
