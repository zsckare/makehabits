import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EdithabitoPageRoutingModule } from './edithabito-routing.module';

import { EdithabitoPage } from './edithabito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdithabitoPageRoutingModule
  ],
  declarations: [EdithabitoPage]
})
export class EdithabitoPageModule {}
