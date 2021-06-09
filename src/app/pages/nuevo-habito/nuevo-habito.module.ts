import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoHabitoPageRoutingModule } from './nuevo-habito-routing.module';

import { NuevoHabitoPage } from './nuevo-habito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoHabitoPageRoutingModule
  ],
  declarations: [NuevoHabitoPage]
})
export class NuevoHabitoPageModule {}
