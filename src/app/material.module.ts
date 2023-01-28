import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Material Form Controls
import {MatCardModule} from '@angular/material/card';
// Material Data tables
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatSliderModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatButtonModule,
    MatSelectModule
  ],
  exports: [
    MatCardModule,
    MatSliderModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class MaterialModule { }