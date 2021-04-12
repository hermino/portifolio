import { ComponentsModule } from './components/components.module';
import { PrimeModule } from './../prime.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
    PrimeModule
  ],
  exports: [
    ComponentsModule
  ]
})
export class DividedModule { }
