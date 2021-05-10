import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppMainPage } from './app-main.page';

const routes: Routes = [
  {
    path: '',
    component: AppMainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppMainPageRoutingModule {}
