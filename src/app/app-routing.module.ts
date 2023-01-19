import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [   
  { path: '', loadChildren: () => import('./whiteboard/whiteboard.module').then(m => m.WhiteboardModule)  },   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
