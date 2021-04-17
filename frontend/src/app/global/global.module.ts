import { PrimeModule } from './../prime.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrimeModule
  ],
  exports: [
    PrimeModule
  ]
})
export class GlobalModule { }
