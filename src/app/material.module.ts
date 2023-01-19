import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Material Form Controls
import {MatCardModule} from '@angular/material/card';
// Material Data tables
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatSliderModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule
  ],
  exports: [
    MatCardModule,
    MatSliderModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule
  ]
})
export class MaterialModule { }