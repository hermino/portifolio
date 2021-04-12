import { DividedModule } from './../../divided/divided.module';
import { PrimeModule } from './../../prime.module';
import { HomePageComponent } from './home-page/home-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    PrimeModule,
    DividedModule,
    HomeRoutingModule
  ],
})
export class HomeModule { }
