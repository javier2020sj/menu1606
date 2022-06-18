import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifPage } from './modif.page';

const routes: Routes = [
  {
    path: '',
    component: ModifPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifPageRoutingModule {}
