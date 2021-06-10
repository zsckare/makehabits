import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EdithabitoPage } from './edithabito.page';

const routes: Routes = [
  {
    path: '',
    component: EdithabitoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdithabitoPageRoutingModule {}
