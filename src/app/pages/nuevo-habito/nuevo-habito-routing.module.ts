import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoHabitoPage } from './nuevo-habito.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoHabitoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoHabitoPageRoutingModule {}
