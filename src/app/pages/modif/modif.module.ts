import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifPageRoutingModule } from './modif-routing.module';

import { ModifPage } from './modif.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ModifPageRoutingModule
  ],
  declarations: [ModifPage]
})
export class ModifPageModule {}
