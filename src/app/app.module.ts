import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { MenuComponent } from './shared/components/menu.component';
import { ColorPickerComponent } from './shared/components/colorPicker.component';
import { WhiteboardComponent } from './whiteboard/whiteboard.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,   
    WhiteboardComponent,
    MenuComponent,
    ColorPickerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule ,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
