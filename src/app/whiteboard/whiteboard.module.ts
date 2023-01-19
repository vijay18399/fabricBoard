import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhiteboardComponent } from './whiteboard.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { WhiteboardRoutingModule } from './whiteboard-routing.module';
import { MenuComponent } from '../shared/components/menu.component';
import { ColorPickerComponent } from '../shared/components/colorPicker.component';

@NgModule({
    declarations: [
        WhiteboardComponent,MenuComponent,ColorPickerComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        WhiteboardRoutingModule
    ]
})
export class WhiteboardModule { }
