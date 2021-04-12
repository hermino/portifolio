import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
